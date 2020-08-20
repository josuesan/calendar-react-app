import moment from 'moment';
import 'moment/locale/es';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarEvent from '../../components/CalendarEvent/CalendarEvent';
import CalendarModal from '../../components/CalendarModal/CalendarModal';
import Navbar from '../../components/Navbar/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/event';
import AddNewFab from '../../components/AddNewFab/AddNewFab';
import DeleteEventFab from '../../components/DeleteEventFab/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  }
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  const onSelectSlot = () => {
    dispatch(eventClearActiveEvent());
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: uid === event.user._id ? '#367cf7' : '#465660',
      borderRadius: '0',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);


  return (
    <div className="calendar-page">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={lastView}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onSelectEvent={onSelectEvent}
        onDoubleClickEvent={onDoubleClick}
        onView={onViewChange}
      />
      {activeEvent && (
        <DeleteEventFab />
      )}
      <AddNewFab />
      <CalendarModal />
    </div>
  )
}

export default CalendarPage
