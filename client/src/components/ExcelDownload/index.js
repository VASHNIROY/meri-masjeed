import React from "react";
import Excel from '../utils/meri-masjeed-excel.xlsx'
import { IoArrowDownCircle } from "react-icons/io5";

const ExcelDownloadLink = () => {
  return (
    <div style={{marginTop:"10px", marginBottom:"10px"}}>
      <a
        href={Excel}
        download="My-Masjid-full-year-salah-timing-sample-sheet-LONG-1.xlsx"
        style={{fontSize:"18px"}}
      >
        Download Sample Prayer Timing Excel Sheet <IoArrowDownCircle style={{fontSize:"24px"}}/>
      </a>
    </div>
  );
};

export default ExcelDownloadLink;
