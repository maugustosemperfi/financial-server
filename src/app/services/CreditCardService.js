import CreditCard from '../models/CreditCard';

class CreditCardService {
  async store(creditCard) {
    const bank_id = creditCard.bank.id;
    const account_id = creditCard.account ? creditCard.account.id : null;
    return CreditCard.create({
      ...creditCard,
      bank_id,
      account_id,
    });
  }
}

export default new CreditCardService();
