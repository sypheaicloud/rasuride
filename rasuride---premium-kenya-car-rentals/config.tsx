// src/config.tsx

export const getApiUrl = () => {
  // 🚀 LIVE PRODUCTION MODE
  // This connects your frontend (website) to your live Render backend.
  return 'https://rasuride.onrender.com';
};

/* NOTE: 
   If you ever want to go back to testing with a LOCAL backend server 
   running on your own computer, you can switch to this code later:

   export const getApiUrl = () => {
     const hostname = window.location.hostname;
     if (hostname === 'localhost' || hostname === '127.0.0.1') {
       return 'http://127.0.0.1:8000';
     }
     return 'https://rasuride.onrender.com';
   };
*/