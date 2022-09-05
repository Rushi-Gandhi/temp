const request = require('supertest');
const app = require('../../app');

describe('Test GET/launches' , ()=>{
    test('it should respond with status code 200' ,async ()=>{
        const response = await request(app).get('/launches').expect('Content-Type' , /json/).expect(200);
    })
})

describe('Test POST/launches' , ()=>{
    const completeLaunchData  =  {
        "mission": "mission mars",
        "rocket": "pslv-3",
        "target" : "moon",
        "launchDate": "April 11 , 2030"
    }

    const launchDataWithOutDate = {
        "mission": "mission mars",
        "rocket": "pslv-3",
        "target" : "moon",
    }

    const launchDataWithInvalidDate  =  {
        "mission": "mission mars",
        "rocket": "pslv-3",
        "target" : "moon",
        "launchDate": "any invalid date"
    }

    test('it should be respond with status code 201' , async()=>{
        const response = await request(app).post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type' , /json/).expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(requestDate).toBe(responseDate);
        expect(response.body).toMatchObject(launchDataWithOutDate);

    });

    test('it should be catch missing required properties' ,async ()=>{
        const response = await request(app).post('/launches').send(launchDataWithOutDate).expect('Content-Type' , /json/).expect(400);
        expect(response.body).toStrictEqual({error : "Invalid data" });

    });

    test('it should be catch invalid dates' , async()=>{
        const response = await request(app).post('/launches').send(launchDataWithInvalidDate).expect('Content-Type' , /json/).expect(400);
        expect(response.body).toStrictEqual({error : "Invalid date" });


    });
});

describe('Test DELETE/launches/:id', ()=>{
    const idWithRecord = 1
    const idWithoutRecord = 30;
    test('it should respond with status code 200', async()=>{
        const response = await request(app).delete(`/launches/${idWithRecord}`).expect(200)
    });

    test('it should be catch Launch Not Found', async()=>{
        const response = await request(app).delete(`/launches/${idWithoutRecord}`).expect('Content-Type' , /json/).expect(404);
        expect(response.body).toStrictEqual({error : 'Launch Not Found'});
    })

   
})