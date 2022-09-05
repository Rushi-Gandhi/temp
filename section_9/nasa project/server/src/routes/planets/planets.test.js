const request = require('supertest');
const app = require('../../app');

describe('Test GET/planets' , ()=>{
    test('it should respond with status code 200' , async()=>{
        const response = await request(app).get('/planets').expect('Content-Type' , /json/).expect(200);
    })
})