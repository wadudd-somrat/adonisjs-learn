'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TblItemSchema extends Schema {
  up () {
    this.create('tbl_items', (table) => {
      table.increments('id').primary()
      table.string('name', 80).notNullable()
      table.integer('status').defaultTo(1)
      table.integer('created_by').nullable()
      table.integer('updated_by').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tbl_items')
  }
}

module.exports = TblItemSchema
