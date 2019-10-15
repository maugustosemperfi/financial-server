import * as yup from 'yup';
import Account from '../models/Account';
import Record from '../models/Record';
import CreditCard from '../models/CreditCard';

class RecordController {
  async store(req, res) {
    const validation = yup.object().shape({
      description: yup.string().notRequired(),
      value: yup.number().required(),
      type: yup.number().required(),
      recordDate: yup.date().required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const accountId = req.body.account ? req.body.account.id : null;
    const creditCardId = req.body.creditCard ? req.body.creditCard.id : null;

    if (accountId) {
      const accountExists = await Account.findOne({ where: { id: accountId } });

      if (!accountExists) {
        return res.status(400).json({ error: 'Account does not exists' });
      }
    } else {
      const creditCardExits = await CreditCard.findOne({ where: { id: creditCardId } });

      if (!creditCardExits) {
        return res.status(400).json({ error: 'Account does not exists' });
      }
    }

    const recordRequest = req.body;
    recordRequest.account_id = accountId;
    recordRequest.credit_card_id = creditCardId;

    if (recordRequest.type === 1 && recordRequest.value > 0) {
      recordRequest.value *= -1;
    }

    const record = await Record.create(recordRequest);

    return res.json(record);
  }
}

export default new RecordController();
