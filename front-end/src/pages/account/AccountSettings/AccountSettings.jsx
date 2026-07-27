import React from "react";
import { Link } from "react-router-dom";

import styles from "./AccountSettings.module.scss";

import iconBack from "/assets/images/global_icons/arrow-back.svg";
import defaultAvatar from "/assets/images/profile/default-avatar.svg";
import { useAuth } from "../../../context/AuthContext";


const ProfileChangeWindow = () => {
  const { user, updateProfile, authActionLoading } = useAuth();

  const [formData, setFormData] = React.useState({
    email: user.email,
    name: user.name,
    surname: user.surname,
    phone: user.phone,
    newPassword: "",
  });

  const ALLOWED_AVATAR_TYPES = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/jpg",
    "image/svg+xml",
  ];

  const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB


  const [avatarFile, setAvatarFile] = React.useState(null);
  const [avatarPreview, setAvatarPreview] = React.useState(user.avatarUrl || defaultAvatar);

  const avatarInputRef = React.useRef(null);

  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const [submitError, setSubmitError] = React.useState(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(null);
  const hasErrors = Object.keys(errors).length > 0;

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read avatar file"));
      };

      reader.readAsDataURL(file);
    });
  }

  React.useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(user.avatarUrl || defaultAvatar);
      return;
    }
    
    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile, user.avatarUrl]);

  const validate = (data, avatarFile) => {
    const err = {};
    if (avatarFile) {
      if (!ALLOWED_AVATAR_TYPES.includes(avatarFile.type)) {
        err.avatar = "Invalid avatar file type";
      } else if (avatarFile.size > MAX_AVATAR_SIZE) {
        err.avatar = "Avatar file size exceeds 2MB";
      }
    }

    if (!data.email.trim()) err.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) err.email = "Invalid e-mail";

    if (!data.name.trim()) err.name = "Enter your name";
    else if (data.name.length < 3) err.name = "Min 3 characters";

    if (!data.surname.trim()) err.surname = "Enter your surname";
    else if (data.surname.length < 3) err.surname = "Min 3 characters";

    if (!data.phone.trim() || !/^[\d\s()+-]{7,}$/.test(data.phone.trim()))
      err.phone = "Invalid phone number";
    
    if (data.newPassword != "") {
      if (data.newPassword.length < 8) err.newPassword = "Min 8 characters";
      else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
          data.newPassword,
        )
      ) {
        err.newPassword =
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
      }
    }
    return err;
  };


  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    const nextData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextData);

    if (touched[name]) {
      const error = validate(nextData)[name] || "";
      upsertFieldError(name, error);
    }

    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const error = validate(formData, file).avatar || "";

    setTouched((prev) => ({
      ...prev,
      avatar: true,
    }));

    upsertFieldError("avatar", error);
    setAvatarFile(file);

    setSubmitError(null);
    setSubmitSuccess(null);
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

    const error = validate(nextData)[name] || "";
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

const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validate(formData, avatarFile);

  setErrors(validationErrors);

  setTouched({
    name: true,
    surname: true,
    email: true,
    phone: true,
    newPassword: true,
    avatar: true,
  });

  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  setSubmitError(null);
  setSubmitSuccess(null);

  try {
    const avatarUrl = avatarFile ? await fileToDataUrl(avatarFile) : user.avatarUrl;
    await updateProfile({
      ...formData,
      avatarUrl,
    });

    setFormData((currentFormData) => ({
      ...currentFormData,
      newPassword: "",
    }));

    setAvatarFile(null);
    setErrors({});
    setTouched({});

    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }

    setSubmitSuccess("Changes saved successfully");
  } catch (error) {
    setSubmitError(error.message);
    setAvatarFile(null);
    setAvatarPreview(user.avatarUrl || defaultAvatar);
  }
};

  return (
    <section className={styles["account-settings"]}>
      <div className={styles["account-settings-header"]}>
        <Link to="/profile">
          <img src={iconBack} alt="icon close" />
        </Link>
      </div>
      <div className={styles["account-settings-content"]}>
        <form 
          className={styles["account-settings-form"]}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles["account-settings-form-group"]}>
            <div className={styles["profile-photo-option"]}>
              <div className={styles["profile-photo-option-label"]}>
                <label htmlFor="avatar">Profile photo</label>
                <div className={styles["input-error"]}>
                  {touched.avatar ? errors.avatar : ""}
                </div>
              </div>
              <div className={styles["avatar-preview-wrapper"]}>
                <img src={avatarPreview} className={styles["avatar-preview-img"]} alt="User Avatar" />
              </div>
              <div className={styles["choose-avatar-button-wrapper"]}>
                <label htmlFor="avatar" className={styles["choose-avatar-button"]}>
                  Choose a file
                </label>
                <input
                  ref={avatarInputRef}
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleAvatarChange}
                  disabled={authActionLoading}
                />              
              </div>
            </div>
          </div>
          <div className={styles["account-settings-form-group"]}>
            <div className={styles["account-settings-title-wrapper"]}>
              <h2 className={styles["account-settings-title"]}>Personal Information</h2>
            </div>
            <div className={styles["name-surname-option"]}>
              <div className={styles["option-group"]}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  required 
                />
                <div className={styles["input-error"]}>
                  {touched.name ? errors.name : ""}
                </div>
              </div>
              <div className={styles["option-group"]}>
                <label htmlFor="surname">Surname</label>
                <input 
                  type="text" 
                  id="surname" 
                  name="surname" 
                  value={formData.surname} 
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  required 
                />
                <div className={styles["input-error"]}>
                  {touched.surname ? errors.surname : ""}
                </div>
              </div>
            </div>
            <div className={styles["option-group"]}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleFieldChange} 
                onBlur={handleBlur}
                required 
              />
              <div className={styles["input-error"]}>
                {touched.email ? errors.email : ""}
              </div>
            </div>
            <div className={styles["option-group"]}>
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleFieldChange} 
                onBlur={handleBlur}
                required
              />
              <div className={styles["input-error"]}>
                {touched.phone ? errors.phone : ""}
              </div>
            </div>
            <div className={styles["option-group"]}>
              <label htmlFor="newPassword">Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="Enter new password"
                autoComplete="new-password"
              />        
              <div className={styles["input-error"]}>
                {touched.newPassword ? errors.newPassword : ""}
              </div>

            </div>
            <div className={styles["action-buttons-wrapper"]}>
              <div>
                {submitError && <p className={styles["error-message"]}>{submitError}</p>}
                {submitSuccess && <p className={styles["success-message"]}>{submitSuccess}</p>}
              </div>
              <button disabled={authActionLoading || hasErrors } type="submit" className={styles["submit-button"]}>Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileChangeWindow;
