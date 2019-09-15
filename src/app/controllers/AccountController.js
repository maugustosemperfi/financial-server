import * as yup from 'yup';
import Account from '../models/Account';

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

    const { name, type } = req.body;

    const accountExists = Account.findOne({ where: name, type });

    if (accountExists) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    const { userId } = req;

    const account = Account.create({
      name,
      type,
      user_id: userId,
    });

    return res.json(account);
  }
}

export default new AccountController();
