export default function Sidebar() {
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
        <nav className="flex flex-col gap-3 text-white/90">
          <a className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
            Dashboard
          </a>

          <a className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
            Veículos
          </a>

          <a className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
            Manutenções
          </a>
        </nav>
      </div>
    </div>
  );
}