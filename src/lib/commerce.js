import Commerce from '@chec/commerce.js';
export const commerce = new Commerce(process.env.REACT_APP_SECRET_KEY, true, {
    axiosConfig: {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  });