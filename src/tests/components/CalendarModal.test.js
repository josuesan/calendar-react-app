import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CalendarModal from '../../components/CalendarModal/CalendarModal';
import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import { startEventUpdate, eventClearActiveEvent, eventStartAddNew } from '../../actions/event';

jest.mock('../../actions/event.js', () => ({
  startEventUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowEnd = now.clone().add(1, 'hours');

const initState = {
  auth: {
    cheking: false,
    uid: '1231',
    name: 'Josue'
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola',
      notes: 'Some',
      start: now.toDate(),
      end: nowEnd.toDate()
    }
  },
  ui: {
    modalOpen: true
  }
}
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);


describe('Testing Calendar modal', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should be show the modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should be call update and close modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    expect(startEventUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should be show the error if title is blank', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  })

  test('should be create a new event', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        uid: '123',
        name: 'js'
      },
      ui: {
        modalOpen: true
      }
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store} >
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    });

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'notes',
        value: 'notes'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: 'notes'
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should be validate dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    });

    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    })

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });


    expect(Swal.fire).toHaveBeenCalledWith("Error", "The end date should be greater than start date.", "error");
  });

})
