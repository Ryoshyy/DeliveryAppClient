import * as React from "react";
// import AdminButtons from "./Navigation/AdminButtons";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "./Scss/Drawer.module.scss";

export default function DrawerComponent({
  navItems,
  handleDrawerToggle,
  mobileOpen,

}) {
  const drawerWidth = 240;
  const drawer = (
    <Box
      className={styles.Drawer}
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <Typography className={styles.DrawerLogo} variant="h6" sx={{ my: 2 }}>
        Roman Antonyk
      </Typography>
      <Divider />
      <List>
        {navItems.map((itemDrawer, id) => (
          <ListItem key={id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={itemDrawer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box>
              <RouterLink to="/cart">
                <IconButton color="primary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </RouterLink>
            </Box>
    </Box>
  );
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
