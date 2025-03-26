import React from "react";

import { DataProvider } from "@/context/DataContext";
import Dashboard from "./Dashboard";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </div>
  );
};

export default Index;
