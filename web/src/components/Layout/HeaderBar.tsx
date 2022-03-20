import React from "react";
import { Header } from "@mantine/core";

export const HeaderBar: React.FC = () => {
  return (
    <Header height={60}>
      <div className="pl-6 h-full flex items-center text-xl font-bold">
        New Beginnings
      </div>
    </Header>
  );
};
