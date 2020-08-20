import React from 'react'
import { useForm } from '../../hooks/useForm';
import './login.scss';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

const LoginPage = () => {

  const dispatch = useDispatch();

  const [loginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: ''
  });

  const [registerValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rPasswordRepeat: ''
  });

  const { lEmail, lPassword } = loginValues;
  const { rName, rEmail, rPassword, rPasswordRepeat } = registerValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (rPassword !== rPasswordRepeat) {
      return Swal.fire('Error', 'The passwords dont match', 'error');
    }
    dispatch(startRegister(rName, rEmail, rPassword));
  }
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="lEmail"
                placeholder="Email"
                onChange={handleLoginInputChange}
                value={lEmail}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="lPassword"
                placeholder="Password"
                onChange={handleLoginInputChange}
                value={lPassword}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="rPasswordRepeat"
                value={rPasswordRepeat}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
