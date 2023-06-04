import { CompanyList } from "./CompanyList.jsx";
import ProductsList from "./ProductsList.jsx";
import styles from "./CompanyAndProductList.module.scss";
import React from 'react'

const CompanyAndProductList = () => {
  return (
    <div className={styles.CompanyAndProductList}>
        <div className={styles.Company}><CompanyList/></div>
        <div className={styles.Products}><ProductsList/></div>
    </div>
  );
  
  }

export default CompanyAndProductList