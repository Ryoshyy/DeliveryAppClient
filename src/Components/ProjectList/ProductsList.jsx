import React from "react";
import { Tilt } from "react-tilt";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "./ProductCard.jsx";
import axios from "../../redux/axios.js";
import styles from "./ProductList.module.scss";

export default function ProjectsList() {
  const { companyId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const companyParam = companyId ? `${companyId}` : "";
    const API_PRODUCTS = `/products/${companyParam}`;
    const getProducts = async () => {
      const res = await axios.get(API_PRODUCTS);
      setProducts(res.data);
    };
    getProducts();
  }, [companyId]);

  const notify = () => toast("Product successfully added!");
  return (
    <>
      <Grid container>
        {products.map((product) => (
          <Grid item key={product._id}>
            <Card className={styles.Card} sx={{ maxWidth: 300 }}>
              <ProductCard
                onSetProduct={setProducts}
                notify={notify}
                product={product}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
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
}
