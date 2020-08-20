import { types } from "../types/types";
import { apiAuthFetch } from "../helpers/apiService";
import { parseEvents } from "../helpers/parseEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid: _id, name } = getState().auth;
    try {
      const res = await apiAuthFetch('events', event, 'POST');
      const data = await res.json();
      if (!data.ok) {
        return Swal.fire('Error', data.msg, 'error');
      }
      event.id = data.event.id;
      event.user = {
        _id,
        name
      }
      dispatch(eventAddNew(event));
    } catch (error) {
      console.log(error);
    }
  }
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
});

export const startEventUpdate = (event) => {
  return async (dispatch) => {
    const res = await apiAuthFetch(`events/${event.id}`, event, 'PUT');
    const data = await res.json();
    if (!data.ok) {
      return Swal.fire('Error', data.msg, 'error');
    }
    dispatch(eventUpdated(event))
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

export const startEventDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    const res = await apiAuthFetch(`events/${id}`, {}, 'DELETE');
    const data = await res.json();
    if (!data.ok) {
      return Swal.fire('Error', data.msg, 'error');
    }
    dispatch(eventDeleted());
  }
}

const eventDeleted = () => ({
  type: types.eventDeleted
});

export const eventPurge = () => ({
  type: types.eventClean
});

const eventloaded = (events) => ({
  type: types.eventloaded,
  payload: events
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    const res = await apiAuthFetch('events');
    const data = await res.json();
    if (!data.ok) {
      return Swal.fire('Error', data.msg, 'error');
    }
    const newEvents = parseEvents(data.events);
    dispatch(eventloaded(newEvents));
  }
} 