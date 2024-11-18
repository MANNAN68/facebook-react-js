import React from "react";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (formData) => {
    console.log(first);
    navigate("/");
  };

  return (
    <>
      <form
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <Field label="Email">
          <input
            className={`auth-input ${
              !!errors.email ? "border-red-500" : "border-gray-200"
            }`}
            {...register("email", { required: "Email id is required" })}
            type="email"
            name="email"
            id="email"
          />
        </Field>
        <Field label="Password">
          <input
            className={`auth-input ${
              !!errors.password ? "border-red-500" : "border-gray-200"
            }`}
            {...register("password", { required: "Password id is required" })}
            type="password"
            name="password"
            id="password"
          />
        </Field>

        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Login
          </button>
        </Field>
      </form>
    </>
  );
};

export default LoginForm;
