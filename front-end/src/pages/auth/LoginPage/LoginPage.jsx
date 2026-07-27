import React from "react";
import styles from "./LoginPage.module.scss";

import { useAuth } from "../../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import logo from "/assets/images/logo.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login, register, isAuth, authActionLoading } = useAuth();
  const [chooseAction, setChooseAction] = React.useState("login");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [touched, setTouched] = React.useState({});

  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (isAuth) {
      navigate("/profile", { replace: true });
    }
  }, [isAuth, navigate]);

  const validate = (data, mode) => {
    const err = {};
    if (!data.email) err.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) err.email = "Invalid e-mail";

    if (!data.password) err.password = "Invalid password";
    else if (data.password.length < 8) err.password = "Min 8 characters";

    if (mode === "register") {
      if (!data.name) err.name = "Enter your name";
      else if (data.name.length < 3) err.name = "Min 3 characters";

      if (!data.surname) err.surname = "Enter your surname";
      else if (data.surname.length < 3) err.surname = "Min 3 characters";

      if (!data.phone || !/^[\d\s()+-]{7,}$/.test(data.phone))
        err.phone = "Invalid phone number";

      if (!data.password) err.password = "Enter your password";
      else if (data.password.length < 8) err.password = "Min 8 characters";
      else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
          data.password,
        )
      ) {
        err.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
      }
      if (!data.confirmPassword) err.confirmPassword = "Confirm your password";
      else if (data.password !== data.confirmPassword)
        err.confirmPassword = "Passwords do not match";
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === "checkbox" ? checked : value;

    const nextData = {
      ...formData,
      [name]: nextValue,
    };

    setFormData(nextData);

    if (touched[name]) {
      const error = validate(nextData, chooseAction)[name] || "";
      upsertFieldError(name, error);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const nextData = {
      ...formData,
      [name]: value,
    };

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validate(nextData, chooseAction)[name] || "";
    upsertFieldError(name, error);
  };

  const upsertFieldError = (name, error) => {
    setErrors((prev) => {
      const copy = { ...prev };

      if (error) copy[name] = error;
      else delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ((acc[k] = true), acc),
      {},
    );
    setTouched(allTouched);

    const errs = validate(formData, chooseAction);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    try {
      if (chooseAction === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(
          formData.name,
          formData.surname,
          formData.email,
          formData.phone,
          formData.password,
        );
      }
      navigate("/profile", { replace: true });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: error.message || "Something went wrong",
      }));
    }
  };

  return (
    <div className={styles["login-page"]}>
      <section className={styles["login-sec"]}>
        <div className={styles["login-heading"]}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles["login-logo"]} />
          </Link>
          <h1>
            {chooseAction === "login" ? "Sign in" : "Sign up"} your account
          </h1>
        </div>
        {chooseAction === "login" ? (
          <form
            className={styles["sign-form-container"]}
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles["form-input"]}
              placeholder="e-mail"
              required
            />
            <div className={styles["input-error"]}>
              {touched.email && errors.email ? errors.email : ""}
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles["form-input"]}
              placeholder="password"
              required
            />
            <div className={styles["input-error"]}>
              {touched.password && errors.password ? errors.password : ""}
            </div>
            <div className={styles["remember-me-wrapper"]}>
              <input
                type="checkbox"
                name="rememberMe"
                className={styles["login-remember-me"]}
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className={styles["form-input"]}>
                remember me
              </label>
            </div>
            <div className={styles["input-error"]}>
              {errors.form}
            </div>   
            <button
              disabled={authActionLoading || Object.keys(errors).length > 0 }
              type="submit"
              className={styles["button-submit"]}
            >
              Sign in
            </button>

            <button type="button" className={styles["login-button-forgot"]}>
              Forgot password?
            </button>

            <div className={styles["login-button-reg-wrapper"]}>
              <button
                type="button"
                className={styles["login-button-reg"]}
                onClick={() => {
                  setChooseAction("register");
                  setErrors({});
                }}
              >
                Create an account
              </button>
            </div>
          </form>
        ) : (
          <form
            className={styles["sign-form-container"]}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles["name-surname"]}>
              <input
                type="text"
                name="name"
                className={styles["form-input"]}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type="text"
                name="surname"
                className={styles["form-input"]}
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className={styles["name-surname-errors"]}>
              <div className={`${styles["input-error"]} ${styles["one-field-error"]}`}>
                <div>
                  {touched.name && errors.name ? errors.name : ""}
                </div>
                <div>
                    {touched.surname && errors.surname ? errors.surname : ""}
                </div>
              </div>
            </div>
            <input
              type="text"
              name="phone"
              className={styles["form-input"]}
              placeholder="phone number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={styles["input-error"]}>
              {touched.phone && errors.phone ? errors.phone : ""}
            </div>
            <input
              type="email"
              name="email"
              className={styles["form-input"]}
              placeholder="e-mail"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={styles["input-error"]}>
              {touched.email && errors.email ? errors.email : ""}
            </div>
            <input
              type="password"
              name="password"
              className={styles["form-input"]}
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={styles["input-error"]}>
              {touched.password && errors.password ? errors.password : ""}
            </div>
            <input
              type="password"
              name="confirmPassword"
              className={styles["form-input"]}
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={styles["input-error"]}>
              {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
            </div>
            <div className={styles["input-error"]}>
              {errors.form}
            </div>            
              <button
              disabled={authActionLoading || Object.keys(errors).length > 0 }
              type="submit"
              className={styles["button-submit"]}
            >
              Sign up
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
