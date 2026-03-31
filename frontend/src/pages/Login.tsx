import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { LogIn, Lock, User, AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/login", { username, password });
      login(response.data.token);
    } catch (err: any) {
      setError("Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  };

return (
      <div className="relative min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden">
        
        {/* VORTEX BACKGROUND */}
        <div className="vortex-bg top-[-200px] left-[-200px]" />
        <div className="vortex-bg bottom-[-200px] right-[-200px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-[#3FA7D6]/10 backdrop-blur-[2px]" />

        {/* CARD */}
        <div className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
        
        {/* LOGO E TÍTULO */}
        <div className="text-center mb-8">
          <div className="bg-[#0072B1] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">LogiTrack Pro</h1>
          <p className="text-slate-500 text-sm mt-1">Acesso ao sistema de frotas</p>
        </div>

        {/* MENSAGEM DE ERRO */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block ml-1">Usuário</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0072B1] transition-colors" size={18} />
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-[#0072B1] focus:border-transparent transition-all"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block ml-1">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0072B1] transition-colors" size={18} />
              <input
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-[#0072B1] focus:border-transparent transition-all"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0072B1] hover:bg-[#005a8e] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? "Acessando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-400 text-xs">
          © 2026 LogiTrack Pro. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
