import React, { useEffect, useState } from "react";
import Input from "../common/ui/Input";
import Button from "../common/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProduct,
  fetchOne,
} from "../featureSlice/ProductReducer";
import { Link, useParams, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [input, setInput] = useState({
    title: "",
    price: "",
    category: "",
    img: "",
    description: "",
  });

  const [editInput, setEditInput] = useState({
    title: "",
    price: "",
    category: "",
    img: "",
    description: "",
  });

  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) dispatch(fetchOne(Number(id)));
  }, [id, dispatch, isEdit]);

  const editP = useSelector((state) => state.product.editProduct);
  useEffect(() => {
    if (editP && Object.keys(editP).length) {
      setEditInput({
        title: editP.title ?? "",
        price: editP.price != null ? String(editP.price) : "",
        category: editP.category ?? "",
        img: editP.img ?? "",
        description: editP.description ?? "",
      });
    }
  }, [editP]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Editing id:", id, typeof id);

    const formState = isEdit ? editInput : input;

    if (!formState.title || !formState.price || !formState.img) {
      alert("Please fill all required fields!");
      return;
    }

    const payload = {
      ...formState,
      price: Number(parseFloat(formState.price)),
    };

    try {
      if (isEdit) {

        await dispatch(editProduct({ id: Number(id), ...payload })).unwrap();
      } else {
        await dispatch(addProduct(payload)).unwrap();
      }
      navigate("/");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center p-8"
    >
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h1>

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={isEdit ? editInput.title : input.title}
          onChange={handleChange}
          className="border w-60 p-2 rounded"
        />

        <Input
          type="text"
          name="price"
          placeholder="Price"
          value={isEdit ? editInput.price : input.price}
          onChange={handleChange}
          className="border w-60 p-2 rounded"
        />

        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={isEdit ? editInput.category : input.category}
          onChange={handleChange}
          className="border w-60 p-2 rounded"
        />

        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={isEdit ? editInput.description : input.description}
          onChange={handleChange}
          className="border w-60 p-2 rounded"
        />

        <Input
          type="text"
          name="img"
          placeholder="Image URL"
          value={isEdit ? editInput.img : input.img}
          onChange={handleChange}
          className="border w-60 p-2 rounded"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          label={isEdit ? "Save Changes" : "Add Product"}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        />

        <Link to="/">
          <Button
            label="Cancel"
            className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
          />
        </Link>
      </div>
    </form>
  );
};

export default AddProduct;
