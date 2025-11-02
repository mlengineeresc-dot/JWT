import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOne } from "../../featureSlice/ProductReducer";
import Button from "./Button";
import { addCart } from "../../featureSlice/CartReducer";

const CardDetails = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { OneProduct, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchOne(id));
  }, [dispatch, id]);

  return (
    <div className="flex items-center justify-between border rounded-lg shadow-md p-8 max-w-6xl mx-auto mt-20">
      <div className="w-1/2 flex justify-center">
        <img
          src={OneProduct.img}
          alt={OneProduct.title}
          className="w-[90%] h-[400px] object-contain rounded-lg"
        />
      </div>

      <div className="w-1/2 pl-10 space-y-4">
        <h2 className="text-3xl font-bold">{OneProduct.title}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {OneProduct.description}
        </p>
        <p className="text-2xl font-semibold text-amber-600">
          ₹{OneProduct.price}
        </p>

        <Button
          label="Add to Cart"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          onClick={() =>
            dispatch(
              addCart({...OneProduct, quantity: 1, message: "from carddetails" })
            )
          }
        />
      </div>
    </div>
  );
};

export default CardDetails;
