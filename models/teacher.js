'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.belongsTo(models.Course, {foreignKey: 'CourseId'});
      Teacher.belongsToMany(models.User, {
        through: models.UserCourses
      })
    }
  };
  Teacher.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: `Please Input Teacher's Name` },
        notEmpty: {msg: `Please Input Teacher's Name` }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: `Please Input Teacher's Gender` },
        notEmpty: {msg: `Please Input Teacher's Gender` }
      }
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: `Please Input Teacher's Education` },
        notEmpty: {msg: `Please Input Teacher's Education` }
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: `Please Input Teacher's Course` },
        notEmpty: {msg: `Please Input Teacher's Course` }
      }
    }
  }, {
    hooks: {
      beforeCreate: (Teacher) => {
        Teacher.createdAt= new Date(),
        Teacher.updatedAt= new Date()
      }
    },
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};