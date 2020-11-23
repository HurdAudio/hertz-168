'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('testbeds').del()
    .then(function () {
      // Inserts seed entries
      return knex('testbeds').insert([
        {
          uuid: '422ea552-0b9c-4f01-89fb-e6242f89bcc3',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
