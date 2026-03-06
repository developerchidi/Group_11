import React from "react";
import Navbar from "../ui/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
    </>
  );
};

export default MainLayout;