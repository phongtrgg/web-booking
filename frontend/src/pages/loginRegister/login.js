import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import AuthForm from "../../component/AuthForm/authForm";
import { useSelector } from "react-redux";
import Contact from "../../component/Footer/Contact";
import Footer from "../../component/Footer/Footer";

function LoginPage() {
  const login = useSelector((state) => state.login.login);
  const user = useSelector((state) => state.login.user);
  return (
    <>
      <NavBar onPageLogin={true} />
      {!login && <AuthForm />}
      {login && (
        <div className="centerForm">
          <h1>wellcome {user.name}</h1>
        </div>
      )}
      <Contact />
      <Footer />
    </>
  );
}
export default LoginPage;
