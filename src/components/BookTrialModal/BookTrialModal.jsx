import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import css from "./BookTrialModal.module.css";

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export default function BookTrialModal({ teacher, onClose }) {
  const { name, surname, avatar_url } = teacher;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "Career and business",
    },
  });

  // ESC tuşuyla modalı kapatma
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Backdrop tıklaması ile kapatma
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onSubmit = (data) => {
    console.log("Rezervasyon Bilgileri:", {
      teacher: `${name} ${surname}`,
      ...data,
    });
    toast.success(`Trial lesson with ${name} booked successfully!`);
    reset();
    onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor an approach to you.
        </p>

        <div className={css.teacherInfo}>
          <img src={avatar_url} alt={`${name} ${surname}`} className={css.avatar} />
          <div>
            <span className={css.teacherLabel}>Your teacher</span>
            <h4 className={css.teacherName}>{name} {surname}</h4>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h3 className={css.radioTitle}>What is your main reason for learning English?</h3>

          <div className={css.radioGroup}>
            {reasons.map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <input
                  type="radio"
                  value={reason}
                  {...register("reason")}
                  className={css.radioInput}
                />
                <span className={css.customRadio}></span>
                {reason}
              </label>
            ))}
            {errors.reason && <p className={css.error}>{errors.reason.message}</p>}
          </div>

          <div className={css.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname")}
              className={`${css.input} ${errors.fullname ? css.inputError : ""}`}
            />
            {errors.fullname && <p className={css.error}>{errors.fullname.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`${css.input} ${errors.email ? css.inputError : ""}`}
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}

            <input
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
              className={`${css.input} ${errors.phone ? css.inputError : ""}`}
            />
            {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
          </div>

          <button type="submit" className={css.submitBtn}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
}