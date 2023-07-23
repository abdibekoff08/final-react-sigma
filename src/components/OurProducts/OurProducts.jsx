import React, { useCallback, useState } from "react";
import Card from "../common/Card/Card";
import styles from "./ourproducts.module.scss";
import Button from "../common/Button/Button";
import { Grid } from "@mui/material";
import Container from "../common/Container/Container";
import { useTypedDispatch } from "../../hooks/useAppDispatch";
import { addToBasket, fetchProducts } from "../../store/actions/shopActions";
import { useSelector } from "react-redux";

const OurProducts = () => {
  const [hide, setHide] = useState(false);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    handleUpdate();
    setHide(!hide);
  };

  const handleUpdate = () => {
    dispatch(fetchProducts("all"));
  };

  const handleAddToBasket = useCallback(
    (product) => {
      dispatch(addToBasket(product));
    },
    [dispatch],
  );

  const products = useSelector((state) => state?.shop.products);

  return (
    <Container>
      <div className={styles.wrap}>
        <div>
          <p className={styles.wrap_title}>Categories</p>
          <h3>Our Products</h3>
        </div>
        <Grid container spacing={2}>
          {products?.slice(0, hide ? products.length : 4).map((el) => (
            <Grid item xs={12} sm={6} md={3} key={el.id}>
              <Card el={el} handleAddToBasket={handleAddToBasket} />
            </Grid>
          ))}
        </Grid>

        <div style={{ marginTop: "60px" }}>
          <Button
            title={hide ? "Hide" : "Load more"}
            type="blue"
            onClick={handleClick}
            button={true}
          />
        </div>
      </div>
    </Container>
  );
};

export default OurProducts;
