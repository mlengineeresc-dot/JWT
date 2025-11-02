import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  removeCartItem,
  clearCartAsync,
  fetchCartProducts,
} from "../featureSlice/CartReducer";
import Button from "../common/ui/Button";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const totalPrice =
    cartItems?.length > 0
      ? cartItems
          .reduce((acc, item) => acc + Number(item.totalPrice || item.price), 0)
          .toFixed(2)
      : "0.00";

  const handleAddItem = (item) => {
    dispatch(addCart(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCartAsync());
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 flex flex-col justify-center items-center">
      <h1 className="text-center font-bold mb-6 text-2xl">Shopping Cart</h1>

      {cartItems?.length > 0 && (
        <button
          onClick={handleClearCart}
          className="mt-4 mb-6 p-3 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Clear Cart
        </button>
      )}

      {cartItems?.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex border justify-between rounded-lg shadow-md mb-4 p-6 w-[70vw] h-44 gap-6"
            >
              <div className="flex gap-3 w-[30vw]">
                <img
                  src={item.img}
                  alt="cart item"
                  className="h-32 w-32 object-cover"
                />
                <p className="font-medium">{item.title || item.name}</p>
              </div>

              <div>
                <p>Standard Delivery - ₹25</p>
                <p className="font-thin">On 31st Oct 2025 between 5pm - 9pm</p>
                <p className="font-thin">Pincode - 560098</p>
              </div>

              <div className="flex flex-col justify-between">
                <p className="font-medium">₹{item.totalPrice || item.price}</p>
                <div onClick={() => handleRemoveItem(item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    label="-"
                    // onClick={() => handleRemoveItem(item.id)}
                    className="p-2 bg-[#BEAC89] w-10 rounded hover:bg-[#a89576]"
                  />

                  <p className="p-2 w-12 text-center font-semibold">
                    {item.quantity || 1}
                  </p>

                  <Button
                    label="+"
                    onClick={() => handleAddItem(item)}
                    className="p-2 bg-[#BEAC89] w-10 rounded hover:bg-[#a89576]"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="shadow-md h-32 w-[70vw] p-6 flex justify-around items-center mb-4 rounded-lg">
            <h1 className="font-semibold text-xl">
              Total Amount: ₹{totalPrice}
            </h1>
            <button className="bg-black text-white h-12 px-8 rounded hover:bg-gray-800">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
