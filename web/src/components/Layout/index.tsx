import React from "react";

import { HeaderBar } from "./HeaderBar";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 h-screen overflow-hidden flex flex-col">
      <HeaderBar />
      <div className="overflow-y-auto flex justify-center px-4">
        <main className="w-full max-w-5xl">{children}</main>
      </div>
    </div>
  );
};
