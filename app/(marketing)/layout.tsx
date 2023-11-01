import React from "react";
import MarketingNavBar from "./_components/MarketingNavBar";

const Marketinglayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <MarketingNavBar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default Marketinglayout;
