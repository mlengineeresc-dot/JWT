import { useEffect, useState, useMemo } from "react";
import { fetchProduct } from "../../featureSlice/ProductReducer";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { addCart } from "../../featureSlice/CartReducer";

const Card = () => {
  const product = useSelector((state) => state.product);
  const searchQuery = useSelector((state) => state.search.query);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return product.product;
    }

    return product.product.filter((item) => {
      const searchText = `${item.title} ${
        item.description || ""
      }`.toLowerCase();
      return searchText.includes(searchQuery.toLowerCase().trim());
    });
  }, [product.product, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleAddToCart = (item) => {
    dispatch(
      addCart({
        id: item.id,
        title: item.title,
        price: item.price,
        img: item.img,
        description: item.description,
      })
    );
  };

  return (
    <div>
      {searchQuery && (
        <div className="mt-6 mb-4 text-center">
          <p className="text-gray-600">
            Found {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        </div>
      )}

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
              <div className="flex items-center justify-between">
                <Button
                  label="Add to Cart"
                  className="border rounded p-2"
                  onClick={() => handleAddToCart(item)}
                />
                <div className="flex gap-4 pr-2">
                  <Link to={`/editproduct/${item.id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <Link to={`/deleteproduct/${item.id}`}>
                    <i className="fa-solid fa-trash"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center py-8 text-gray-500">
            {searchQuery
              ? `No products found for "${searchQuery}"`
              : "No products found"}
          </p>
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
