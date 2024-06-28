import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {authUrl} from "../urls";

const RegisterPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [birth_date, setBirthDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      password: password,
      birth_date: birth_date,
    };
    axios
      .post(`${authUrl}/register`, registerData)
      .then((response) => {
        alert("Kayıt Başarılı, Girişe yönlendiriliyorsunuz");
        setTimeout(() => {
          navigate("/signin");
        }, 300);
      })
      .catch((error) => {
        alert("Kayıt Başarısız: " + error.message);
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
          Register
        </h2>
        <div style={{marginBottom: 20}}>
          <label htmlFor="name" style={{color: "#333"}}>
            Name
          </label>
          <input
            value={first_name}
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
            id="name"
            name="name"
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
          <label htmlFor="surname" style={{color: "#333"}}>
            Surname
          </label>
          <input
            value={last_name}
            onChange={(event) => setLastName(event.target.value)}
            type="text"
            id="surname"
            name="surname"
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
          <label htmlFor="phone" style={{color: "#333"}}>
            Phone Number
          </label>
          <input
            value={phone_number}
            onChange={(event) => setPhoneNumber(event.target.value)}
            type="tel"
            id="phone"
            name="phone"
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
          <label htmlFor="email" style={{color: "#333"}}>
            Email
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
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
        <div style={{marginBottom: 20}}>
          <label htmlFor="dob" style={{color: "#333"}}>
            Date of Birth (YYYY-MM-DD)
          </label>
          <input
            value={birth_date}
            onChange={(event) => setBirthDate(event.target.value)}
            id="dob"
            name="dob"
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
          onClick={handleSubmit}
          style={{
            padding: 10,
            backgroundColor: "#ff5a60",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            alignSelf: "center",
          }}>
          Register
        </button>
        <p style={{marginTop: 15, textAlign: "center"}}>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
