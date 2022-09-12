const products = [{
    id: 1,
    description: 'des 1',
    price: 11.22,
    reviews: [{
        rating: 4,
        comment: 'cmt 1'
    }]
},
{
    id: 2,
    description: 'des 2',
    price: 22.22,
    reviews: [{
        rating: 4,
        comment: 'cmt 2' 
    }]
}];

function getAllProducts() {
    return products;
}

function getProductsByPrice(min, max) {
    return products.filter((product) => {
        return product.price >= min && product.price <= max;
    });
}



 function getproductById(id){
    return products.find((product)=>{
        return product.id == id ;
    });
}

function addNewProduct(id , description , price){
    const data = {id : id , description : description , price : price ,reviews : [] }
   products.push(data);
   return data

}

function addNewReview(id , rating , comment){
    var matchProduct = getproductById(id);
    if(matchProduct)
    {
        const newProductReview = {
            rating ,comment
        }
        matchProduct.reviews.push(newProductReview);
        return newProductReview;
    }
}
module.exports = { getAllProducts, getProductsByPrice ,  getproductById , addNewProduct ,addNewReview}