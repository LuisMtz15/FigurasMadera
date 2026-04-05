// src/components/admin/AdminPackageMiniGrid.jsx
import { THEME } from "../../config/theme.js";

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
            className="w-9 h-9 rounded object-cover"
            style={{ backgroundColor: THEME.surfaceStrong }}
          />
        ) : (
          <div
            key={p.id}
            className="w-9 h-9 rounded flex items-center justify-center text-[12px] theme-empty-tile"
          >
            🪵
          </div>
        )
      )}
      {remaining > 0 && (
        <div className="w-9 h-9 rounded flex items-center justify-center text-[10px] theme-counter-tile">
          +{remaining}
        </div>
      )}
    </div>
  );
}
