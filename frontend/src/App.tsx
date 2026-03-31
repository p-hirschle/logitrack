import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Maintenances from "./pages/Maintenances";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

function MainLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

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

function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default App;
