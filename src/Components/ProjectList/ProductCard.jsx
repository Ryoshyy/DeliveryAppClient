import React from "react";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./ProductCard.module.scss";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";

export default function ProductCard({ product, notify }) {
  const onAddToCart = (productId) => {
    try {
      const cartString = localStorage.getItem("cart");
      const cart = cartString ? JSON.parse(cartString) : {};
      const count = cart[productId];
      cart[productId] = count ? count + 1 : 1;
      const newCartString = JSON.stringify(cart);
      localStorage.setItem("cart", newCartString);
      notify()
    } catch (error) {
      return;
    }
  };
  
  return (
    <>
    <CardActionArea className={styles.card}>
      <CardMedia
        component="img"
        // height="250px"
        className={styles.card_img}
        image={product.imageUrl}
      />
      <CardContent>
        <Tooltip
          TransitionComponent={Zoom}
          placement="top-start"
          title={product.name}
        >
          <Typography gutterBottom variant="h5" component="div">
            <h5 className={styles.title}>{product.name}</h5>
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary" component="div">
          <h5>{product.description}</h5>    
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          <h5>Price:{product.unitPrice}</h5>         
        </Typography>
        <Button variant="text" className={styles.add_to_cart_btn} onClick={() => {onAddToCart(product._id)}}>
          Add to Cart
        </Button>
      </CardContent>
    </CardActionArea>
    

    </>
  );
}
