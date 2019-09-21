import * as yup from 'yup';
import Account from '../models/Account';
import Record from '../models/Record';

class RecordController {
  async store(req, res) {
    const validation = yup.object().shape({
      description: yup.string().notRequired(),
      value: yup.number().required(),
      account_id: yup.number().required(),
      type: yup.number().required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { account_id } = req.body;

    const accountExists = await Account.findOne({ where: { id: account_id } });

    if (!accountExists) {
      return res.status(400).json({ error: 'Account does not exists' });
    }

    const recordRequest = req.body;

    if (recordRequest.type === 2 && recordRequest.value > 0) {
      recordRequest.value *= -1;
    }

    const record = await Record.create(recordRequest);

    return res.json(record);
  }
}

export default new RecordController();
