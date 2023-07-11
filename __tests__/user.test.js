// const { postOrder } = require('../src/model/user');
const { getRegistered, LoginCheck, cart, deleteProductFromCart,UpdateProductFromCart,postOrder } = require('../src/service/user');
const connection = require('../src/utilities/connection');

afterAll(async() => {
    const userCollection = await connection.getUserCollection();
    await userCollection.findOneAndDelete({customerEmail: "anuj11@gmail.com"});
})

describe('User registered', () => {
    test('User registered unit testing', async () => {
        const data = {
            customerEmail: "anuj11@gmail.com",
            customerName: "Anuj",
            phoneNumber: 1234567890,
            password: "Abc@sdf4532",
            address: "dsafasdfasdfasdf",
            ucart: [],
            uorder: [],
        };
        const result = await getRegistered(data);
        console.log(result);
    })


})



describe('User registered', () => {
    test('User registered unit testing', async () => {
        const result = await LoginCheck("anuj@gmail.com", "Abc@sdf4532");
        console.log(result);
    })
})

describe('Add product to cart', () => {
    test('Add product to cart unit testing', async () => {
        const data = [{
            productId: "639597bbfebf4f64ac1f75f7",
            productCount:2
        }];
        const result = await cart(data,"6395a1e2fc280d1214f79722");
        console.log(result);
    })


})

describe('Add product to cart', () => {
    test('Add product to cart unit testing', async () => {
        const data = [{
            productId: "639597bbfebf4f64ac1f75f7",
            productCount:2
        }];
        const result = await cart(data,"6395a1e2fc280d1214f79722");
        console.log(result);
    })


})



describe('Update product from cart', () => {
    test('Update product from cart unit testing', async () => {
        const result = await UpdateProductFromCart("639597bbfebf4f64ac1f75f7","6395a1e2fc280d1214f79722",6);
        console.log(result);
    })


})

describe('Order Placed',()=>{
    test('Order Placed Unit Testing',async()=>{
        const data = [{
            productId: "639597bbfebf4f64ac1f75f7",
            productCount:6,
            totalcost: 10000,
            productName:"Asus Zenfone Max Pro M2"
        }];
        const  result = await postOrder(data,"6395a1e2fc280d1214f79722")

    })
})
describe('Delete product from cart', () => {
    test('Delete product from cart unit testing', async () => {
        const result = await deleteProductFromCart("6395a1e2fc280d1214f79722","639597bbfebf4f64ac1f760d");
        console.log(result);
    })


})
