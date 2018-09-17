module.exports = function(app) {

    const User = require('./models/user.js')
    const Bottle = require('./models/bottle.js')
    const Measurement = require('./models/measurement.js')
    const Schedule = require('./models/schedule.js')
        // USER endpoints 
    app.post('/signin', User.signin)
    app.post('/signup', User.signup)
        // LOGOUT endpoint
    app.get('/logout', function(req, res) {
        req.logout();
    });
        // Bottle endpoints 
    app.post('/registerBottle',Bottle.registerBottle)
    app.get('/getBottleData/:bottle_id',Bottle.getBottleData)
    app.post('/bottleOpen',Bottle.openBottle)
        // Measurements endpoints 
    app.post('/createMeasurement',Measurement.registerTemperatureMeasurement)
    app.get('/getBottleMeasurments/:bottle_id',Measurement.getMeasurements)
        // Schedule endpoints 
    app.post('/updateBottleSchedule',Schedule.updateBottleSchedule)
    app.get('/getBottleSchedule/:bottle_id',Schedule.getBottleSchedule)

};