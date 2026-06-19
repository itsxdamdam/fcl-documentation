"use client";

import { MenuChild } from "../../Lib/menuData";

export default function MenuItem({
  item,
  onItemClick,
  activeId,
}: {
  item: MenuChild;
  onItemClick: (id: string) => void;
  activeId: string | null;
}) {
  const isActive = activeId === item.id;

  return (
    <div>
      <p
        id={`menu-${item.id}`}
        onClick={() => onItemClick(item.id)}
        style={{
          fontSize: "13px",
          marginBottom: "8px",
          marginLeft: "12px",
          cursor: "pointer",
          color: isActive ? "#d97706" : "#555",
          fontWeight: isActive ? 600 : 400,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "color 0.15s ease",
        }}
      >
        {item.method && (
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: item.method === "POST" ? "#d97706" : "#2e9e5b",
              minWidth: "28px",
            }}
          >
            {item.method}
          </span>
        )}
        {item.title}
      </p>

      {item.children?.map((child) => (
        <div key={child.id} style={{ marginLeft: "20px" }}>
          <MenuItem item={child} onItemClick={onItemClick} activeId={activeId} />
        </div>
      ))}
    </div>
  );
}