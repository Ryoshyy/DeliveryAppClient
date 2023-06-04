import { Link, useNavigate } from "react-router-dom";
import axios from "../../redux/axios.js";
import React, { useEffect, useState } from "react";

import styles from "./CompanyList.module.scss"
import Button from '@mui/material/Button';
export const CompanyList = () => {

  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    const API_COMPANIES = `/companies`;
    const getCompanies = async () => {
      const res = await axios.get(API_COMPANIES);
      setCompanies(res.data);
    };
    getCompanies();
  }, []);
   
  const navigate = useNavigate();
  
  
  return (
    <>
      {companies.map((company) => (
        <div key={company._id}>
          <Button variant="contained" color="inherit" className={styles.company_item} onClick={()=>navigate(`/products/${company._id}`)}>{company.name}</Button>
        </div>
      ))}
    </>
  );
};
