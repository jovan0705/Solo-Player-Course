'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.Teacher)

      Course.belongsToMany(models.User, {
        through: models.UserCourses
      })
      // define association here
    }
  };
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: `Please input Course's name`},
        notEmpty: {msg: `Please input Course's name`}
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: `Please input Course's duration`},
        notEmpty: {msg: `Please input Course's duration`}
      }
    }
  }, {
    hooks: {
      beforeCreate: (Course) => {
        Course.createdAt= new Date(),
        Course.updatedAt= new Date()
      }
    },
    sequelize,
    modelName: 'Course',
  });
  return Course;
};