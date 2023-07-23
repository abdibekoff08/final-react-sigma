import axios from "axios";

export const SET_PRODUCTS = "shop/setProducts";
export const ADD_TO_BASKET = "shop/addToBasket";
export const DECREASE_PRODUCT = "shop/decreaseProduct";

export const fetchProducts = (type) => (dispatch) => {
  axios.get("http://localhost:3000/api", { params: { type: type } }).then((res) => {
    res.status === 200
      ? dispatch({
          type: "isLoaded",
          payload: false,
        })
      : dispatch({
          type: "isLoaded",
          payload: "error",
        });

    dispatch({
      type: SET_PRODUCTS,
      payload: res.data.products,
    });
  });
};

export const addToBasket = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: product,
  });
};

export const decreaseProduct = (product) => (dispatch) => {
  dispatch({
    type: DECREASE_PRODUCT,
    payload: product,
  });
};
