exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE schedules(
  	schedule_id SERIAL NOT NULL,
    bottle_id VARCHAR(32) REFERENCES bottles(bottle_id),
    monday BOOL NOT NULL,
    tuesday BOOL NOT NULL,
    wednesday BOOL NOT NULL,
    thursday BOOL NOT NULL,
    friday BOOL NOT NULL,
    saturday BOOL NOT NULL,
    sunday BOOL NOT NULL,
    schedule_time TIMESTAMP,
	created_at TIMESTAMP,
    PRIMARY KEY (schedule_id,bottle_id)
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE schedules`;
  return knex.raw(dropQuery);
};
