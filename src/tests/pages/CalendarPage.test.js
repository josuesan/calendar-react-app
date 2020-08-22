import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { eventSetActive } from '../../actions/event';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarPage from '../../pages/CalendarPage/CalendarPage';
import { types } from '../../types/types';
import { act } from '@testing-library/react';

jest.mock('../../actions/event', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    cheking: false,
    uid: '1231',
    name: 'Josue'
  },
  calendar: {
    events: []
  },
  ui: {
    modalOpen: false
  }
}
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarPage />
  </Provider>
);

describe('Test in calendar page', () => {

  test('should be render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should be call some functions when intecract with the calendar', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop('onSelectEvent')({ start: 'Hola' });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola' })

    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });

  });


})
