export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') !== null;
    }
    return false;
  };
  
  export const saveAuthToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  };
  
  export const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  };
  