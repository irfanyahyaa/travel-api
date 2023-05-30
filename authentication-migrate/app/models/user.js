"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Method 'associate' digunakan untuk men-define relasi antar tabel
    static associate(models) {
      // define association here
      User.belongsTo(models.Status, {
        foreignKey: "statusId",
      });
      // User.belongsToMany(models.Role, {
      //   through: "user_roles",
      // });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      statusId: DataTypes.UUID,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
