import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const { logout } = useAuth();

  return (
    <div className="w-full bg-white text-slate-800 p-4 flex justify-between items-center shadow-sm">
      <h2 className="text-lg font-semibold">Painel Administrativo</h2>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">Admin LogiTrack</span>
          <img
            src="/logap_logo.jpeg"
            alt="user"
            className="w-8 h-8 rounded-full border border-slate-200"
          />
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
          title="Sair do sistema"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
