'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     get upperCase() {
      return this.name.toUpperCase()
    }
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  };
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Input your Name'},
        notEmpty: {msg: 'Please Input your Name'}
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Input your Age'},
        notEmpty: {msg: 'Please Input your Age'}
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Input your Gender'},
        notEmpty: {msg: 'Please Input your Gender'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Input your Email'},
        notEmpty: {msg: 'Please Input your Email'},
        isEmail: {msg: 'Format must be your_email@anymail.com'}
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please put your Profile Picture URL'},
        notEmpty: {msg: 'Please put your Profile Picture URL'},
        isUrl: {msg: 'Profile Picture must be URL'}
      }
    }
  }, {
    hooks: {
      beforeCreate: (Profile) => {
        Profile.createdAt= new Date(),
        Profile.updatedAt= new Date()
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};