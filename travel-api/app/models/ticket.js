"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Car, {
        foreignKey: 'carId',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      });
      this.belongsToMany(models.User, {
        through: "reservations",
        foreignKey: "ticketId",
        as: 'users'
      });
    }
  }
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      destination: DataTypes.STRING,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
