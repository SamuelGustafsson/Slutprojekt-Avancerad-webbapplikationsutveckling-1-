/**
 * Created by jay on 5/28/17.
 */
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../bin/www');
const Car = require('../models/cars');
const User  = require('../models/users');

const agent = request.agent(app);

let cars = [
    {
        brand: 'Volvo',
        model: 'test-model',
        automatic: true,
        roof_rack: false,
        price: 3000,
        booked: false,
        seats: 5,
        image: "dummyurl",
        _id: new ObjectID()
    },
    {
        brand: 'Audi',
        model: 'test-model',
        automatic: true,
        roof_rack: false,
        price: 1800,
        booked: false,
        seats: 5,
        image: "dummyurl",
        _id: new ObjectID()
    },
    {
        brand: 'BMW',
        model: 'test-model',
        automatic: true,
        roof_rack: false,
        price: 1000,
        booked: false,
        seats: 5,
        image: "dummyurl",
        _id: new ObjectID()
    },
    {
        brand: 'BMW',
        model: 'test-model',
        automatic: true,
        roof_rack: false,
        price: 1000,
        booked: true,
        seats: 5,
        image: "dummyurl",
        _id: new ObjectID()
    }
];

const userData = {
    _id: new ObjectID(),
    username: 'jaso2nscott@gmail.com',
    firstname: 'Jason',
    lastname: 'Scott2',
    email: 'dev.jason.scott@gmail.com',
    password: 'test123',
    __v: 0
};

beforeEach((done) => {
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

beforeEach((done) => {
    Car.remove({}).then(() =>  {
        Car.create(cars, (err, cars) => {
            if(err) return done(err);
            done()
        });
    });
});

describe('=== DISPLAY CAR BY ID ===', () => {
    it('should display a car given an ID', (done) => {
        agent
            .get('/cars/' + cars[0]._id)
            .end((err, res) => {
                if(err) {
                    done(err);
                }
                expect(res.body).toContain(cars[0]);
                expect(res.body).toNotContain(cars[1]);
                done();
            });
    });
});

describe('=== FILTER CARS ===', () => {
    it('should return only 2 cars (one is booked and one is over default price)', (done) => {
        agent
            .post('/cars/filter')
            .send({})
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                expect(res.body.cars.length).toBe(2);
                done();
            });
    });

    it('should return 3 cars (one is booked and price limit increased)', (done) => {
        agent
            .post('/cars/filter')
            .send({
                price: 4000
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                expect(res.body.cars.length).toBe(3);
                done();
            });
    });

    it('should return only the BMW', (done) => {
        agent
            .post('/cars/filter')
            .send({
                brand: "BMW"
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                expect(res.body.cars.length).toBe(1);
                expect(res.body.cars[0].brand).toBe('BMW');
                done();
            });
    });
});