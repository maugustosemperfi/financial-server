import * as yup from 'yup';
import Account from '../models/Account';
import Record from '../models/Record';

class RecordController {
  async store(req, res) {
    const validation = yup.object().shape({
      value: yup.number().required(),
      account_id: yup.number().required(),
    });

    if (!(await validation.isValid())) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { account_id } = req.body;

    const accountExists = await Account.findOne({ where: { id: account_id } });

    if (!accountExists) {
      return res.status(400).json({ error: 'Account does not exists' });
    }

    const record = Record.create(req.body);

    return res.json(record);
  }
}

export default new RecordController();
