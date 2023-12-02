import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { redirect } from 'react-router-dom';

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token =JSON.parse(localStorage.getItem('token'))

  const fetchData = async (url, method = 'get', requestData = null) => {
    setLoading(true);
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/',
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Add the token if available
      },
    });
    axiosInstance.interceptors.response.use(
      (response) => {
        // Successful response handling
        
        setData(response.data);
        setError(null);
        setLoading(false);
        return response;
      },
      (err) => {
        // Error response handling
        
        setError(err);
        setLoading(false);
        return Promise.reject(err);
      }
    );
    try {
      let response;
      if (method === 'get') {
        response = await axiosInstance.get(url);
      } else if (method === 'post') {
        response = await axiosInstance.post(url, requestData);
      } else if (method === 'put') {
        response = await axiosInstance.put(url, requestData);
      } else if (method === 'delete') {
        response = await axiosInstance.delete(url);
      }


      setData(response.data);
      setError(null);
    } catch (err) {
      if (err.status == 403||err.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.replace('/login')
      }
      

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    get: (url) => fetchData(url, 'get'),
    post: (url, requestData) => fetchData(url, 'post', requestData),
    put: (url, requestData) => fetchData(url, 'put', requestData),
    remove: (url) => fetchData(url, 'delete'),
  };
};

export default useApi;