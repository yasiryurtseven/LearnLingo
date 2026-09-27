import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/useAuth";
import css from "./RegistrationModal.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegistrationModal({ onClose }) {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Account created successfully!");
      reset();
      onClose();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use!");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className={css.title}>Registration</h2>
        <p className={css.description}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={`${css.input} ${errors.name ? css.inputError : ""}`}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`${css.input} ${errors.email ? css.inputError : ""}`}
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`${css.input} ${errors.password ? css.inputError : ""}`}
            />
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={css.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}