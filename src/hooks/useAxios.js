import React, { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // add request instance
    const requestInterceptor = api.interceptors.request.use((config) => {
      const authToken = auth?.authToken;
      if (config) {
        config.headers.Authorization = `Bearer ${authToken}`;
        return config;
      }
      (error) => Promise.reject(error);
    });

    // add response instance

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;
            console.log(`new token: ${token}`);
            setAuth({ ...auth, authToken: token });
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { api };
};

// export default useAxios
