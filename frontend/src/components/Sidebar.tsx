import { LayoutDashboard, Truck, Calendar, MapPin } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "trips", label: "Viagens", icon: MapPin },
    { id: "vehicles", label: "Veículos", icon: Truck },
    { id: "maintenance", label: "Manutenções", icon: Calendar },
  ];

  return (
    <div className="h-full">
      <div className="w-64 h-full bg-[#0072B1] p-6 flex flex-col text-white shadow-md rounded-r-2xl rounded-br-2xl">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/logap_logo.jpeg"
            alt="Logap"
            className="w-10 h-10 rounded object-cover"
          />
          <span className="text-lg font-semibold">LogiTrack</span>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 text-white font-medium shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}