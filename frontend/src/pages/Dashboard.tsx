import { useEffect, useState } from "react";
import { api } from "../services/api";
import Card from "../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DashboardData = {
  totalKm: number;
  volumePorCategoria: [string, number][];
  ranking: [string, number][];
  proximasManutencoes: any[];
  projecaoFinanceira: number;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400 animate-pulse">
          Carregando dashboard...
        </p>
      </div>
    );
  }

  const chartData = data.volumePorCategoria.map(([tipo, qtd]) => ({
    tipo,
    qtd,
  }));

  return (
    <div className="p-6 space-y-10 bg-slate-50 min-h-screen text-slate-800">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Visão geral da frota
        </h1>
        <p className="text-slate-500 text-sm">
          Métricas operacionais e desempenho dos veículos
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card title="Total KM" value={`${data.totalKm}`} />
        <Card
          title="Projeção Financeira"
          value={`R$ ${data.projecaoFinanceira}`}
        />
      </div>

      {/* GRÁFICO */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h2 className="mb-4 text-lg font-medium">
          Volume por Categoria
        </h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="tipo" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Bar
                dataKey="qtd"
                fill="#3FA7D6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRID INFERIOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RANKING */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h2 className="mb-4 text-lg font-medium">
            Ranking de Utilização
          </h2>

          <div className="space-y-3">
            {data.ranking.map(([modelo, km], index) => (
              <div
                key={modelo}
                className="flex justify-between items-center bg-slate-50 p-3 rounded-lg hover:bg-blue-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">
                    #{index + 1}
                  </span>
                  <span>{modelo}</span>
                </div>

                <span className="font-semibold text-slate-700">
                  {km} km
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MANUTENÇÕES */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h2 className="mb-4 text-lg font-medium">
            Próximas Manutenções
          </h2>

          {data.proximasManutencoes.length === 0 ? (
            <p className="text-slate-400">
              Nenhuma manutenção futura
            </p>
          ) : (
            <div className="space-y-3">
              {data.proximasManutencoes.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                >
                  <span>{m[2]}</span>
                  <span className="text-slate-500 text-sm">
                    {m[1]}
                  </span>

                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {m[3]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}