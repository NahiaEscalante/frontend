import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchLogin, getRoleBasedOnToken } from "../services/api";

export const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
     // navigate("/dashboard");
    }
    
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin(formData.email, formData.password)
      .then((data) => {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        console.log(getRoleBasedOnToken());
        //navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className=" bg-bg-col rounded-3xl flex flex-col items-center p-6 max-w-lg w-full">
      <h1 className="text-4xl py-12 font-bold">Ingresar a Uber</h1>
      <form className="w-full max-w-xl text-[#4A4A4A]" onSubmit={handleSubmit}>
        <div className="py-4 mb-4 flex flex-col">
          <label className="mx-4 text-sm" htmlFor="email">
            Email
          </label>
          <input
            required
            className="bg-bg-col py-4 border-solid border-2 px-4 rounded border-register-border"
            type="email"
            name="email"
            id="email"
            onInput={handleInput}
          />
        </div>
        <div className="mb-12 flex flex-col">
          <label className="mx-4 text-sm" htmlFor="password">
            Contraseña
          </label>
          <input
            required
            className="bg-bg-col py-4 px-4 border-solid border-2 rounded border-register-border"
            type="password"
            name="password"
            id="password"
            onInput={handleInput}
          />
        </div>

        <button
          id="loginSubmit"
          className="text-lg flex items-center justify-center w-full flex-col bg-primary text-white font-bold px-3 py-4 rounded-full cursor-pointer  hover:bg-gray-100"
          type="submit"
        >
          Iniciar Sesión
        </button>
        <div className="py-8 flex items-center my-4 w-full">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2 text-gray-500">o</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        <button
          onClick={() => {
            navigate("/auth/dashboard");
          }}
          className="shadow-lg flex items-center justify-center w-full border border-gray-300 rounded py-4 px-4 bg-white text-black hover:bg-gray-100"
        >
          <img className="w-6 h-6 mr-2" />
          Ingresar con Google
        </button>
      </form>
    </section>
  );
};
