import React from "react";
import styles from "./HomePage.module.scss";
import CompanyAndProductList from "../../Components/ProjectList/CompanyAndProductList.jsx";

export const HomePage = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.ProjectsList}>
          <CompanyAndProductList />
        </div>
      </div>
    </>
  );
};
