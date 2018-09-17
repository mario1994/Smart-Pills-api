
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE bottles(
    bottle_id VARCHAR(32) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    bottle_opens INTEGER NOT NULL,
    PRIMARY KEY (bottle_id,user_id)
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE bottles`;
  return knex.raw(dropQuery);
};
