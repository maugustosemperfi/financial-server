import * as yup from 'yup';
import CreditCardService from '../services/CreditCardService';

class CreditCardController {
  async store(req, res) {
    const validation = yup.object().shape({
      name: yup.string().required(),
      limit: yup.number().required(),
      cycleDay: yup.number().notRequired(),
      dueDay: yup.number().required(),
      bank: yup.object().required(),
      account: yup.object().notRequired(),
    });

    if (!(await validation.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const creditCard = await CreditCardService.store(req.body);

    return res.json(creditCard);
  }
}

export default new CreditCardController();
