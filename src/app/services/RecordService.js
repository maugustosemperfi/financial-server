import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { Op } from 'sequelize';
import Account from '../models/Account';
import CreditCard from '../models/CreditCard';
import Record from '../models/Record';
import Bank from '../models/Bank';

class RecordService {
  async getTransactionsRecords(userId, date) {
    const records = await Record.findAll({
      where: { recordDate: { [Op.between]: [startOfDay(startOfMonth(date)), endOfDay(endOfMonth(date))] } },
      include: [
        {
          model: Account,
          as: 'account',
          attributes: ['id', 'name'],
          where: { user_id: userId },
          required: false,
          include: {
            model: Bank,
            as: 'bank',
            attributes: ['id', 'name', 'iconName', 'iconUrl'],
          },
        },
        {
          model: CreditCard,
          as: 'creditCard',
          attributes: ['id', 'name'],
          where: { userId },
          required: false,
          include: {
            model: Bank,
            as: 'bank',
            attributes: ['id', 'name', 'iconName', 'iconUrl'],
          },
        },
      ],
      order: [['recordDate', 'ASC']],
    });

    const grouped = this.groupBy(records, record => record.recordDay);

    const keys = [...grouped.keys()];

    const formattedRecords = [];

    keys.forEach(key => {
      formattedRecords.push({
        recordDay: key,
        records: grouped.get(key),
      });
    });

    return formattedRecords;
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(record => {
      const key = keyGetter(record);
      const collection = map.get(key);

      if (!collection) {
        map.set(key, [record]);
      } else {
        collection.push(record);
      }
    });

    return map;
  }
}

export default new RecordService();
