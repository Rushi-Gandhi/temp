// module.exports = {
//     Query : {
//         products : async(parent , args , context , info)=>{
//             //parent => root object
//             // args => when we have parameterised query
//             // context => data that share acrros alll resolver
//             // info => information about current state about operation
//             console.log("Getting the prodcts");
//             return await Promise.resolve( parent.products );
//         }
//     }
// }

const productModel = require('./products.model');

module.exports = {
    Query :  {
        products : ()=>{
            return productModel.getAllProducts();
        },
        ProductsByPrice : (_, args)=>{
            return productModel.getProductsByPrice(args.min , args.max);
        },
        productById :(_ ,args)=>{
            return  productModel.getproductById(args.id);
        }
    },
    Mutation :{
        addNewProduct:(_,args)=>{
            return  productModel.addNewProduct(args.id , args.description , args.price);
        },
        addNewReview:(_,args)=>{
            return  productModel.addNewReview(args.id , args.rating , args.comment);
        }
    }
}