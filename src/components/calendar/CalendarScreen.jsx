import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "moment/locale/es";
import { Navbar } from "./Navbar";
import { uiOpenModal } from "../../actions/ui";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { messages } from "../../helpers/calendar-message-es";
import { useDispatch, useSelector } from "react-redux";
import { eventClearSetActive, eventSetActive } from "../../actions/events";
import AddNewButton from "../ui/AddNewButton";
import { DeleteEventButton } from "../ui/DeleteEventButton";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
 const { events, active } = useSelector((state) => state.calendar);
 const eventPropsGetter = () => {
  const style = {
   backgroundColor: "#367CF7",
   borderRadius: "0px",
   opacity: 0.8,
   display: "block",
   color: "white",
  };
  return { style };
 };
 const dispatch = useDispatch();
 const [view, setView] = useState(localStorage.getItem("lastView") || "month");

 const onViewChange = (e) => {
  setView(e);
  localStorage.setItem("lastView", e);
 };
 const onSelectEvent = (e) => {
  dispatch(eventSetActive(e));
 };
 const onDoubleClick = () => {
  dispatch(uiOpenModal());
 };
 const handlerSelectSlot = () => {
  dispatch(eventClearSetActive());
 };
 return (
  <div className="calendar-screen ">
   <Navbar />
   <Calendar
    view={view}
    events={events}
    endAccessor="end"
    messages={messages}
    startAccessor="start"
    localizer={localizer}
    onView={onViewChange}
    onSelectEvent={onSelectEvent}
    selectable={true}
    onSelectSlot={handlerSelectSlot}
    onDoubleClickEvent={onDoubleClick}
    eventPropGetter={eventPropsGetter}
    components={{
     event: CalendarEvent,
    }}
   />
   <CalendarModal />
   {active && <DeleteEventButton />}
   <AddNewButton />
  </div>
 );
};
