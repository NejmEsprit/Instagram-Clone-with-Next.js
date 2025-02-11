"use client";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Preloader = () => {
  return (
    <>
      <div>
        <ScaleLoader color="#aaa" loading={true} speedMultiplier={4} />
      </div>
    </>
  );
};

export default Preloader;
