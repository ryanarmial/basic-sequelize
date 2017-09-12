'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isUnique: {
        args: true,
        msg: 'Email sudah digunakan!!!'
      },
      validate: {
        isEmail: {msg: 'Format Email Salah, atau Sudah digunakan!!!'},
        // isUnique: isUnique('email')

        // message: 'Format Email Salah atau Sudah digunakan oleh user lain'
      }

    }
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {
      through: 'StudentSubject'
    })
  }
  return Student;
};
