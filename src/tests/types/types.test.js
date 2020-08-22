import { types } from '../../types/types';

describe('Test in types', () => {

  test('should be return the same types', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',
      eventSetActive: '[calendar] : Add set active',
      eventStartAddNew: '[calendar] : Start add new event',
      eventAddNew: '[calendar] : Add new event',
      eventClearActiveEvent: '[calendar] : Clear active event',
      eventUpdated: '[calendar] : Event updated',
      eventDeleted: '[calendar] : Event deleted',
      eventloaded: '[calendar] :  Events loaded',
      eventClean: '[calendar] :  Events clean',
      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    })
  });

});
