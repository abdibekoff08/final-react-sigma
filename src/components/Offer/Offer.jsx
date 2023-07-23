import React from "react";
import { Grid } from "@mui/material";
import Card from "../common/Card/Card";
import Container from "../common/Container/Container";
import styles from "./offer.module.scss";
import { useTypedDispatch } from "../../hooks/useAppDispatch";
import { addToBasket } from "../../store/actions/shopActions";
import { useSelector } from "react-redux";

const Offer = () => {
  const products = useSelector((state) => state?.shop.products);
  const dispatch = useTypedDispatch();

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.offer}>
          <p>Offer</p>
          <h3>We Offer Organic For You</h3>
        </div>
        <div>
          <Grid container spacing={2}>
            {products.slice(0, 4).map((el) => (
              <Grid item xs={12} sm={6} md={3} key={el.id}>
                <Card el={el} handleAddToBasket={handleAddToBasket} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Offer;
