import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = async (url) => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const post = async (url, postData) => {
        try {
            setLoading(true);
            const response = await axios.post(url, postData);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const put = async (url, putData) => {
        try {
            setLoading(true);
            const response = await axios.put(url, putData);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const remove = async (url) => {
        try {
            setLoading(true);
            await axios.delete(url);
            setData(null);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        get,
        post,
        put,
        remove,
    };
};

export default useAxios;
