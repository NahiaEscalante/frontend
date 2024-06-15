import React from "react";
import { Button } from "../components/Button";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <main>
      <section className="flex justify-center py-4 text-lg">
        <Button message="Iniciar Sesión" to="/auth/login" />
        <Button message="Registrarse" to="/auth/register" />
      </section>

      <article className="grid md:grid-cols-2 justify-items-center p-4 gap-4">
        <LoginForm />
        <section className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold">Bienvenido de vuelta</h2>
          <p className="text-xl py-8">Inicia sesión para empezar a usar Uber</p>
          <img src={img4} alt="uber" className="w-full" />
        </section>
      </article>
    </main>
  );
};
