type Props = {
  title: string;
  value: string;
};

export default function Card({ title, value }: Props) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 tracking-tight text-slate-800">
        {value}
      </h2>
    </div>
  );
}