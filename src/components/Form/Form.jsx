import React from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./form.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const FinalTextField = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      phone: "",
      message: "",
    },
  });

  const basket = useSelector((state) => state?.shop.basket);
  const allTotal = useMemo(() => basket.reduce((acc, { product, count }) => acc + product.price * count, 0), [basket]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/order`, {
        ...data,
        basket: JSON.stringify(basket),
        allTotal: allTotal.toString(),
      })
      .then((data) => {
        localStorage.removeItem("basket");
      })
      .catch((error) => {
        console.log({ ...error });
        alert(`Failed to Authorize. Error message: ${error.response.data.error.message}`);
      });

    navigate("/orderDone");
  };

  const validateFullName = (value) => {
    if (value.length <= 3) {
      return "must have more than 3 letters";
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "enter valid email";
    return true;
  };

  function isValidPhoneNumber(phoneNumber) {
    // Regular expression for a common international phone number format (including country code)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) return "enter number";
    return true;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_wrap}>
          <Controller
            name="fullName"
            rules={{ required: "Full name is required", validate: validateFullName }}
            control={control}
            render={({ field }) => (
              <div className={styles.form_input_wrap}>
                <span>Fullname</span>
                <input {...field} className={styles.form_input} placeholder="Fullname" />
                {errors.fullName && <span>{errors.fullName.message}</span>}
              </div>
            )}
          />
          <Controller
            name="email"
            rules={{ required: "email is required", validate: validateEmail }}
            control={control}
            render={({ field }) => (
              <div className={styles.form_input_wrap}>
                <span>Email</span>
                <input {...field} className={styles.form_input} placeholder="Email" />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
            )}
          />
        </div>
        <div className={styles.form_wrap}>
          <Controller
            name="address"
            rules={{ required: "Address is required", validate: validateFullName }}
            control={control}
            render={({ field }) => (
              <div className={styles.form_input_wrap}>
                <span>Address</span>
                <input {...field} className={styles.form_input} placeholder="Address" />
                {errors.address && <span>{errors.address.message}</span>}
              </div>
            )}
          />
          <Controller
            name="phone"
            rules={{ required: "Phone number is required", validate: isValidPhoneNumber }}
            control={control}
            render={({ field }) => (
              <div className={styles.form_input_wrap}>
                <span>Phone number</span>
                <input {...field} className={styles.form_input} placeholder="+777712348" />
                {errors.phone && <span>{errors.phone.message}</span>}
              </div>
            )}
          />
        </div>
        <Controller
          name="message"
          rules={{}}
          control={control}
          render={({ field }) => (
            <div className={styles.form_input_message_wrap}>
              <span>Message</span>
              <input
                placeholder="Message"
                rows={4}
                {...field}
                className={styles.form_input_message}
              />
            </div>
          )}
        />
        <br />
        <button type="submit" className={`${styles.button} ${styles.blue}`}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default FinalTextField;
