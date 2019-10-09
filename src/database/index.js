import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Account from '../app/models/Account';
import Record from '../app/models/Record';
import Bank from '../app/models/Bank';
import CreditCard from '../app/models/CreditCard';

const models = [User, Account, Record, Bank, CreditCard];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => {
        model.init(this.connection);

        return model;
      })
      .map(model => {
        // if (model.associate) {
        //   model.associate(this.connection.models);
        // }
        // eslint-disable-next-line no-unused-expressions
        model.associate && model.associate(this.connection.models);
        return model;
      });
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/gobarber', { useNewUrlParser: true, useFindAndModify: true });
  }
}

export default new Database();
