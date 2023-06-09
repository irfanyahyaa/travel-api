'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.Status); // Kenapa setelah dihilangkan, endpoint /api/status tidak error?
      this.belongsToMany(models.Role, {
        through: 'userRoles',
        foreignKey: 'userId',
        otherKey: 'roleId'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    alamat: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};