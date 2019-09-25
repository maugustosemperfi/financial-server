import Account from '../models/Account';
import Record from '../models/Record';

class AccountService {
  async overview() {
    const accounts = await this.getAccountsWithRealValue();
    const overallBalance = accounts.reduce((realValueAcumulated, account) => realValueAcumulated + Number(account.realValue), 0);

    return { overallBalance, accounts };
  }

  async getAccountsWithRealValue() {
    let accounts = await Account.findAll();

    accounts = await Promise.all(
      accounts.map(async account => {
        const sum = await Record.sum('value', { where: { account_id: account.id } });
        account.realValue = Number(account.balance) + Number(sum);

        return account;
      })
    );

    return accounts;
  }
}

export default new AccountService();
