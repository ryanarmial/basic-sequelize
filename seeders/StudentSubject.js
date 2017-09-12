'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StudentSubjects', [{
      StudentId: 1,
      SubjectId: 1
    },{
      StudentId: 1,
      SubjectId: 2
    },{
      StudentId: 1,
      SubjectId: 3
    },{
      StudentId: 2,
      SubjectId: 1
    },{
      StudentId: 2,
      SubjectId: 2
    },{
      StudentId: 2,
      SubjectId: 3
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
