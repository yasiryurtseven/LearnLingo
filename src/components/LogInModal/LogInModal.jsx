import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/useAuth";
import css from "./LogInModal.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LogInModal({ onClose }) {
  const { logIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Arka plan tıklaması ile kapatma
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      toast.success("Logged in successfully!");
      reset();
      onClose();
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password!");
      } else {
        toast.error("Login failed. Please try again.");
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

        <h2 className={css.title}>Log In</h2>
        <p className={css.description}>
          Welcome back! Please enter your credentials to access your account and
          continue your learning journey.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputGroup}>
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
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}