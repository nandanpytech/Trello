const { DataTypes } = require('sequelize');

const createModel = (sequelize) => {
  return sequelize.define('registerVerifies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      reference: {
        model: 'user',
        key: 'email',
      },
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
};

module.exports = createModel;
