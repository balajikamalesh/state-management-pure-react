import React, { useState, useEffect } from 'react';

//custom hook for fetching data
export default (url, key) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      setResponse([]);
      setError(null);
  
      fetch(url)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setResponse(data[key]);
        })
        .catch(err => {
            setLoading(false);
            setError(err);
        });
    }, [])
  
    return [response, loading, error];
}