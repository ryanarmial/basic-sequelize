'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Subjects', [{
      subject_name: 'Kimia',
    },{
      subject_name: 'Fisika',
    },{
      subject_name: 'Matematika',
    },{
      subject_name: 'Biologi',
    },{
      subject_name: 'Bahasa Inggris',
    }], {});
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
