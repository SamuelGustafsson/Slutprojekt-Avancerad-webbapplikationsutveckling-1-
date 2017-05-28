// /**
//  * Created by jay on 5/7/17.
//  */
// const expect = require('expect');
// const request = require('supertest');
// const { ObjectID } = require('mongodb');
//
// const { app } = require('../bin/www');
// const Car = require('../models/cars');
// const User  = require('../models/users');
//
// const agent = request.agent(app);
//
// const cars = [{
//         brand: 'Volvo',
//         model: 'test-model',
//         automat: true,
//         roof_rack: true,
//         price: 175000,
//         booked: false,
//         seats: 5,
//         _id: new ObjectID()
//     },
//     {
//         brand: 'Audi',
//         model: 'test-model',
//         automat: true,
//         roof_rack: false,
//         price: 475000,
//         booked: true,
//         seats: 5,
//         _id: new ObjectID()
//     },
//     {
//         brand: 'BMW',
//         model: 'test-model',
//         automat: false,
//         roof_rack: false,
//         price: 575000,
//         booked: false,
//         seats: 5,
//         _id: new ObjectID()
//     }
// ];
//
// const userData = {
//     _id: new ObjectID(),
//     username: 'jaso2nscott@gmail.com',
//     firstname: 'Jason',
//     lastname: 'Scott',
//     email: 'dev.jason.scott@gmail.com',
//     password: 'test123',
//     __v: 0
// };
//
// const reservation = {
//     car_id: new ObjectID(),
//     date_from: "2017-05-28T00:00:00.000Z",
//     date_to: "2017-05-28T00:00:00.000Z"
// };
//
// before((done) => {
//     User.remove({}).then(() => {
//         agent
//             .post('/users/signup')
//             .send(userData)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 User.find({}).then((users) => {
//                     expect(users.length).toBe(1);
//                     expect(users[0].username).toBe(userData.username);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
// });
//
// describe('POST BOOKINGS', () => {
//     it('should post a bookings', (done) => {
//         agent
//             .post('/car/' + reservation.car_id)
//             .send(reservation)
//             .end((err, res) => {
//                 if(err) {
//                     done(err);
//                 }
//                 console.log(res.body);
//                 done();
//             });
//     });
// });
//
// describe('GET BOOKINGS', () => {
//     it('should get all bookings', (done) => {
//         agent
//             .get('/bookings')
//             .expect(302)
//             .end((err, res) => {
//                 if(err) {
//                     done(err);
//                 }
//                 console.log(res.body);
//                 done();
//             });
//     });
// });
//
//
//
// // beforeEach((done) => {
//
// //     Car.remove({}).then(() => {
// //         return Car.insertMany(cars);
// //     }).then(() => done());
// // });
//
//
// // describe('POST /cars/car', () => {
// //     it('should create a new car', (done) => {
//
// //         let car = {
// //             brand: 'Honda',
// //             automat: false,
// //             roof_rack: false,
// //             price: 100000,
// //             booked: false,
// //             seats: 5
// //         };
//
// //         request(app)
// //             .post('/cars/car')
// //             .send(car)
// //             .expect(200)
// //             .expect((res) => {
// //                 expect(res.body.brand).toBe(car.brand);
// //             })
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
// //                 Cars.find({}).then((cars) => {
// //                     expect(cars.length).toBe(4);
// //                     expect(cars[3].brand).toBe(car.brand);
// //                     done();
// //                 }).catch((e) => done(e));
// //             });
// //     });
//
//
// //     it('should not create a new todo', (done) => {
// //         request(app)
// //             .post('/cars/car')
// //             .send({})
// //             .expect(400)
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
//
// //                 Cars.find().then((todos) => {
// //                     expect(todos.length).toBe(3);
// //                     done();
// //                 }).catch((e) => done(e));
// //             });
// //     });
// // });
//
// // describe('GET /cars/car', () => {
// //     it('should get all cars', (done) => {
// //         request(app)
// //             .get('/cars/car')
// //             .expect(200)
// //             .expect((res) => {
// //                 expect(res.body.cars.length).toBe(3);
// //             })
// //             .end(done);
// //     });
// // });
//
// // describe('GET /cars/car:id', () => {
// //     it('should return car doc', (done) => {
// //         request(app)
// //             .get(`/cars/car/${cars[0]._id.toHexString()}`)
// //             .expect(200)
// //             .expect((res) => {
// //                 expect(res.body.car.brand).toBe(cars[0].brand);
// //             })
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
// //                 done();
// //             });
// //     });
//
// //     it('should return 404 if todo not found', (done) => {
// //         id = new ObjectID();
// //         request(app)
// //             .get(`/cars/car/${id.toHexString()}`)
// //             .expect(404)
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
// //                 done();
// //             });
// //     });
// //     it('should return 404 for non-object ids', (done) => {
// //         id = 123;
// //         request(app)
// //             .get(`/cars/car/${id}`)
// //             .expect(400)
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
// //                 done();
// //             });
// //     });
// // });
//
// // describe('DELETE /todos/:id', () => {
//
// //     it('should remove a todo', (done) => {
// //         var hexId = cars[1]._id.toHexString();
//
// //         request(app)
// //             .del(`/cars/car/${hexId}`)
// //             .expect(200)
// //             .expect((res) => {
// //                 expect(res.body.car._id).toBe(hexId);
// //             })
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
//
// //                 Cars.findById(hexId).then((car) => {
// //                     expect(car).toNotExist();
// //                     done();
// //                 }).catch((e) => done(e));
// //             });
// //     });
//
// //     it('should return 404 if todo not found', (done) => {
// //         let id = new ObjectID();
// //         request(app)
// //             .del(`/cars/car/${id.toHexString()}`)
// //             .expect(404)
// //             .end(done);
// //     });
//
// //     it('should return 400 if object ID is invalid', (done) => {
// //         let id = '12030';
// //         request(app)
// //             .del(`/cars/car/${id}`)
// //             .expect(400)
// //             .end(done);
// //     });
// // });
//
// // describe('PATH /todos/:id', () => {
// //     it('should update the todo', (done) => {
// //         let hexId = todos[0]._id.toHexString();
//
// //         let patch = {
// //             text: 'this is updated text',
// //             completed: true
// //         };
//
// //         request(app)
// //             .patch(`/todos/${hexId}`)
// //             .send(patch)
// //             .expect(200)
// //             .expect((res) => {
// //                 expect(res.body.todo.text).toEqual(patch.text);
// //                 expect(res.body.todo.completed).toBe(true);
// //                 expect(res.body.todo.completedAt).toBeA('number');
// //             })
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
// //                 done();
// //             });
// //     });
//
// //     //         it('should clear completedAt when todo is not completed', (done) => {
// //     //             let hexId = todos[1]._id.toHexString();
//
// //     //             let patch = {
// //     //                 text: 'this is no longer completed',
// //     //                 completed: false
// //     //             };
//
// //     //             request(app)
// //     //                 .patch(`/todos/${hexId}`)
// //     //                 .send(patch)
// //     //                 .expect(200)
// //     //                 .expect((res) => {
// //     //                     expect(res.body.todo.text).toEqual(patch.text);
// //     //                     expect(res.body.todo.completed).toBe(false);
// //     //                     expect(res.body.todo.completedAt).toBe(null);
// //     //                 })
// //     //                 .end((err, res) => {
// //     //                     if (err) {
// //     //                         return done(err);
// //     //                     }
// //     //                     done();
// //     //                 });
// //     //         });
// //     //     })
// //     // });
// // });