"use strict";
module.exports = (sequelize, DataTypes) => {
  const MotorVehicle = sequelize.define(
    "MotorVehicle",
    {
      regNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      engineNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      chassisNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      yearOfManufacture: {
        type: DataTypes.INTEGER(4),
        allowNull: false
      },
      engineCapacityCC: {
        type: DataTypes.INTEGER(4),
        allowNull: false
      },
      estimatedValue: {
        type: DataTypes.FlOAT,
        allowNull: false
      },
      motorClass: {
        type: DataTypes.ENUM("Private", "Commercial"),
        allowNull: false
      },
      insuranceType: {
        type: DataTypes.ENUM("Comprehensive", "Third Party"),
        allowNull: false
      },
      politicalViolenceOptional: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {}
  );
  Article.associate = function(models) {
    // associations can be defined here
  };
  return MotorVehicle;
};
