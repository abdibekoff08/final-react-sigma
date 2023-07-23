import { useEffect, useState } from "react";
import Button from "../components/common/Button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Input } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Admin = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openEmails, setOpenEmails] = useState(false);
  const handleClose = () => setOpen(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getUsers`)
      .then((data) => {
        setEmails(data.data.users);
      })
      .catch((error) => {
        console.log({ ...error });
        alert(`Failed to Authorize. Error message: ${error.response.data.error.message}`);
      });
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: "",
      image: "",
      title: "",
      price: 0,
      discount: 0,
      rating: 0,
      description: "",
      detailedDescription: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/create`, {
        type: data.type,
        image: data.image,
        title: data.title,
        price: +data.price,
        discount: +data.discount,
        rating: +data.rating,
        description: data.description,
        detailedDescription: data.detailedDescription,
        additionalInfo: data.additionalInfo,
      })
      .then((data) => {
        setOpen(false);
      })
      .catch((error) => {
        console.log({ ...error });
        alert(`Failed to Authorize. Error message: ${error.response.data.error.message}`);
      });
  };

  return (
    <div className={styles.top}>
      <Button
        type="white"
        title="Create Product"
        onClick={() => setOpen(true)}
        button={false}
      ></Button>
      <Button
        type="white"
        title=" subscribed users"
        onClick={() => setOpenEmails(true)}
        button={false}
      ></Button>
      <Button
        type="white"
        title="View all orders"
        onClick={() => navigate("/admin/orders")}
        button={true}
      ></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Creating New Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_wrap}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div className={styles.form_input_wrap}>
                    <span>Category</span>
                    <Input {...field} className={styles.form_input} placeholder="Category" />
                  </div>
                )}
              />
              {/* ... other inputs ... */}
            </div>
            <button type="submit" className={`${styles.button} ${styles.blue}`}>
              Confirm
            </button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openEmails}
        onClose={() => setOpenEmails(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            subscribed users
          </Typography>
          <ul>
            {emails.map((el) => (
              <li key={el?.email}>{el?.email}</li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  );
};

export default Admin;
