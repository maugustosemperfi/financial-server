import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

const models = [];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => {
        model.init(this.connection);

        return model;
      })
      .map(model => {
        model.associate && model.associate(this.connection.models);
        return model;
      });
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/gobarber', { useNewUrlParser: true, useFindAndModify: true });
  }
}

export default new Database();
