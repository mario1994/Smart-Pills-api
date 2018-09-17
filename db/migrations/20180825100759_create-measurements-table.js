
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE measurements(
  	measurement_id SERIAL NOT NULL,
    bottle_id VARCHAR(32) REFERENCES bottles(bottle_id),
    created_at TIMESTAMP,
    temperature_value INTEGER,
    PRIMARY KEY (measurement_id,bottle_id)
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE measurements`;
  return knex.raw(dropQuery);
};
