const orders = [
    {
        date: '10/04/2001',
        subtotal: 99.55,
        items: [{
            product: {
                id: 0, description: 'des 0',
                price: 11.22,
            },
            quantity: 5
        }]
    }
];

async function getAllOrders() {
    return orders;
}

module.exports = { getAllOrders }