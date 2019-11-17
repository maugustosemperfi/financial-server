import Category from '../models/Category';

class CategoryService {
  async createCategory(category) {
    return Category.create(category);
  }

  async getCategories() {
    return Category.findAll();
  }
}

export default new CategoryService();
