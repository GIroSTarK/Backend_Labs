const { v4: uuidv4 } = require('uuid');

class CategoryService {
  constructor() {
    this.categories = {};
  }

  createCategory(name) {
    const id = uuidv4();
    const category = { id, name };
    this.categories[id] = category;
    return category;
  }

  getCategory(id) {
    return this.categories[id] || null;
  }

  getAllCategories() {
    return Object.values(this.categories);
  }

  deleteCategory(id) {
    const category = this.getCategory(id);
    if (category) {
      delete this.categories[id];
    }
    return category;
  }
}

module.exports = new CategoryService();
