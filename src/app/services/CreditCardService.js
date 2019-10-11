import { endOfToday, subDays, addMonths } from 'date-fns';
import { Op } from 'sequelize';
import Account from '../models/Account';
import Bank from '../models/Bank';
import CreditCard from '../models/CreditCard';
import Record from '../models/Record';

class CreditCardService {
  async overview(userId) {
    const creditCards = await this.getCreditCardsWithRealValue(userId);
    const overallStatement = Number(
      creditCards.reduce((realValueAcumulated, creditCard) => realValueAcumulated + Number(creditCard.statement), 0).toFixed(2)
    );

    return { creditCards, overallStatement };
  }

  async getCreditCardsWithRealValue(userId) {
    let creditCards = await CreditCard.findAll({
      where: { user_id: userId },
      attributes: ['id', 'name', 'limit', 'cycleDay', 'dueDay'],
      include: [
        {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name', 'iconName', 'iconUrl'],
        },
        {
          model: Account,
          as: 'account',
          attributes: ['id', 'name'],
        },
      ],
      order: [['id', 'ASC']],
    });

    creditCards = await Promise.all(
      creditCards.map(async creditCard => {
        const sum = await Record.sum('value', {
          where: {
            credit_card_id: creditCard.id,
            record_date: {
              [Op.between]: [subDays(endOfToday(), creditCard.cycleDay ? creditCard.cycleDay : 10), addMonths(endOfToday(), 1)],
            },
          },
        });
        creditCard.statement = Number((Number(creditCard.limit) + Number(sum)).toFixed(2));
        creditCard.available = creditCard.limit - creditCard.statement;

        return creditCard;
      })
    );

    return creditCards;
  }

  async store(creditCard, userId) {
    const bankId = creditCard.bank.id;
    const accountId = creditCard.account ? creditCard.account.id : null;
    return CreditCard.create({
      ...creditCard,
      bankId,
      accountId,
      userId,
    });
  }

  async getAll(userId) {
    return CreditCard.findAll({ where: { userId } });
  }
}

export default new CreditCardService();
