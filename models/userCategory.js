'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    id: {
        type: Sequelize.UUID,
        defaultValue: uuidv1(),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      }
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return UserCategory;
};