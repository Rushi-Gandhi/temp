// module.exports = {
//     Query : {
//         orders : async(parent , args , context , info)=>{
//             console.log("Getting the orders");
//             return await Promise.resolve( parent.orders );
//         }
//     }
// }

const orderModel = require('./orders.model');

module.exports = {
    Query :  {
        orders : ()=>{
            return orderModel.getAllOrders();
        }
    }
}