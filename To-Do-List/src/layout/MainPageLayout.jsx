import React from "react";
import Sidebar from "../common/ui/Sidebar";
import MainArea from "../common/ui/MainArea";

const MainPageLayout = () => {
  return (
    <div className="container mx-auto flex ">
      <Sidebar />
      <MainArea />
    </div>
  );
};

export default MainPageLayout;
