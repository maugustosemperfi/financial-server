import Bank from '../models/Bank';

class BankService {
  async store(bank) {
    const savedBank = await Bank.create(bank);

    return savedBank;
  }
}

export default new BankService();
