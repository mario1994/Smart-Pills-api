exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    date_of_birth DATE NOT NULL,
    token TEXT,
    password_digest TEXT,
    created_at TIMESTAMP
	)`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE users`;
  return knex.raw(dropQuery);
};