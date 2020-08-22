import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import DeleteEventFab from '../../components/DeleteEventFab/DeleteEventFab';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { startEventDelete } from '../../actions/event';
jest.mock('../../actions/event', () => ({
  startEventDelete: jest.fn()
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);



describe('Testing in Delete Event Fab', () => {

  test('should be render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should be call StartDelete', () => {

    wrapper.find('button').simulate('click');
    expect(store.dispatch).toHaveBeenCalled();
    expect(startEventDelete).toHaveBeenCalled();

  });

});
