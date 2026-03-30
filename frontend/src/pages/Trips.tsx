import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Plus, Trash, Pencil, X, Save } from "lucide-react";

type Vehicle = {
  id: number;
  placa: string;
  modelo: string;
};

type Trip = {
  id?: number;
  vehicle: Vehicle;
  dataSaida: string;
  dataChegada: string;
  origem: string;
  destino: string;
  kmPercorrida: number;
};

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState({
    vehicleId: "",
    dataSaida: "",
    dataChegada: "",
    origem: "",
    destino: "",
    kmPercorrida: "",
  });

  useEffect(() => {
    fetchTrips();
    fetchVehicles();
  }, []);

  const fetchTrips = () => {
    api.get("/trips").then((res) => setTrips(res.data));
  };

  const fetchVehicles = () => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  };

  const handleOpenModal = (trip?: Trip) => {
    if (trip) {
      setEditingTrip(trip);
      setFormData({
        vehicleId: trip.vehicle.id.toString(),
        dataSaida: trip.dataSaida.slice(0, 16),
        dataChegada: trip.dataChegada.slice(0, 16),
        origem: trip.origem,
        destino: trip.destino,
        kmPercorrida: trip.kmPercorrida.toString(),
      });
    } else {
      setEditingTrip(null);
      setFormData({
        vehicleId: "",
        dataSaida: "",
        dataChegada: "",
        origem: "",
        destino: "",
        kmPercorrida: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta viagem?")) {
      api.delete(`/trips/${id}`).then(() => fetchTrips());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      vehicle: { id: parseInt(formData.vehicleId) },
      dataSaida: formData.dataSaida,
      dataChegada: formData.dataChegada,
      origem: formData.origem,
      destino: formData.destino,
      kmPercorrida: parseFloat(formData.kmPercorrida),
    };

    if (editingTrip) {
      api.put(`/trips/${editingTrip.id}`, payload).then(() => {
        fetchTrips();
        setIsModalOpen(false);
      });
    } else {
      api.post("/trips", payload).then(() => {
        fetchTrips();
        setIsModalOpen(false);
      });
    }
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gestão de Viagens</h1>
          <p className="text-slate-500 text-sm">Controle as operações de entrega da frota</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Nova Viagem
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-600">Veículo</th>
              <th className="px-6 py-4 font-medium text-slate-600">Saída</th>
              <th className="px-6 py-4 font-medium text-slate-600">Chegada</th>
              <th className="px-6 py-4 font-medium text-slate-600">Rota</th>
              <th className="px-6 py-4 font-medium text-slate-600">KM</th>
              <th className="px-6 py-4 font-medium text-slate-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">{trip.vehicle.modelo} ({trip.vehicle.placa})</td>
                <td className="px-6 py-4 text-slate-600">{new Date(trip.dataSaida).toLocaleString()}</td>
                <td className="px-6 py-4 text-slate-600">{new Date(trip.dataChegada).toLocaleString()}</td>
                <td className="px-6 py-4 text-slate-600">{trip.origem} → {trip.destino}</td>
                <td className="px-6 py-4 text-slate-600">{trip.kmPercorrida} km</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(trip)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(trip.id!)}
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
              <h2 className="text-lg font-semibold">{editingTrip ? "Editar Viagem" : "Nova Viagem"}</h2>
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Saída</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.dataSaida}
                    onChange={(e) => setFormData({ ...formData, dataSaida: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Chegada</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.dataChegada}
                    onChange={(e) => setFormData({ ...formData, dataChegada: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Origem</label>
                  <input
                    type="text"
                    required
                    placeholder="Cidade"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.origem}
                    onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Destino</label>
                  <input
                    type="text"
                    required
                    placeholder="Cidade"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.destino}
                    onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">KM Percorrida</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ex: 450.50"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.kmPercorrida}
                    onChange={(e) => setFormData({ ...formData, kmPercorrida: e.target.value })}
                  />
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
