import * as yup from 'yup';
import Account from '../models/Account';
import Record from '../models/Record';

class AccountController {
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

    const { name, type, balance } = req.body;

    const accountExists = await Account.findOne({ where: { name, type } });

    if (accountExists) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    const account = await Account.create({
      name,
      type,
      balance,
      user_id: req.userId,
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
}

export default new AccountController();
