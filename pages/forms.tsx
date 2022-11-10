import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

const Forms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onValid = (data: LoginForm) => {
    console.log("im valid bby");
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "username is require",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "email is require",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        required
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is require",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Forms;
