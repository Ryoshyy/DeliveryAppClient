import * as React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";

import Drawer from "./DrawerComponent.jsx";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Scss/Header.module.scss";

const linkStyle = {
  textDecoration: "none",
  color: "white",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  columnGap: "24px",
};


const navItems = [
  <Box style={linkStyle}>
  <RouterLink to="/products" style={linkStyle}>
    Home
  </RouterLink>
  <RouterLink to="/cart" style={linkStyle}>
    Cart
  </RouterLink>
  </Box>
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  return (
    <>
      <div className={styles.root}>
        <div className={styles.upper_navbar}>
          <Link
            sx={{ display: { xs: "block", sm: "none" } }}
            className={styles.menu_icon}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </Link>
          <Box component="nav">
            <Drawer
              navItems={navItems}
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            />
          </Box>

          <Box className={styles.nav_links}>
            <Box>
              {navItems.map((itemMenu, id) => (
                <div className={styles.NavLinksItem} key={id}>
                  {itemMenu}
                </div>
              ))}
            </Box>
          </Box>
        </div>
      </div>

      <Outlet />
    </>
  );
};
