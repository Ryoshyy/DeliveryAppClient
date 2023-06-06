import axios from "../../redux/axios";
import React, { useState, useEffect } from "react";
import styles from "./CartOrders.module.scss";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";

const CartOrders = () => {
  const notify = () => toast("Order successfully added!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "Name",
      email: "Email@gmail.com",
      phone: "+380",
      address: "Orlyka street",
    },
    mode: "onChange",
  });

  const [orders, setOrders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectCompanyId, setSelectCompanyId] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const amount = orders
      .filter((o) => o.product.companyId == selectCompanyId)
      .reduce((sum, v) => sum + v.count * v.product.unitPrice, 0);
    setAmount(amount);
  }, [selectCompanyId, orders]);

  useEffect(() => {
    let state = [...companies];
    companies.forEach((company) => {
      const order = orders.find(
        (v) => v.product.companyId == company.companyId
      );
      if (!order) {
        state = state.filter((v) => v.companyId !== company.companyId);
      }
    });
    setCompanies(state);
    if (state.length !== companies.length) {
      setSelectCompanyId(state.length > 0 ? state[0].companyId : null);
    }
  }, [orders]);

  useEffect(() => {
    const cart = getOrderFromLocalStorage();

    if (cart === null) {
      setOrders([]);
      setCompanies([]);
      return;
    }

    const getOrders = async () => {
      const API_PRODUCTS = "/products";
      const orderIds = Object.keys(cart);
      const res = await axios.put(API_PRODUCTS, orderIds);
      const orders = res.data.map((v) => {
        return { product: v, count: cart[v._id] };
      });
      const companies = res.data.map((v) => {
        return { companyName: v.companyName, companyId: v.companyId };
      });
      const uniqueCompanies = Array.from(
        new Set(companies.map((c) => c.companyId))
      ).map((id) => {
        return companies.find((c) => c.companyId === id);
      });
      setSelectCompanyId(uniqueCompanies[0].companyId);
      setCompanies(uniqueCompanies);
      setOrders(orders);
    };
    getOrders();
  }, []);

  const getOrderFromLocalStorage = () => {
    try {
      const cartString = localStorage.getItem("cart");
      return cartString ? JSON.parse(cartString) : null;
    } catch (error) {
      return null;
    }
  };
  const handleChangeCount = (e, productId) => {
    let state = [...orders];
    if (+e.target.value < 1) {
      const newState = state.filter((v) => v.product._id !== productId);
      setOrders(newState);
      return;
    }
    const index = state.findIndex((v) => v.product._id == productId);
    state[index].count = +e.target.value;
    setOrders(state);
  };

  const addOrder = async (e) => {
    const products = orders
      .filter((v) => v.product.companyId == selectCompanyId)
      .map((v) => v.product);
    const API_USERS = "/user";
    const userResponse = await axios.post(API_USERS, e);
    const reqModel = {
      userId: userResponse.data._id,
      products: products,
      amount: amount,
      address: userResponse.data.address,
    };
    const API_ORDERS = "/order";
    const orderResponse = await axios.post(API_ORDERS, reqModel);
    if (orderResponse.status == 201) {
      let orderState = [...orders];
      orderState = orderState.filter(
        (v) => v.product.companyId !== selectCompanyId
      );
      removeProductsFromLocalStorage(products);
      notify();
      setOrders(orderState);
    }
  };
  const removeProductsFromLocalStorage = (products) => {
    let cart = getOrderFromLocalStorage();
    if (cart) {
      products.forEach(v => delete cart[v._id]);
      
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Grid container direction="row" justifyContent="center">
          <Grid item className={styles.left_sidebar}>
            <form
              onSubmit={handleSubmit(addOrder)}
              className={styles.left_sidebar_form}
            >
              <div className={styles.left_sidebar_inputs}>
                <TextField
                  id="outlined-basic"
                  label="Fullname"
                  variant="standard"
                  error={Boolean(errors.fullname?.message)}
                  helperText={errors.fullname?.message}
                  type="fullname"
                  {...register("fullname", { required: "Write-Name" })}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="standard"
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  type="email"
                  {...register("email", { required: "Write-Email" })}
                />
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="standard"
                  error={Boolean(errors.phone?.message)}
                  helperText={errors.phone?.message}
                  type="phone"
                  {...register("phone", { required: "Write-Phone" })}
                />
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="standard"
                  error={Boolean(errors.address?.message)}
                  helperText={errors.address?.message}
                  type="address"
                  {...register("address", { required: "Write-Address" })}
                />
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
          <Grid item className={styles.right_sidebar}>
            <div className={styles.company_list}>
              {companies.map((company) => (
                <Button
                  key={company.companyId}
                  className={styles.company_item}
                  variant="contained"
                  fullWidth
                  onClick={() => setSelectCompanyId(company.companyId)}
                >
                  {company.companyName}
                </Button>
              ))}
            </div>
            <div className={styles.right_sidebar_orders}>
              {orders
                .filter((o) => o.product.companyId == selectCompanyId)
                .map((order) => (
                  <div className={styles.card} key={order.product._id}>
                    <CardMedia
                      component="img"
                      className={styles.card_img}
                      image={order.product.imageUrl}
                    />
                    <CardContent className={styles.card_content}>
                      <Typography gutterBottom variant="h5" component="div">
                        <h3 className={styles.title}>{order.product.name}</h3>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                      >
                        <h3>{order.product.description}</h3>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                      >
                        <h3>Price:{order.product.unitPrice}</h3>
                      </Typography>
                      <TextField
                        id="standard-number"
                        label="Count"
                        type="number"
                        onChange={(e) =>
                          handleChangeCount(e, order.product._id)
                        }
                        value={order.count}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                      ></TextField>
                    </CardContent>
                  </div>
                ))}
            </div>
            <div>Total price : {amount}</div>
          </Grid>
        </Grid>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CartOrders;
