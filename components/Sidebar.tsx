"use client";

import { useEffect, useRef } from "react";
import MenuItem from "./MenuItem";
import { menuData } from "../Lib/menuData";

export default function Sidebar({
  handleContent,
  activeId,
}: {
  handleContent: (id: string) => void;
  activeId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    if (!activeId || !containerRef.current) return;
    const el = document.getElementById(`menu-${activeId}`);
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      style={{
        paddingTop: "50px",
        width: "250px",
        height: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "12px",
          marginBottom: "27px",
          cursor: "pointer",
        }}
      >
        Fastcredit APIS
      </h2>
      <p style={{ fontSize: "12px", marginBottom: "20px", cursor: "pointer" }}>
        introduction
      </p>

      {menuData.map((section) => (
        <div key={section.id} style={{ marginBottom: "16px" }}>
          <p
            id={`menu-${section.id}`}
            style={{
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "8px",
              color: activeId === section.id ? "#d97706" : "#333",
              cursor: "pointer",
            }}
            onClick={() => handleContent(section.id)}
          >
            {section.title}
          </p>
          {section.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              onItemClick={handleContent}
              activeId={activeId}
            />
          ))}
        </div>
      ))}
    </div>
  );
}