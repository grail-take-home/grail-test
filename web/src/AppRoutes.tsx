import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { PatientPage } from "./pages/PatientPage";

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<PatientPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);
