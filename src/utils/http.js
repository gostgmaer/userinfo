// utils/axiosApi.js
import axios from "axios";
import { notifySuccess, notifyerror } from "./notify/notice";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your Firebase URL

const axiosInstance = axios.create({
  baseURL,
});
// axios.defaults.withCredentials=true

export const get = async (endpint, id, query) => {
  const token = Cookies.get("accessToken");

  let recordID,
    reqUrl = undefined;
  if (recordID) {
    reqUrl = baseURL + endpint + `/${id}`;
  }
  if (!recordID) {
    reqUrl = baseURL + endpint;
  }
  const option = {
    method: "get",
    url: reqUrl,
    headers: { Authorization: token },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);

    if (!endpint.includes("protected")) {
      notifySuccess(response.data.message, 2000);
    }
  } catch (e) {
    error = e.response.data;
    if (!endpint.includes("protected")) {
      notifyerror(e.response.data.message, 2000);
    }

    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
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
  const option = {
    method: "post",
    url: baseURL + endpint,
    headers: {},
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
    notifySuccess(response.data.message, 2000);
    console.log(response);
  } catch (e) {
    error = e.response.data;
    notifyerror(e.response.data.message, 2000);
    throw new Error(JSON.stringify(e.response.data));
  }

  // if success return value
  return response?.data ? response?.data : error; // or set initial value
};

export const put = async (endpint, id, data) => {
  const option = {
    method: "put",
    url: baseURL + endpint + `/${id}`,
    headers: {},
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
    notifySuccess(response.data.message, 2000);
    console.log(response);
  } catch (e) {
    error = e.response.data;
    notifyerror(e.response.data.message, 2000);
    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
