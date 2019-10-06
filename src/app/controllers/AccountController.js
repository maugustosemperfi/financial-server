import * as yup from 'yup';
import Account from '../models/Account';
import Record from '../models/Record';
import AccountService from '../services/AccountService';

class AccountController {
  async overview(req, res) {
    return res.json(await AccountService.overview(req.userId));
  }

  async store(req, res) {
    const validation = yup.object().shape({
      name: yup
        .string()
        .required()
        .min(1),
      type: yup.number().required(),
    });

    if (await !validation.isValid()) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, type, balance, description, bank } = req.body;
    const accountExists = await Account.findOne({ where: { name, type } });

    if (accountExists) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    const account = await Account.create({
      name,
      type,
      balance,
      description,
      user_id: req.userId,
      bank_id: bank.id,
    });

    return res.json(account);
  }

  async getAll(req, res) {
    const accounts = await Account.findAll();

    accounts.map(account => {
      account.realValue = account.balance + Record.sum('value', { where: { account_id: account.id } });

      return account;
    });

    return res.json(accounts);
  }

  async getSimpleAccounts(req, res) {
    const accounts = await AccountService.getSimpleAccounts(req.userId);

    return res.json(accounts);
  }
}

export default new AccountController();
