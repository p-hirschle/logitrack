export default function Header() {
  return (
    <div className="w-full bg-white text-slate-800 p-4 flex justify-between items-center shadow-sm">
      
      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">Admin</span>

        <img
          src="/logap_logo.jpeg"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}