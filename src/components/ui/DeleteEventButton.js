import React from "react";
import { useDispatch } from "react-redux";
import { eventDelete } from "../../actions/events";

export const DeleteEventButton = () => {
 const dispatch = useDispatch();
 const handlerDeleteEvent = () => {
  dispatch(eventDelete());
 };
 return (
  <button className="btn btn-danger fab-danger" onClick={handlerDeleteEvent}>
   <i className="fas fa-trash"></i>
   <span> Borrar evento</span>
  </button>
 );
};
