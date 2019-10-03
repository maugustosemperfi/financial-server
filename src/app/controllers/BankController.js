import * as yup from 'yup';
import BankService from '../services/BankService';

class BankController {
  async store(req, res) {
    const validation = yup.object().shape({
      name: yup
        .string()
        .required()
        .min(3),
      iconName: yup
        .string()
        .required()
        .min(3),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.json(await BankService.store(req.body));
  }

  async getAll(req, res) {
    return res.json(await BankService.getAll());
  }
}

export default new BankController();
