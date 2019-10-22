import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { Op } from 'sequelize';
import Account from '../models/Account';
import CreditCard from '../models/CreditCard';
import Record from '../models/Record';

class RecordService {
  async getTransactionsRecords(userId, date) {
    const records = await Record.findAll({
      where: { recordDate: { [Op.between]: [startOfDay(startOfMonth(date)), endOfDay(endOfMonth(date))] } },
      include: [
        { model: Account, as: 'account', attributes: ['id', 'name'], where: { user_id: userId }, required: false },
        { model: CreditCard, as: 'creditCard', attributes: ['id', 'name'], where: { userId }, required: false },
      ],
      order: [['recordDate', 'ASC']],
    });

    return records;
  }
}

export default new RecordService();
