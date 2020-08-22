import '@testing-library/jest-dom';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
  checking: true,
  // uid:null,
  // name:null
};
describe('Testing in Auth Reducer', () => {

  test('should be return the default state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should be auth the user ', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: '1231561',
        name: 'Josue'
      }
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false,
      uid: '1231561',
      name: 'Josue'
    });
  });

});
