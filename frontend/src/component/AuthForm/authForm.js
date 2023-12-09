import "./form.css";
import React, { useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginAction } from "../../store/store";
import { useDispatch } from "react-redux";
import useRequest from "../../Hook/useRequest";

const AuthForm = () => {
  const { request, resData, setResData } = useRequest();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (isLogin) {
      request(data, "user/login");
    }
    if (!isLogin) {
      request(data, "user/sigup").then(() => {
        navigate("/login?mode=login");
      });
    }
  };

  useEffect(() => {
    if (resData && !resData.ok) {
      setTimeout(() => {
        setResData("");
      }, 3000);
    }
    if (resData && isLogin && resData.ok && resData.user) {
      dispatch(loginAction.LOGIN(resData.user));
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    }
  }, [resData]);

  return (
    <div className="centerForm">
      <div className="boxForm">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            required
            name="username"
            ref={usernameRef}
          ></input>
          <input
            type="password"
            required
            name="password"
            ref={passwordRef}
          ></input>
          <button onSubmit={onSubmit}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          {resData && !resData.ok && <h2>{resData.message}</h2>}
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
