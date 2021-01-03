const app = require('../src/app');
const request = require('supertest')
const User = require('../src/models/user');
const { signUp, deleteAcc } = require('../emails/accounts');

test('Create User', () => {
    app.post('/users', async(req, res) => {
        const user = new User(req.body); // create instance of a new user
        try {
            await user.save()
            signUp(user.email, user.name)
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)
        }
    })
    request(app)
        .post('/users')
        .send({ name: 'john', email: 'tm_tester_451', password: 'Pass198', age: '20', })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res, done) => {
            if (err) return done(err);
            done();
        });
})