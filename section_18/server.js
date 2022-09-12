const express = require('express');
const {buildSchema} =require('graphql');
const {graphqlHTTP}=require('express-graphql');
const app = express();

const schema = buildSchema(`
    type Query {
        description : String 
        price : Float
    }
`);

const root = {
    description : 'Red Shoe' ,
    price : 77.18
}

app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql :  true
}))

app.listen(3000, () => {
    console.log('app is listen on port 3000');
})