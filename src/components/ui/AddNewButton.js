import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

const AddNewButton = () => {
 const dispatch = useDispatch();

 const handleClick = () => {
  dispatch(uiOpenModal());
 };
 return (
  <button className="btn btn-primary fabs" onClick={handleClick}>
   <i className="fas fa-plus"></i>
  </button>
 );
};

export default AddNewButton;
