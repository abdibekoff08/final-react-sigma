import { Container } from "@mui/material";
import styles from "./subscribe.module.scss";
import Button from "../common/Button/Button";
import { useState } from "react";
import axios from "axios";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handle = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email");
      return;
    }

    axios
      .post(`http://localhost:3000/api/subscribe`, {
        email: email,
      })
      .then((data) => {
        setEmail("");
        alert("Subscribed successfully!");
      })
      .catch((error) => {
        console.log({ ...error });
        alert(`Failed to Subscribe. Error message: ${error.response.data.error.message}`);
      });
  };

  const validateon = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.subscribe}>
          <h2>Subscribe to our Newsletter</h2>
          <div>
            <input
              type="text"
              value={email}
              onChange={validateon}
              placeholder="email@mail.com"
            />
            <Button type="blue" title="Subscribe" onClick={handle} button={false} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subscribe;
