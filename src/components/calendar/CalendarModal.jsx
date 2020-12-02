import React, { useEffect, useState } from "react";

import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
 eventAddNew,
 eventClearSetActive,
 eventUpdate,
} from "../../actions/events";

const customStyles = {
 content: {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
 },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const endStart = now.clone().add(1, "hours");

const initStateForm = {
 title: "",
 description: "",
 start: moment().toDate(),
 end: moment().add(2, "hours").toDate(),
 user: {
  name: "Edwin",
  id: "123",
 },
};

export const CalendarModal = () => {
 const dispatch = useDispatch();
 const { modalOpen } = useSelector((state) => state.ui);
 const { active } = useSelector((state) => state.calendar);

 const onHandlerClose = () => {
  setFormValues(initStateForm);
  dispatch(uiCloseModal());
  dispatch(eventClearSetActive());
 };
 const [titleValid, setTitleValid] = useState(false);
 const [dateStart, setDateStart] = useState(now.toDate());
 const [dateEnd, setDateEnd] = useState(endStart.toDate());

 const [formValues, setFormValues] = useState({
  title: "",
  description: "",
  start: now.toDate(),
  end: endStart.toDate(),
 });

 const { title, description, start, end } = formValues;
 const handlerInputChange = ({ target }) => {
  setFormValues({
   ...formValues,
   [target.name]: target.value,
  });
 };

 const handleStartDateChange = (e) => {
  setDateStart(e);
  setFormValues({
   ...formValues,
   start: e,
  });
 };
 const handleEndDateChange = (e) => {
  setDateEnd(e);
  setFormValues({
   ...formValues,
   end: e,
  });
 };

 const handleSubmitForm = (e) => {
  e.preventDefault();
  const endMoment = moment(end);
  const startMoment = moment(start);
  if (startMoment.isSameOrAfter(endMoment)) {
   alert("la hora de inicio esta despues de la hora final");
   return;
  }

  if (title.trim().length < 2) {
   setTitleValid(false);
   return;
  }

  setTitleValid(true);
  if (active) {
   dispatch(eventUpdate(formValues));
  } else {
   dispatch(
    eventAddNew({
     id: new Date().getTime(),
     ...formValues,
     user: {
      name: "Edwin",
      id: new Date().getTime(),
     },
    })
   );
  }
  onHandlerClose();
 };

 useEffect(() => {
  if (active) {
   setFormValues(active);
  } else {
   setFormValues(initStateForm);
  }
 }, [active, setFormValues]);

 return (
  <div>
   <Modal
    isOpen={modalOpen}
    className="modal"
    style={customStyles}
    closeTimeoutMS={200}
    onRequestClose={onHandlerClose}
    overlayClassName="modal-fondo"
   >
    <h1> Nuevo evento </h1>
    <hr />
    <form className="container" onSubmit={handleSubmitForm}>
     <div className="form-group">
      <label>Fecha y hora inicio</label>
      <DateTimePicker
       value={dateStart}
       onChange={handleStartDateChange}
       className="form-control"
      />
     </div>

     <div className="form-group">
      <label>Fecha y hora fin</label>
      <DateTimePicker
       value={dateEnd}
       onChange={handleEndDateChange}
       className="form-control"
      />
     </div>

     <hr />
     <div className="form-group">
      <label>Titulo y notas</label>
      <input
       type="text"
       className={`form-control ${!titleValid ? "is-invalid" : "is-valid"}`}
       placeholder="Título del evento"
       name="title"
       value={title}
       onChange={handlerInputChange}
       autoComplete="off"
      />
      <small id="emailHelp" className="form-text text-muted">
       Una descripción corta
      </small>
     </div>

     <div className="form-group">
      <textarea
       type="text"
       className="form-control"
       placeholder="Notas"
       rows="5"
       name="description"
       onChange={handlerInputChange}
       value={description}
      ></textarea>
      <small id="emailHelp" className="form-text text-muted">
       Información adicional
      </small>
     </div>

     <button type="submit" className="btn btn-outline-primary btn-block">
      <i className="far fa-save"></i>
      <span> Guardar</span>
     </button>
    </form>
   </Modal>
  </div>
 );
};
