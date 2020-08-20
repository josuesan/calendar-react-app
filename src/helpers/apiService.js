const baseUrl = process.env.REACT_APP_API_URL;

export const apiFetch = (endpoint, data, method = 'GET') => {

  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET') {
    return fetch(url);
  }

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export const apiAuthFetch = (endpoint, data, method = 'GET') => {
  const token = localStorage.getItem('token') || '';
  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    });
  }

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      'x-token': token
    },
    body: JSON.stringify(data)
  });
}