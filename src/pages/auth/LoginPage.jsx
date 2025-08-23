import React from "react";
import "../../styles/login.css";

import logo from "/assets/images/logo.svg";

export default function LoginPage() {
  const [chooseAction, setChooseAction] = React.useState('login');

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    phone: '',
    confirmPassword: '',
    rememberMe: false
  });

  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const [errors, setErrors] = React.useState({});

  const validate = (data, mode) => {
    const err = {}
    if (!data.email) err.email = "Enter your email"
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) err.email = "Invalid e-mail";

    if (!data.password) err.password = "Invalid password"
    else if (data.password.length < 8) err.password = "Min 8 characters"

    if (mode === "register") {
      if (!data.name) err.name = "Enter your name"
      else if (data.name.length < 3) err.name = "Min 3 characters"

      if (!data.surname) err.surname = "Enter your surname"
      else if (data.surname.length < 3) err.surname = "Min 3 characters"

      if (!data.phone || !/^[\d\s()+-]{7,}$/.test(data.phone)) err.phone = "Invalid phone number"

      if (!data.password) err.password = "Enter your password"
      else if (data.password.length < 8) err.password = "Min 8 characters"
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data.password)) {
        err.password = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      }
      if (!data.confirmPassword) err.confirmPassword = "Confirm your password"
      else if (data.password !== data.confirmPassword) err.confirmPassword = "Passwords do not match"
    }
    return err
  }

  const validateField = (name, value, data, mode) => {
    const fieldData = { ...data, [name]: value };
    switch (name) {
      case 'email':
        if (!fieldData.email) return "Enter your email";
        else if (!/^\S+@\S+\.\S+$/.test(fieldData.email)) return "Invalid e-mail";
        return "";
      case 'password':
        if (!fieldData.password) return "Invalid password";
        else if (fieldData.password.length < 8) return "Min 8 characters";
        if (mode === 'register') {
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(fieldData.password)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
          }
        }
        return "";
      case "confirmPassword":
        if (mode === "login") return "";
        if (!fieldData.confirmPassword) return "Confirm your password";
        if (fieldData.password !== fieldData.confirmPassword) return "Passwords do not match";
        return "";
      case "name":
        if (mode === "login") return "";
        if (!fieldData.name) return "Enter your name";
        if (fieldData.name.length < 3) return "Min 3 characters";
        return "";
      case "surname":
        if (mode === "login") return "";
        if (!fieldData.surname) return "Enter your surname";
        if (fieldData.surname.length < 3) return "Min 3 characters";
        return "";
      case "phone":
        if (mode === "login") return "";
        if (!fieldData.phone || !/^[\d\s()+-]{7,}$/.test(fieldData.phone)) return "Invalid phone number";
        return "";
      default:
        return "";
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      const nextData = { ...prev, [name]: nextValue };
      if (touched[name]) {
        const err = validateField(name, nextValue, nextData, chooseAction);
        upsertFieldError(name, err);
      }
      return nextData;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(p => ({...p, [name]: true}))

    const error = validateField(name, value, {...formData, [name]: value}, chooseAction);
    upsertFieldError(name, error);
  }

  const upsertFieldError = (name, error) => {
    setErrors(prev => {
      const copy={...prev}

      if(error) copy[name] = error
      else delete copy[name]
      return copy
    })
  };

  const handleSubmit = async (e) => {
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));
    e.preventDefault();
    setIsSubmitting(true);

    const allTouched = Object.keys(formData).reduce((acc, k) => (acc[k] = true, acc), {});
    setTouched(allTouched);

    const errs = validate(formData, chooseAction);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Имитация запроса (проверь, что UI показывает "Please wait...")
    console.log("Submitting...");
    await sleep(1000);
    console.log("Success");

    // Успешно — очистим форму
    setFormData({
      email: '',
      password: '',
      name: '',
      surname: '',
      phone: '',
      confirmPassword: '',
      rememberMe: false
    });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return (
    <div className="login-page">
      <section className="login-sec">
        <div className="login-heading">
          <img src={logo} alt="Logo" className="login-logo" />
          <h1>
            {chooseAction === 'login' ? 'Sign in' : 'Sign up'} your account
          </h1>
        </div>
        {chooseAction === 'login' ? (
          <form className="sign-form-container" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input" 
              placeholder="e-mail"
              required 
            />
            {(touched.email || isSubmitting) && errors.email && <div className="input-error">{errors.email}</div>}
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
              placeholder="password"
              required 
            />
            {(touched.password || isSubmitting) && errors.password && <div className="input-error">{errors.password}</div>}
            <div className="remember-me-wrapper">
              <input 
                type="checkbox" 
                name="rememberMe" 
                className="login-remember-me" 
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="form-input">remember me</label>
            </div>
            <button disabled={Object.keys(errors).length > 0 || isSubmitting} type="submit" className={`button-submit ${Object.keys(errors).length > 0 || isSubmitting ? 'button-disabled' : ''}`}>Sign in</button>

            <button className="login-button-forgot">Forgot password?</button>

            <div className="login-button-reg-wrapper">
              <button 
                className="login-button-reg"
                onClick={() => { setChooseAction('register'); setErrors({}); }}
              > Create an account
              </button>
            </div>
          </form>
        ) : (
          <form className="sign-form-container" onSubmit={handleSubmit} noValidate>
            <div className="name-surname">
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input 
                type="text" 
                name="surname"
                className="form-input" 
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="name-surname-errors">
              {(touched.name || isSubmitting) && errors.name && <div className="input-error">{errors.name}</div>}
              {(touched.surname || isSubmitting) && errors.surname && <div className="input-error">{errors.surname}</div>}
            </div>
            <input 
              type="text" 
              name="phone"
              className="form-input" 
              placeholder="phone number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.phone || isSubmitting) && errors.phone && <div className="input-error">{errors.phone}</div>}
            <input 
              type="email"
              name="email"
              className="form-input" 
              placeholder="e-mail"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.email || isSubmitting) && errors.email && <div className="input-error">{errors.email}</div>}
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.password || isSubmitting) && errors.password && <div className="input-error">{errors.password}</div>}
            <input 
              type="password" 
              name="confirmPassword"
              className="form-input" 
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.confirmPassword || isSubmitting) && errors.confirmPassword && <div className="input-error">{errors.confirmPassword}</div>}
            <button disabled={Object.keys(errors).length > 0 || isSubmitting} type="submit" className={`button-submit ${Object.keys(errors).length > 0 || isSubmitting ? 'button-disabled' : ''}`}>Sign up</button>
          </form>
        )}
      </section>
    </div>
  );
}
