import React from 'react';
import { ReactDOM } from 'react';
import logo from './logo.svg';
import './App.css';

function ProductItem(props) {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.price}</p>
      <p>{props.description}</p>
      <p>{props.category}</p>
      <img className="img-sm" src={props.image} alt="" />
    </div>
  );
}

const productList = [
  {
    "id": 1,
    "title": "Dark Human Mind",
    "price": 101.58,
    "description": "The perfect book for everyone",
    "category": "Book",
    "image": "https://cdn0.iconfinder.com/data/icons/avatar-78/128/3-512.png"
  },
  {
    "id": 2,
    "title": "Dark Human Mind",
    "price": 101.58,
    "description": "The perfect book for everyone",
    "category": "Book",
    "image": "https://cdn0.iconfinder.com/data/icons/avatar-78/128/3-512.png"
  },
  {
    "id": 3,
    "title": "Dark Human Mind",
    "price": 101.58,
    "description": "The perfect book for everyone",
    "category": "Book",
    "image": "https://cdn0.iconfinder.com/data/icons/avatar-78/128/3-512.png"
  }
];

const showProduct = (
  <React.Fragment>
    {
      productList.map((product) => (
        <ProductItem
          key = {product.id}
          title = {product.title}
          price = {product.price}
          description = {product.description}
          category = {product.category}
          image = {product.image}
          // {...product}
        />
    ))
    }
  </React.Fragment>
)





export default showProduct;
