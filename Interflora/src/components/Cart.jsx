import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartProducts } from "../featureSlice/CartReducer";
import Button from "../common/ui/Button";
// import { increment, decrement } from "../featureSlice/CartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const count = useSelector((state) => state.cart.count);
  console.log("cart", cartItems.cart);
  // let tempArr = new Set()
  // cartItems.cart?.map(ele=>tempArr.add(ele.id))
  // tempArr = [...tempArr]
  // console.log(tempArr,"ksfghlasidbgfnscal");
  const items = [...cartItems.cart];
  // console.log(items);

  // get all items
   const selectCartItems = (state) => state.cart.items;

  // cart total (sum of totalPrice)
 const selectCartTotal = (state) =>
    state.cart.items.reduce((sum, item) => sum + Number(item.totalPrice), 0);

  // total quantity
   const selectCartQuantity = (state) =>
     state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice =
    cartItems?.cart?.length > 0
      ? cartItems.cart
          .map((item) => Number(item.price))
          .reduce((acc, curr) => acc + curr, 0)
      : 0;
  console.log("total price", totalPrice);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const computePrice = (a, b) => {
    return b ? a * b : a;
  };
  return (
    <div className="container mx-auto mt-20 flex flex-col justify-center items-center ">
      <h1 className="text-center font-bold mb-6">Shopping Cart</h1>
      {items?.map((item) => (
        <div
          key={item.id}
          className="flex border justify-between  rounded-lg shadow-md mb-4 p-6 w-[70vw]  h-44 gap-6 "
        >
          <div className="flex gap-3 w-[30vw] ">
            <img src={item.img} alt="card item" className="h-32 w-32" />
            <p>{item.title}</p>
          </div>
          <div>
            <p>Standard Delivery - ₹25 </p>
            <p className="font-thin">On 31st Oct 2025 between 5pm - 9pm </p>
            <p className="font-thin">Pincode - 560098</p>
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-medium">
              ₹{computePrice(item.price, item.quantity)}
            </p>

            <div className="flex ">
              <Button
                label="-"
                disabled={count === 0}
                onClick={() => {
                  // dispatch(decrement());
                }}
                className="p-2 bg-[#EEE] w-8 font-bold"
              />
              <p className="p-2 w-12 text-center">{item.quantity}</p>
              <Button
                label="+"
                onClick={() => {
                  dispatch(addToCart(item));
                }}
                className="p-2 bg-[#BEAC89] w-10"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="shadow-md h-32 w-[70vw] p-6 flex justify-around mb-4">
        <h1 className="font-semibold "> ₹Total Amount: {totalPrice}</h1>
        <p className="bg-black  text-white h-12 p-4 text-center">
          PROCEED TO CHECKOUT
        </p>
      </div>
    </div>
  );
};

export default Cart;
