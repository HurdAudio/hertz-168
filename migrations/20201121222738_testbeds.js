'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('testbeds', function(table) {
    table.uuid('uuid').notNullable().primary();
    table.uuid('user_uuid').notNullable().defaultTo('01c131d5-fc4d-4c4d-a97f-2617ee575bda').references('uuid').inTable('users').onDelete('CASCADE').index();
    table.json('modules').notNullable().defaultTo({
        testbedModules: [
            {
                uuid: 'f94152ad-b07b-48b4-989f-8b9dc063210c',
                dragging: false,
                gain: {
                    gain: 0.4
                },
                input: {
                    connector: null,
                    module: null,
                    name: null,
                    type: null
                },
                left: 1150,
                mute: false,
                name: 'master volume',
                top: 450,
                value: 0.4
            }  
        ]
    });
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('testbeds');
};
