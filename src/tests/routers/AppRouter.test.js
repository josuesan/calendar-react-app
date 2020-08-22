import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import AppRouter from '../../routers/AppRouter';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);



describe('Test in Router', () => {


  test('should be render', () => {
    const initState = {
      auth: {
        cheking: false
      }
    }
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should be render login if not authenticated', () => {
    const initState = {
      auth: {
        cheking: false,
      }
    }
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should be render calendar if is authenticated', () => {
    const initState = {
      auth: {
        cheking: false,
        uid: '1023165',
        name: 'x'
      },
      calendar: {
        events: []
      },
      ui: {
        modalOpen: false
      }
    }
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.calendar-page').exists()).toBe(true);
  });

});
