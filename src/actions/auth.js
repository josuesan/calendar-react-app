import { types } from "../types/types";
import { apiFetch, apiAuthFetch } from "../helpers/apiService";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const res = await apiFetch('auth', { email, password }, 'POST')
    const data = await res.json();
    if (!data.ok) {
      return Swal.fire('Error', data.msg, 'error');
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({
      uid: data.uid,
      name: data.name
    }));
  }
}

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const res = await apiFetch('auth/register', { name, email, password }, 'POST')
    const data = await res.json();
    if (!data.ok) {
      return Swal.fire('Error', data.msg, 'error');
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({
      uid: data.uid,
      name: data.name
    }));
  }
}

export const startChecking = () => {
  return async (dispatch) => {

    const res = await apiAuthFetch('auth/renew');
    const data = res.json();
    if (!data.ok) {
      return dispatch(checkingFinished());
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({
      uid: data.uid,
      name: data.name
    }));
  }
}

const checkingFinished = () => ({
  type: types.authCheckingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  }
}
const logout = () => ({
  type: types.authLogout
});