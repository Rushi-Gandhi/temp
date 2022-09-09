const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
describe('palanet data', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });
    describe('Test GET/planets', () => {
        test('it should respond with status code 200', async () => {
            const response = await request(app).get('/v1/planets').expect('Content-Type', /json/).expect(200);
        })
    })

})