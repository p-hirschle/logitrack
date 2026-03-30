import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Truck, Hash, Calendar, Settings } from "lucide-react";

type Vehicle = {
  id: number;
  placa: string;
  modelo: string;
  tipo: "LEVE" | "PESADO";
  ano: number;
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Frota de Veículos</h1>
        <p className="text-slate-500 text-sm">Visualize todos os veículos registrados na LogiTrack</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div 
            key={v.id} 
            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            {/* CABEÇALHO DO CARD */}
            <div className="bg-[#0072B1]/5 p-4 flex justify-between items-start border-b border-slate-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Truck className="text-[#0072B1]" size={24} />
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${
                v.tipo === 'PESADO' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {v.tipo}
              </span>
            </div>

            {/* CONTEÚDO DO CARD */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#0072B1] transition-colors">
                  {v.modelo}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 mt-1">
                  <Hash size={14} />
                  <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded uppercase">{v.placa}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Ano de Fab.</span>
                  <div className="flex items-center gap-2 text-slate-700 mt-0.5">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-sm font-medium">{v.ano}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Categoria</span>
                  <div className="flex items-center gap-2 text-slate-700 mt-0.5">
                    <Settings size={14} className="text-slate-400" />
                    <span className="text-sm font-medium">{v.tipo === 'PESADO' ? 'Pesado' : 'Leve'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
