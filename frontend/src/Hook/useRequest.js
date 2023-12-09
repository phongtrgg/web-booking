import { useState } from "react";

function useRequest() {
  const [resData, setResData] = useState();
  const [err, setErr] = useState();
  const request = async (data, url) => {
    try {
      if (data) {
        console.log("dataRequest", data);
        const response = await fetch(
          `https://test-app-booking-3e00c4500d4f.herokuapp.com/${url}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const resData = await response.json();
        setResData(resData);
      } else {
        const response = await fetch(
          `https://test-app-booking-3e00c4500d4f.herokuapp.com/${url}`
        );
        const resData = await response.json();
        setResData(resData);
      }
    } catch (err) {
      setErr(err);
    }
  };
  return { resData, request, setResData, err };
}

export default useRequest;
