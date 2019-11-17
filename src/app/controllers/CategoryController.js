import * as yup from 'yup';
import CategoryService from '../services/CategoryService';

class CategoryController {
  async createCategory(req, res) {
    const validation = yup.object().shape({
      description: yup.string().required(),
      iconName: yup.string().required(),
      iconColor: yup.string().required(),
      type: yup.string().required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.json(await CategoryService.createCategory(req.body));
  }

  async getCategories(_, res) {
    return res.json(await CategoryService.getCategories());
  }
}

export default new CategoryController();
