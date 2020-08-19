import { types } from "../types/types";
import moment from 'moment';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumple',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgColor: '#fafafa',
      notes: "lorem",
      user: {
        _id: 1,
        name: 'Fernando'
      }
    }
  ],
  activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:

      return {
        ...state,
        events: [...state.events, action.payload]
      }

    case types.eventSetActive:

      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventClearActiveEvent:

      return {
        ...state,
        activeEvent: null
      }
    case types.eventUpdated:

      return {
        ...state,
        events: state.events.map(e => e.id === action.payload.id ? action.payload : e)
      }

    case types.eventDeleted:

      return {
        ...state,
        activeEvent: null,
        events: state.events.filter(e => e.id !== state.activeEvent.id)
      }

    default:
      return state;
  }
}