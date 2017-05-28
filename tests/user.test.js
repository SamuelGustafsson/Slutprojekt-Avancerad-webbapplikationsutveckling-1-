const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../bin/www');
const User = require('../models/users');

const agent = request.agent(app);

const userData = {
    _id: new ObjectID(),
    username: 'jaso2nscott@gmail.com',
    firstname: 'Jason',
    lastname: 'Scott',
    email: 'dev.jason.scott@gmail.com',
    password: 'test123',
    __v: 0
};

module.exports = {userData};

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
// describe('SIGNING USERS UP -----', () => {
//     it('Username not being an email should error', (done) => {
//         agent
//             .post('/users/signup')
//             .send({
//                 username: 'not an email',
//                 password: 'password',
//                 firstname: 'Jason',
//                 lastname: 'Scott',
//                 email: 'jason@gmail.com'
//             })
//             .expect((res) => {
//                 expect(res.body.errors).toExist();
//                 expect(res.body.message).toBe('User validation failed');
//                 expect(res.body.name).toBe('ValidationError');
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err)
//                 }
//                 done();
//             });
//     });
//
//     it('no username provided should error', (done) => {
//         agent
//             .post('/users/signup')
//             .send({
//                 password: 'password',
//                 firstname: 'Jason',
//                 lastname: 'Scott',
//                 email: 'jason@gmail.com'
//             })
//             .expect((res) => {
//                 expect(res.body.name).toBe('MissingUsernameError');
//             })
//             .end(done);
//     });
//
//     it('no password provided should error', (done) => {
//         agent
//             .post('/users/signup')
//             .send({
//                 username: 'jason@gmail.com',
//                 firstname: 'Jason',
//                 lastname: 'Scott',
//                 email: 'jason@gmail.com'
//             })
//             .expect((res) => {
//                 expect(res.body.name).toBe('MissingPasswordError');
//             })
//             .end(done);
//     });
//
//     it('no first name provided should error', (done) => {
//         agent
//             .post('/users/signup')
//             .send({
//                 username: 'jason@gmail.com',
//                 password: 'test123',
//                 lastname: 'Scott',
//                 email: 'jason@gmail.com'
//             })
//             .expect((res) => {
//
//                 expect(res.body.name).toBe('ValidationError');
//                 expect(res.body.errors.firstname).toExist();
//             })
//             .end(done);
//     });
//
//     it('no last name provided should error', (done) => {
//         agent
//             .post('/users/signup')
//             .send({
//                 username: 'jason@gmail.com',
//                 password: 'test123',
//                 firstname: 'Jason',
//                 email: 'jason@gmail.com'
//             })
//             .expect((res) => {
//                 expect(res.body.name).toBe('ValidationError');
//                 expect(res.body.errors.lastname).toExist();
//             })
//             .end(done);
//     });
//
// });
//
// describe('LOGGING USERS IN ------', () => {
//     it('should not be able to login', (done) => {
//         agent
//             .post('/users/login')
//             .send({
//                 username: 'l337h4xor',
//                 password: 'password'
//             })
//             .expect(302)
//             .expect('Location', '/?formError=true')
//             .end(done);
//     });
//     it('logging in should redirct to cars', (done) => {
//         agent
//             .post('/users/login')
//             .send(userData)
//             .expect(302)
//             .expect('Location', '/cars')
//             .end(done);
//     });
// });