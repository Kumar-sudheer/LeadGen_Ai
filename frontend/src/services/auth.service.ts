import { api } from '../lib/api';

export const authService = {
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  googleLogin: () => {
    const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    if (import.meta.env.DEV) {
      window.open(loginUrl, '_blank', 'width=500,height=650');
    } else {
      window.location.href = loginUrl;
    }
  },
};
