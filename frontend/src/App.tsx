import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Maintenances from "./pages/Maintenances";
import Vehicles from "./pages/Vehicles";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "trips" && <Trips />}
          {currentPage === "maintenance" && <Maintenances />}
          {currentPage === "vehicles" && <Vehicles />}
        </main>
      </div>
    </div>
  );
}

export default App;