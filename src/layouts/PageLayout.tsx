import React from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface IPageLayout{
    children: JSX.Element,
}

export const PageLayout = ({children} : IPageLayout) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
