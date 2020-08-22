import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { eventClearActiveEvent, eventStartAddNew, startEventUpdate } from '../../actions/event';
import { uiCloseModal } from '../../actions/ui';
import './index.scss';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
if (process.env.NODE_ENV !== 'test')
  Modal.setAppElement('#root')
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowEnd = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowEnd.toDate()
};
const CalendarModal = () => {
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);
  const dispatch = useDispatch();
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowEnd.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
    else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'The end date should be greater than start date.', 'error');
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(startEventUpdate(formValues));
    }
    else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleValid(true);
    closeModal();
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }


  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  }

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    });
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e
    });
  }

  return (
    <Modal
      ariaHideApp={process.env.NODE_ENV !== 'test'}
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-bg"
      closeTimeoutMS={200}
    >
      {
        activeEvent
          ? (
            <h1> Edit event</h1 >
          )
          : (
            <h1>New event</h1>
          )
      }

      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date & hour to start</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date & hour to end</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Title & notes</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Short description</small>
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            value={notes}
            onChange={handleInputChange}
            name="notes"
          />
          <small id="emailHelp" className="form-text text-muted">Additional Information</small>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal >
  )
}

export default CalendarModal
