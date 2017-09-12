'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Dimas',
      last_name: 'Gardenia',
      email: 'dimas@sekolah.id'
    },{
      first_name: 'Denny',
      last_name: 'Miloen',
      email: 'deny@sekolah.id'
    },{
      first_name: 'Ogi',
      last_name: 'Naiborhu',
      email: 'ogi@sekolah.id'
    },{
      first_name: 'Genius',
      last_name: 'Prawiranegara',
      email: 'genius@sekolah.id'
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
