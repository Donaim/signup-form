
const request = require('supertest');
const assert = require("assert");
const app = require("../src/app").app;

describe('GET /bad_path', () => {
    it ('responds with 404', (done) => {
        request(app)
            .get('/bad_path')
            .set('Accept', 'text/html')
            .expect(404, done)
    });

    it ('does not return local files [1]', (done) => {
        request(app)
            .get('/index.js')
            .set('Accept', 'text/html')
            .expect(404, done)
    });

    it ('does not return local files [2]', (done) => {
        request(app)
            .get('/package.json')
            .set('Accept', 'text/html')
            .expect(404, done)
    });
});

describe('GET /ping', () => {
    it ('responds with pong', (done) => {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /text\/html/)
            .expect(200)
            .then(res => { assert.equal('pong', res.text); done(); })
            .catch(err => done(err))
    });
});

describe('GET /create-event', () => {
    const okQuery = '/create-event?first_name=a&last_name=b&email=abc@gmail.com&date=2000-01-01';
    const nonsenseQuery = '/create-event?non_existent_param=1';
    const emptyQuery = '/create-event';
    const invalidFirstNameQuery = '/create-event?first_name=too_looooooooooooooooooooooooooooooooooong&last_name=b&email=abc@gmail.com&date=2000-01-01';
    const invalidLastNameQuery = '/create-event?first_name=a&last_name=too_loooooooooooooooooooooooooooooooooooooooooong&email=abc@gmail.com&date=2000-01-01';
    const invalidEmailQuery1 = '/create-event?first_name=a&last_name=b&email=too_loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong@gmail.com&date=2000-01-01';
    const invalidEmailQuery2 = '/create-event?first_name=a&last_name=b&email=no_at_symbol&date=2000-01-01';
    const invalidDateQuery = '/create-event?first_name=a&last_name=b&email=abc@gmail.com&date=notadate';
    const tooFewParamsQuery = '/create-event?first_name=a&last_name=b&email=abc@gmail.com';

    const test_invalid_query = q => done => {
        function callback(response) {
            const json = JSON.parse(response.text);
            assert.equal('string', typeof(json.error));
            done();
        }

        request(app)
            .get(q)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412)
            .then(callback)
            .catch(err => done(err))
    }

    it ('responds with json on success', (done) => {
        request(app)
            .get(okQuery)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, done);
    });

    it ('responds with json on failure', (done) => {
        request(app)
            .get(nonsenseQuery)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/, done);
    });

    it ('provides id on success', (done) => {
        function callback(response) {
            const json = JSON.parse(response.text);
            assert.notEqual('undefined', typeof(json.id));
            done();
        }

        request(app)
            .get(okQuery)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(callback)
            .catch(err => done(err))
    });

    it ('does not provide error on success', (done) => {
        function callback(response) {
            const json = JSON.parse(response.text);
            assert.equal('undefined', typeof(json.error));
            done();
        }

        request(app)
            .get(okQuery)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(callback)
            .catch(err => done(err))
    });

    it ('returns id as a string', (done) => {
        function callback(response) {
            const json = JSON.parse(response.text);
            assert.equal('string', typeof(json.id));
            done();
        }

        request(app)
            .get(okQuery)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(callback)
            .catch(err => done(err))
    });

    it ('responds with error on nonsense query',
        test_invalid_query(nonsenseQuery));

    it ('provides error as a string', (done) => {
        function callback(response) {
            const json = JSON.parse(response.text);
            assert.equal('string', typeof(json.error));
            done();
        }

        request(app)
            .get(nonsenseQuery)
            .set('Accept', 'application/json')
            .then(callback)
            .catch(err => done(err))
    });

    it ('does not provide id on error', (done) => {
        function callback(response) {
            const json = JSON.parse(response.text);
            assert.equal('undefined', typeof(json.id));
            done();
        }

        request(app)
            .get(nonsenseQuery)
            .set('Accept', 'application/json')
            .then(callback)
            .catch(err => done(err))
    });

    it ('responds with error on empty query',
        test_invalid_query(emptyQuery));

    it ('responds with error on invalid first name query',
        test_invalid_query(invalidFirstNameQuery));

    it ('responds with error on invalid last name query',
        test_invalid_query(invalidLastNameQuery));

    it ('responds with error on invalid email query [1]',
        test_invalid_query(invalidEmailQuery1));

    it ('responds with error on invalid email query [2]',
        test_invalid_query(invalidEmailQuery2));

    it ('responds with error on invalid date query',
        test_invalid_query(invalidDateQuery));

    it ('responds with error on too few params query',
        test_invalid_query(tooFewParamsQuery));

});

