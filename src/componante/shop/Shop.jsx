import React, { useEffect, useState } from 'react';
import Product from '../products/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data=> setProducts(data))
    },[])
 

    return (
        <div className='shop-container'>
            <div className="product-container">
             
            {
                products.map(product=> <Product
                kay={product.id}
                product={product}
                ></Product> )
            }

            </div>
            <div className="cart-container">
                <h4>Order summary</h4>

            </div>
        </div>
    );
};

export default Shop;