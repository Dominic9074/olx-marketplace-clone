import axios from "axios";
import type { RootState } from "../app/store";
import type { Store } from "@reduxjs/toolkit";

const apiClient = axios.create({
  baseURL: "https://vercel.com/dominic9074s-projects/olx-marketplace-clone-nbo7",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store: Store<RootState>) => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default apiClient;
