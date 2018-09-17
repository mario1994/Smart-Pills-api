
exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('measurements').insert([
    {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 24 * 3600 * 1000),
        temperature_value: 27
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 21 * 3600 * 1000),
        temperature_value: 29
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 18 * 3600 * 1000),
        temperature_value: 31
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 15 * 3600 * 1000),
        temperature_value: 32
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 12 * 3600 * 1000),
        temperature_value: 29
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 9 * 3600 * 1000),
        temperature_value: 26
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 6 * 3600 * 1000),
        temperature_value: 25
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now() - 3 * 3600 * 1000),
        temperature_value: 27
      },
      {
        bottle_id: "AOSUHUIASFPIII79",
        created_at: new Date(Date.now()),
        temperature_value: 28
      },
    ]);
};
