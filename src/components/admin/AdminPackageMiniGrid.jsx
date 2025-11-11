// src/components/admin/AdminPackageMiniGrid.jsx
export default function AdminPackageMiniGrid({ products }) {
  const firstFour = products.slice(0, 4);
  const remaining = products.length - firstFour.length;

  return (
    <div className="grid grid-cols-2 gap-1 w-20 shrink-0">
      {firstFour.map((p) =>
        p.image_url ? (
          <img
            key={p.id}
            src={p.image_url}
            alt={p.name}
            className="w-9 h-9 rounded object-cover bg-slate-50"
          />
        ) : (
          <div
            key={p.id}
            className="w-9 h-9 rounded bg-amber-50 flex items-center justify-center text-[12px]"
          >
            🪵
          </div>
        )
      )}
      {remaining > 0 && (
        <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-[10px] text-slate-500">
          +{remaining}
        </div>
      )}
    </div>
  );
}