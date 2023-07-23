import React, { useCallback, useEffect, useState } from "react";
import styles from "./card.module.scss";
import { getStarsByRating } from "../../../utils/getRating";
import ModalComponent from "../../Modal/Modal";
import { useTypedDispatch } from "../../../hooks/useAppDispatch";
import { addToBasket } from "../../../store/actions/shopActions";

const Card = ({ el }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();

  const handleAddToBasket = useCallback(
    (product) => {
      dispatch(addToBasket(product));
    },
    [dispatch],
  );

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className={styles.card_wrap} onClick={() => handleOpen()}>
        <span className={styles.card_tag}>{el.type}</span>
        <img src={el.image} alt="" />
        <p className={styles.card_wrap_title}>{el.title}</p>
        <hr className={styles.hr} />
        <div className={styles.price_wrap}>
          <div>
            {el.discount !== null && <span className={styles.discount}>${el.price + el.discount}</span>}
            &nbsp;
            <span className={styles.price}>${el.price}</span>
          </div>
          {getStarsByRating(el.rating)}
        </div>
      </div>
      <ModalComponent open={open} handleClose={setOpen} el={el} handleAddToBasket={handleAddToBasket} />
    </div>
  );
};

export default Card;
