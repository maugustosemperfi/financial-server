import Sequelize, { Model } from 'sequelize';
import { format } from 'date-fns';

class Record extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        value: {
          type: Sequelize.DECIMAL,
          get() {
            const value = this.getDataValue('value');
            return value === null ? null : Number(value);
          },
        },
        type: Sequelize.INTEGER,
        recordDate: Sequelize.DATE,
        recordDay: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.recordDate, 'yyyy-MM-dd');
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
    this.belongsTo(models.CreditCard, { foreignKey: 'credit_card_id', as: 'creditCard' });
  }
}

export default Record;
