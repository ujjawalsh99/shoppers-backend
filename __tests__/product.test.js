const {getProductDetails, getProductDetailsByCategory, getProductDetailsById, getProductDetailsByName} = require('../src/service/product')

describe('Product Unit Testing', () => {
    test('Fetch all products', async() => {
        const result = await getProductDetails();
        expect(result[0]).toHaveProperty('pSeller');
        expect(result[0]).toHaveProperty('pName');
        expect(result[0]).toHaveProperty('pCategory');
        expect(result[0]).toHaveProperty('price');
    })

}) 

describe('Product by category unit testing',()=>{
    test('Fetch product by category',async()=>{
        const result = await getProductDetailsByCategory('Shoes');
        // console.log(result);
    })
})

describe('Product by category unit testing',()=>{
    test('Fetch product by category',async()=>{
        const result = await getProductDetailsByCategory('Electronics');
        // console.log(result);
    })
})

describe('Product by category unit testing',()=>{
    test('Fetch product by category',async()=>{
        const result = await getProductDetailsByCategory('Furniture');
        // console.log(result);
    })
})

describe('Product by category unit testing',()=>{
    test('Fetch product by category',async()=>{
        const result = await getProductDetailsByCategory('Clothing');
        // console.log(result);
    })
})
describe('Product by id unit testing',()=>{
    test('Fetch product by id',async()=>{
        const result = await getProductDetailsById('639597bbfebf4f64ac1f7609');
        // console.log(result);
    })
})

describe('Product by id unit testing',()=>{
    test('Fetch product by id',async()=>{
        const result = await getProductDetailsById('639597bbfebf4f64ac1f760a');
        // console.log(result);
    })
})
describe('Product by id unit testing',()=>{
    test('Fetch product by id',async()=>{
        const result = await getProductDetailsById('639597bbfebf4f64ac1f760a');
        // console.log(result);
    })
})
describe('Product by id unit testing',()=>{
    test('Fetch product by id',async()=>{
        const result = await getProductDetailsById('639597bbfebf4f64ac1f7609');
        // console.log(result);
    })
})
describe('Product by id unit testing',()=>{
    test('Fetch product by id',async()=>{
        const result = await getProductDetailsById('639597bbfebf4f64ac1f7608');
        // console.log(result);
    })
})
describe('Product by name-search testing',()=>{
    test('Fetch product by search',async()=>{
        const result = await getProductDetailsByName('Addidas');
        console.log(result);
    })
})



