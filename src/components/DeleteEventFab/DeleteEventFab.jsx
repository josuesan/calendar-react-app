import React from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/event';

const DeleteEventFab = () => {

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(eventDeleted())
  }

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash" />
      <span> Delete event</span>
    </button>
  )
}

export default DeleteEventFab
