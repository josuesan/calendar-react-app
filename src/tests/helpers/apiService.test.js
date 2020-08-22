import '@testing-library/jest-dom';
import { apiFetch, apiAuthFetch } from '../../helpers/apiService';

describe('test in api Service', () => {
  let token = '';

  test('should be call to api without token', async () => {
    const res = await apiFetch('auth', {
      email: 'j@gmail.com',
      password: '123456'
    }, 'POST');

    const data = await res.json();
    expect(res instanceof Response).toBe(true);
    expect(data.ok).toBe(true);
    token = data.token;
  });

  test('should be call to api with token', async () => {
    localStorage.setItem('token', token);
    const res = await apiAuthFetch('events');
    const data = await res.json();
    expect(data.msg).not().toBe('token invalid');
  });
});
