const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../bin/www');
const Car = require('../models/cars');
const User  = require('../models/users');
const Booking = require('../models/bookings');

const agent = request.agent(app);

const {userData} = require('./user.test');
const {carsData} = require('./cars.test');

const bookingData = {
    _id: new ObjectID(),
    car_id: carsData[3]._id,
    user_id: userData._id,
    date_from: "2017-05-28T00:00:00.000Z",
    date_to: "2017-05-28T00:00:00.000Z"
};

//SETS UP USER
before((done) => {
    User.remove({}).then(() => {
        agent
            .post('/users/signup')
            .send(userData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.find({}).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].username).toBe(userData.username);
                    done();
                }).catch((e) => done(e));
            });
    });
});

//LOGS USER IN
before((done) => {
    agent
        .post('/users/login')
        .send(userData)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            done();
        });
});

//SETS UP CAR DATABASE
before((done) => {
    Car.remove({}).then(() =>  {
        Car.create(carsData, (err, cars) => {
            if(err) return done(err);
            done()
        });
    });
});

//CLEARS BOOKINGS
beforeEach((done) => {
    Booking.remove({}).then(() => {
        done();
    });
});

describe('=== RESERVATIONS ===', () => {
    it('should make a reserveration', (done) => {
        agent
            .post('/bookings/car/' + carsData[0]._id)
            .send({
                date_from: "2017-05-28T00:00:00.000Z",
                date_to: "2017-05-28T00:00:00.000Z"
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                //TODO: figure out why?
                // using userdata id prop was returning an incorrect ID
                User.find({}).then((users) => {
                    let userId = users[0]._id;
                    Booking.find({}).then((booking) => {
                        expect(booking.length).toBe(1);
                        expect(booking[0].car_id).toEqual(carsData[0]._id);
                        expect(booking[0].user_id).toEqual(userId);
                        Car.findOne({_id: carsData[0]._id}).then((car) => {
                            expect(car.booked).toBe(true);
                            done();
                        }).catch((e) => done(e));
                    }).catch((e) => done(e));
                }).catch((e) => done(e));
            });
        });

    it('should cancel a reservation', (done) => {
        Booking.create(bookingData).then((booking) => {
            agent
                .post('/bookings/' + bookingData._id)
                .end((err, res) => {
                    if(err)  console.log(err);
                    Booking.find({}).then((booking) => {
                        expect(booking.length).toBe(0);
                    }).then(() => done());
                });
        }).catch((e) => done(e));
    });
});



