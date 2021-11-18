'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
const makeID = require('../helpers/makeId')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static sortBy(sortBy) {
      if (sortBy == undefined) {
        let value = {
          order: [
            ["Courses", "name", 'ASC']
          ]
        }
        return value
      } else if (sortBy == 'courseName') {
        let value = {
          order: [
            ["Courses", "duration", 'ASC']
          ]
        }
        return value
      } else if (sortBy == 'teacherName') {
        let value = {
          order: [
            ["Teachers","name", 'ASC']
          ]
        }
        return value
      } 
    }

    static associate(models) {
      // define association here
      User.hasOne(models.Profile)

      User.belongsToMany(models.Course, {
        through: models.UserCourses
      })

      User.belongsToMany(models.Teacher, {
        through: models.UserCourses
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Input your Username'},
        notEmpty: {msg: 'Please Input your Username'}
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Input your Password'},
        notEmpty: {msg: 'Please Input your Password'}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    code: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: (User) => {
          const salt = bcrypt.genSaltSync(5)
          const hash = bcrypt.hashSync(User.password, salt)
          User.password = hash;
          User.active = false;
          User.code = makeID();
          User.createdAt= new Date();
          User.updatedAt= new Date();
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};