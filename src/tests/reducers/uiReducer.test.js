import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';
import { uiOpenModal, uiCloseModal } from '../../actions/ui';

const initState = {
  modalOpen: false
};

describe('Testing in ui Reducer', () => {

  test('should be return the default state', () => {
    const res = uiReducer(initState, {});
    expect(res).toEqual({
      modalOpen: false
    });
  });

  test('should be open and close the modal', () => {
    const modalOpen = uiOpenModal();
    const modalClose = uiCloseModal();
    const state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const stateClose = uiReducer(state, modalClose);
    expect(stateClose).toEqual({ modalOpen: false });
  })


});
