exports.up = function (knex) {
    return knex.schema.createTable("friend_requests", (table) => {
      table.increments("id").primary().unsigned().notNullable();
      table.integer("sender_id").unsigned().notNullable();
      table.integer("receiver_id").unsigned().notNullable();
      table.string("status").notNullable().defaultTo("pending"); 
      table.string("comment"); // Add a comment field if needed.
      table.timestamps(true, true);
  
      // Foreign keys
      table.foreign("sender_id").references("id").inTable("users");
      table.foreign("receiver_id").references("id").inTable("users");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("friend_requests");
  };
  