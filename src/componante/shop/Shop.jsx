import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../products/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([])

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data=> setProducts(data))
    },[])

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1: get id of the addedProduct
        for(const id in storedCart){
            //step 2: get product from products by using id;
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                // step 3: add Quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                
                // step: 4 add product save cart

                savedCart.push(addedProduct)
            }
            console.log('product', addedProduct)

        }
        // step 5: set the cart
        setCart(savedCart);
    },[products])

    const handleAddToProduct= product=>{
        let newCart = [];
        // const newCart = [...cart, product];

        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity =1;
            newCart=[...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd=> pd.id !== product.id)
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        addToDb(product.id);
        
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
             
            {
                products.map(product=> <Product
                key={product.id}
                product={product}
                handleAddToProduct={handleAddToProduct}
                ></Product> )
            }

            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;