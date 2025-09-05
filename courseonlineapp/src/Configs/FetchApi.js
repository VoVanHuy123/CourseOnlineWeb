
import {  useState } from "react";
import Apis from "./Apis";
import cookie from 'react-cookies'
const useFetchApi = () => {
  const [loading, setLoading] = useState(false);

  const fetchApi = async ({ method = "GET", url, data = null, params = null, }) => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${cookie.load("token") || null}`,
    };

    // Nếu là FormData thì KHÔNG gán Content‑Type
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    } else{
      headers['Content-Type']= 'multipart/form-data';
                    
    }

    let response = {
      status: null,
      data: null,
      error: null,
    };

    try {
      const config = {
        method,
        url,
        data,
        params,
        headers,
      }
      const res = await Apis(config)
        

      response.status = res.status;
      response.data = res.data;
    } catch (err) {
      response.status = err.response?.status || 500;
      response.error = err.response?.data || err.message;
      console.log(response.error);
    } finally {
      setLoading(false);
    }

    return response;
  };

  return { fetchApi, loading };
};

export default useFetchApi;