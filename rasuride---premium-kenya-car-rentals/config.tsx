// src/config.ts
export const getApiUrl = () => {
  const hostname = window.location.hostname;

  // If running locally on your computer...
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://127.0.0.1:8000';
  }

  // If running on phone or public internet...
  return 'http://sypheaicloud.fortiddns.com:8000';
};