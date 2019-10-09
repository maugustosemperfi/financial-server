import CreditCard from '../models/CreditCard';

class CreditCardService {
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
