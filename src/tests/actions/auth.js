import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/apiService';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

describe('Testing auth actions', () => {

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });


  test('should be call startLogin', async () => {
    await store.dispatch(startLogin('j@gmail.com', '123456'));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

    // token = localStorage.setItem.mock.calls[0][1];
  });

  test('should be call startLogin incorrect', async () => {
    await store.dispatch(startLogin('jos@gmail.com', '123456'));
    const actions = store.getActions();
    expect(actions.length).toBe(0);
    expect(Swal.fire).toHaveBeenCalled(true);
  });

  test('should be call startRegister', async () => {
    fetchModule.apiFetch = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'test',
          token: '123'
        }
      }
    }));
    await store.dispatch(startRegister(
      'test',
      'test@gmail.com',
      '123456'
    ));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'test'
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

  });

  test('should be startCheking', async () => {

    fetchModule.apiAuthFetch = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'test',
          token: '123'
        }
      }
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'test'
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
  })

});
