import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => { 
      totalAmount += (item.quantity * item.cost.replace('$',''));
    });

    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    let newItem = Object.assign({}, item);
    newItem.quantity++;
    dispatch(updateQuantity(newItem));
  };

  const handleDecrement = (item) => {
    let newItem = Object.assign({}, item);
    if ( newItem.quantity > 0 ) {
      newItem.quantity--
    }
    dispatch(updateQuantity(newItem));

    if( newItem.quantity === 0) {
      dispatch(removeItem(item));
    }

  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * item.cost.replace('$','');
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  /*
  Shopping cart page (23 points, 8 tasks)
    1. The total number of plants in the cart: 2 points
    2. The total cost of all items in the cart: 2 points
    3. A checkout button (displays the message “Coming Soon” or similar): 1 point
    4. A continue shopping button that links to the product listing page: 2 points
    5. Each plant type in the cart displays a thumbnail, name, and unit price: 6 points
    6. Increase button for each plant type in the cart that increments the number of items in the cart by one each time it's clicked and updates all appropriate values: 4 points
    7. Decrease button for each plant type in the cart that decrements the number of items in the cart by one each time it's clicked and updates all appropriate values: 4 points
  */
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              {/*
                Shopping cart page (23 points, 8 tasks)
                  8. A delete button: 2 points
              */}
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={ (e) => { handleCheckoutShopping(e) } }>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


