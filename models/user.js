'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: uuidv1()
    },
    firstName: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.INTEGER(9),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 7
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};