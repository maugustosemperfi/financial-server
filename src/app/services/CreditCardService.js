import { endOfToday } from 'date-fns';
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
      creditCards.map(async credit_card => {
        const sum = await Record.sum('value', { where: { credit_card_id: credit_card.id, record_date: { [Op.lte]: endOfToday() } } });
        credit_card.statement = Number((Number(credit_card.limit) + Number(sum)).toFixed(2));

        return credit_card;
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
