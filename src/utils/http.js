// utils/axiosApi.js
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your Firebase URL

const axiosInstance = axios.create({
  baseURL,
});

export const get = async (endpoint, queryParams) => {
  try {
    const response = await axiosInstance.get(endpoint + ".json", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleRecord = async (endpoint, id) => {
  try {
    const response = await axiosInstance.get(endpoint + "/" + id + ".json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (endpint, data) => {
  try {
    const response = await axiosInstance.post(endpint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
