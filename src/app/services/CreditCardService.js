import { endOfToday, subDays, addMonths, setDay } from 'date-fns';
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

    // Get the monthly statement
    creditCards = await Promise.all(
      creditCards.map(async creditCard => {
        const cycleDay = subDays(setDay(endOfToday(), creditCard.dueDay), creditCard.cycleDay ? creditCard.cycleDay : 10);
        const sum = await Record.sum('value', {
          where: {
            credit_card_id: creditCard.id,
            record_date: {
              [Op.between]: [cycleDay, addMonths(cycleDay, 1)],
            },
          },
        });
        creditCard.statement = Number(Number(sum).toFixed(2));

        return creditCard;
      })
    );

    creditCards = await Promise.all(
      creditCards.map(async creditCard => {
        const sum = await Record.sum('value', {
          where: {
            credit_card_id: creditCard.id,
          },
        });
        creditCard.available = creditCard.limit - sum;

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

  async getSimpleCreditCards(userId) {
    const creditCards = await CreditCard.findAll({
      where: { userId },
      attributes: ['id', 'name'],
      include: [
        {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name', 'iconName', 'iconUrl'],
        },
        {
          model: Account,
          as: 'account',
          attributes: ['id', 'name', 'type'],
        },
      ],
    });

    return creditCards;
  }
}

export default new CreditCardService();
