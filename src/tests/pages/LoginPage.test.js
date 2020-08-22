import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from '../../pages/LoginPage/LoginPage';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';
jest.mock('../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}))
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    cheking: false
  }
}
const store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  </Provider>
);

describe('Testing in Login page', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })
  test('should be render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('should be call handle Login', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'juan@gmail.com',
      }
    });
    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      }
    });
    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() { }
    });

    expect(startLogin).toHaveBeenCalledWith('juan@gmail.com', '123456');
  });

  test('should be cancel the register if passwords dont match', () => {
    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: '1234567',
      }
    });
    wrapper.find('input[name="rPasswordRepeat"]').simulate('change', {
      target: {
        name: 'rPasswordRepeat',
        value: '123456',
      }
    });
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() { }
    });

    expect(Swal.fire).toHaveBeenCalledWith("Error", "The passwords dont match", "error");
  });

  test('should be call handle Register with correct passwords', () => {
    wrapper.find('input[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: 'Juan',
      }
    });
    wrapper.find('input[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: 'juan@gmail.com',
      }
    });
    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: '123456',
      }
    });
    wrapper.find('input[name="rPasswordRepeat"]').simulate('change', {
      target: {
        name: 'rPasswordRepeat',
        value: '123456',
      }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() { }
    });

    expect(startRegister).toHaveBeenCalledWith('Juan', 'juan@gmail.com', '123456');
  });

})
