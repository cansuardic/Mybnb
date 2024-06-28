import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {authUrl} from "../urls";

const SigninPage = () => {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("12345");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSignIn = () => {
    const loginData = {email: email, password: password};
    axios
      .post(`${authUrl}/login`, loginData)
      .then((response) => {
        console.log(response.data);
        const userData = response.data.user;
        sessionStorage.setItem("mybnb-user", JSON.stringify(userData));
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        alert("Giriş Başarısız: " + error.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}>
          <h2 style={{marginBottom: 20, color: "#333", textAlign: "center"}}>
            Sign In
          </h2>
          <div style={{marginBottom: 20}}>
            <label htmlFor="email" style={{color: "#333"}}>
              Email
            </label>
            <input
              value={email}
              autoComplete="off"
              onChange={handleEmailChange}
              type="email"
              id="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: 10,
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{marginBottom: 20}}>
            <label htmlFor="password" style={{color: "#333"}}>
              Password
            </label>
            <input
              value={password}
              autoComplete="off"
              onChange={handlePasswordChange}
              type="password"
              id="password"
              name="password"
              required
              style={{
                width: "100%",
                padding: 10,
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          </div>
          <button
            type="button"
            onClick={onSignIn}
            style={{
              padding: 10,
              backgroundColor: "#ff5a60",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              alignSelf: "center",
            }}>
            Sign In
          </button>
          <p style={{marginTop: 15, textAlign: "center"}}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
