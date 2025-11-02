import { useEffect, useState } from "react";
import { fetchProduct } from "../../featureSlice/ProductReducer";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { addCart } from "../../featureSlice/CartReducer";

const Card = () => {
  const product = useSelector((state) => state.product);
  
  
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = product.product.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(product.product.length / pageSize);

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 border rounded">
        {currentItems.length > 0 ? (
          currentItems?.map((item) => (
            <div key={item.id} className="rounded-lg p-3">
              <Link to={`/carddetail/${item.id}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-80 h-70 object-contain"
                />
              </Link>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-600 font-mono">₹{item.price}</p>
              <div className="flex items-center justify-between  ">
                <Button
                  label="Add to Cart"
                  className="border rounded p-2"
                  // onClick={() =>
                    // dispatch(addCart({ ...product, quantity: 1, message:"from card"}))
                  // }
                />
                <div className="flex gap-4 pr-2">
                  <Link to={`/editproduct/${item.id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <Link to={`/deleteproduct/${item.id}`}>
                    <i className="fa-solid fa-trash" ></i>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 my-4">
          <Button
            label="prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />

          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              label={index + 1}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "font-bold" : ""}
            />
          ))}

          <Button
            label="Next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
