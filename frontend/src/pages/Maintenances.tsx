import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Plus, Trash, Pencil, X, Save, AlertCircle, CheckCircle, Clock } from "lucide-react";

type Vehicle = {
  id: number;
  placa: string;
  modelo: string;
};

type Maintenance = {
  id?: number;
  vehicle: Vehicle;
  dataInicio: string;
  dataFinalizacao: string;
  tipoServico: string;
  custoEstimado: number;
  status: "PENDENTE" | "EM_REALIZACAO" | "CONCLUIDA";
};

export default function Maintenances() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<Maintenance | null>(null);
  const [formData, setFormData] = useState({
    vehicleId: "",
    dataInicio: "",
    dataFinalizacao: "",
    tipoServico: "",
    custoEstimado: "",
    status: "PENDENTE",
  });

  useEffect(() => {
    fetchMaintenances();
    fetchVehicles();
  }, []);

  const fetchMaintenances = () => {
    api.get("/maintenances").then((res) => {
        setMaintenances(res.data);
    });
  };

  const fetchVehicles = () => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  };

  const handleOpenModal = (m?: Maintenance) => {
    if (m) {
      setEditingMaintenance(m);
      setFormData({
        vehicleId: m.vehicle?.id.toString() || "",
        dataInicio: m.dataInicio ? m.dataInicio.slice(0, 10) : "",
        dataFinalizacao: m.dataFinalizacao ? m.dataFinalizacao.slice(0, 10) : "",
        tipoServico: m.tipoServico,
        custoEstimado: m.custoEstimado.toString(),
        status: m.status,
      });
    } else {
      setEditingMaintenance(null);
      setFormData({
        vehicleId: "",
        dataInicio: "",
        dataFinalizacao: "",
        tipoServico: "",
        custoEstimado: "",
        status: "PENDENTE",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta manutenção?")) {
      api.delete(`/maintenances/${id}`).then(() => fetchMaintenances());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      vehicle: { id: parseInt(formData.vehicleId) },
      dataInicio: formData.dataInicio,
      dataFinalizacao: formData.dataFinalizacao,
      tipoServico: formData.tipoServico,
      custoEstimado: parseFloat(formData.custoEstimado),
      status: formData.status,
    };

    if (editingMaintenance) {
      api.put(`/maintenances/${editingMaintenance.id}`, payload).then(() => {
        fetchMaintenances();
        setIsModalOpen(false);
      });
    } else {
      api.post("/maintenances", payload).then(() => {
        fetchMaintenances();
        setIsModalOpen(false);
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONCLUIDA":
        return <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"><CheckCircle size={12} /> Concluída</span>;
      case "EM_REALIZACAO":
        return <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"><Clock size={12} /> Em Realização</span>;
      default:
        return <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"><AlertCircle size={12} /> Pendente</span>;
    }
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Agendamento de Manutenção</h1>
          <p className="text-slate-500 text-sm">Controle de revisões e custos da frota</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Nova Manutenção
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-600">Veículo</th>
              <th className="px-6 py-4 font-medium text-slate-600">Serviço</th>
              <th className="px-6 py-4 font-medium text-slate-600">Data Início</th>
              <th className="px-6 py-4 font-medium text-slate-600">Custo Est.</th>
              <th className="px-6 py-4 font-medium text-slate-600">Status</th>
              <th className="px-6 py-4 font-medium text-slate-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {maintenances.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">{m.vehicle?.modelo || "N/A"} ({m.vehicle?.placa || "N/A"})</td>
                <td className="px-6 py-4 text-slate-600">{m.tipoServico}</td>
                <td className="px-6 py-4 text-slate-600">{m.dataInicio ? new Date(m.dataInicio).toLocaleDateString() : "-"}</td>
                <td className="px-6 py-4 text-slate-600">R$ {m.custoEstimado}</td>
                <td className="px-6 py-4">{getStatusBadge(m.status)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(m)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id!)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{editingMaintenance ? "Editar Manutenção" : "Nova Manutenção"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Veículo</label>
                  <select
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  >
                    <option value="">Selecione um veículo</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>{v.modelo} - {v.placa}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Serviço</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Troca de Pneus"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.tipoServico}
                    onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Início</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Previsão Final</label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.dataFinalizacao}
                    onChange={(e) => setFormData({ ...formData, dataFinalizacao: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custo Estimado</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ex: 500.00"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.custoEstimado}
                    onChange={(e) => setFormData({ ...formData, custoEstimado: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="EM_REALIZACAO">Em Realização</option>
                    <option value="CONCLUIDA">Concluída</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
