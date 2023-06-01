"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Method 'associate' digunakan untuk men-define relasi antar tabel
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, {
        through: "userRoles",
      });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      userId: {},
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
