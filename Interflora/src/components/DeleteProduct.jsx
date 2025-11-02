import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ConfirmModal from "../common/ui/ConfirmModal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../featureSlice/ProductReducer";

const DeleteProduct = () => {
  const [showModal, setShowModal] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    dispatch(deleteProduct(id));
    console.log("Deleted:", id);
    setShowModal(false);
    navigate("/");
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div>
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this contact?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default DeleteProduct;
