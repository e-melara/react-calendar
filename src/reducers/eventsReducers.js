import moment from "moment";
import { types } from "../types/types";

const initialState = {
 events: [
  {
   id: new Date().getTime(),
   start: moment().toDate(),
   title: "Cumpleaño del Jefe",
   description: "Nuevo cumpleaño",
   end: moment().add(2, "hours").toDate(),
   user: {
    name: "Edwin",
    id: "123",
   },
  },
 ],
 active: null,
};

export const calendarsReducers = (state = initialState, action) => {
 switch (action.type) {
  case types.eventSetActive:
   return {
    ...state,
    active: action.payload,
   };
  case types.eventAddEvent:
   return {
    ...state,
    events: [...state.events, action.payload],
   };
  case types.eventClearSetActive:
   return {
    ...state,
    active: null,
   };
  case types.eventUpdate:
   return {
    ...state,
    events: state.events.map((e) =>
     e.id === action.payload.id ? action.payload : e
    ),
   };
  case types.eventDelete:
   return {
    ...state,
    events: state.events.filter((e) => e.id !== state.active.id),
    active: null,
   };
  default:
   return state;
 }
};
