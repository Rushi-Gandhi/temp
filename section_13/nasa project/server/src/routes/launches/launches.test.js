const request = require('supertest');
const app = require('../../app');
const { mongoConnect ,mongoDisconnect} = require('../../services/mongo');

describe('Launches Api' ,()=>{
    beforeAll(async ()=>{
        await mongoConnect();
    });

    afterAll(async()=>{
        await mongoDisconnect();
    });
    describe('Test GET/launches' , ()=>{
        test('it should respond with status code 200' ,async ()=>{
            const response = await request(app).get('/v1/launches').expect('Content-Type' , /json/).expect(200);
        })
    })
    
    describe('Test POST/launches' , ()=>{
        const completeLaunchData  =  {
            "mission": "mission mars",
            "rocket": "pslv-3",
            "target" : "Kepler-1410 b",
            "launchDate": "April 11 , 2030"
        }
    
        const launchDataWithOutDate = {
            "mission": "mission mars",
            "rocket": "pslv-3",
            "target" : "Kepler-1410 b",
        }
    
        const launchDataWithInvalidDate  =  {
            "mission": "mission mars",
            "rocket": "pslv-3",
            "target" : "Kepler-1410 b",
            "launchDate": "any invalid date"
        }
    
        test('it should be respond with status code 201' , async()=>{
            const response = await request(app).post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type' , /json/).expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
    
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithOutDate);
    
        });
    
        test('it should be catch missing required properties' ,async ()=>{
            const response = await request(app).post('/v1/launches').send(launchDataWithOutDate).expect('Content-Type' , /json/).expect(400);
            expect(response.body).toStrictEqual({error : "Invalid data" });
    
        });
    
        test('it should be catch invalid dates' , async()=>{
            const response = await request(app).post('/v1/launches').send(launchDataWithInvalidDate).expect('Content-Type' , /json/).expect(400);
            expect(response.body).toStrictEqual({error : "Invalid date" });
    
    
        });
    });
    
    describe('Test DELETE/launches/:id', ()=>{
        const idWithRecord = 184
        const idWithoutRecord = 999;
        test('it should respond with status code 200', async()=>{
            const response = await request(app).delete(`/v1/launches/${idWithRecord}`).expect(200)
        });
    
        test('it should be catch Launch Not Found', async()=>{
            const response = await request(app).delete(`/v1/launches/${idWithoutRecord}`).expect('Content-Type' , /json/).expect(404);
            expect(response.body).toStrictEqual({error : 'Launch Not Found'});
        })
    
       
    })
});
