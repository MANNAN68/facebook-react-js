import React from "react";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.authToken;
          const refreshToken = token.refreshToken;

          console.log("auth token", authToken);

          setAuth({ user, authToken, refreshToken });
          navigate("/"); // Redirect to the home page
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.error(`API Error (${status}):`, data);
      }

      setError("root.random", {
        type: "random",
        message: `User email ${formData.email} not found`,
      });
    }
  };

  return (
    <>
      <form
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <Field label="Email" error={errors.email}>
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
        <Field label="Password" error={errors.password}>
          <input
            className={`auth-input ${
              !!errors.password ? "border-red-500" : "border-gray-200"
            }`}
            {...register("password", {
              required: "Password id is required",
              minLength: {
                value: 8,
                message: "Your password must be 8 charecter",
              },
            })}
            type="password"
            name="password"
            id="password"
          />
        </Field>
        <p className="mb-4">{errors?.root?.random?.message}</p>
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
