const express = require('express');
const path = require('path');
//const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
//const {ApolloServer}=require('apollo-server-express');
const {loadFilesSync} = require('@graphql-tools/load-files')
const {makeExecutableSchema}= require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname,'**/*.graphql'));
const resolverArray = loadFilesSync(path.join(__dirname,'**/*.resolver.js'));
const app = express();
const schema = makeExecutableSchema({
    typeDefs:typesArray,
    resolvers  :resolverArray
});

// const schemaText = buildSchema(`
//     type Query {
//         products : [Product]
//         orders : [Order]
//     }

//     type Product{
//         id : ID!
//         description : String! 
//         price : Float!
//         reviews :[Review]
//     }

//     type Review {
//         rating : Int!
//         comment : String!
//     }

//     type Order {
//         date : String!
//         subtotal : Float!
//         items : [Item]
//     }

//     type Item {
//         product : Product!
//         quantity : Int!
//     }
// `);

const root = {
    products: require('./products/products.model'),

    orders: require('./orders/orders.model')
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('app is listen on port 3000');
})


//QUERY 

// query{
//     products{
//       id
//       description
//       price
//       reviews{
//         rating
//         comment
//       }
//     }  
      
//     orders{
//       date 
//       subtotal 
//       items{
//         product{
//           id
//             description
//           price
//           reviews{rating comment}
//         }
//       }}
//     }