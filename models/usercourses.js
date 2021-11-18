'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserCourses.hasMany(models.Teacher)
      // UserCourses.hasMany(models)
    }
  };
  UserCourses.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please Select your Teacher'},
        notEmpty: {msg: 'Please Select your Teacher'}
      }
    }
  }, {
    hooks: {
      beforeCreate: (UserCourses) => {
        UserCourses.createdAt= new Date(),
        UserCourses.updatedAt= new Date()
      }
    },
    sequelize,
    modelName: 'UserCourses',
  });
  return UserCourses;
};