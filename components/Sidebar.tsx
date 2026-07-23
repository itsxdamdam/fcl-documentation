"use client";

import { useEffect, useRef, useState } from "react";
import { menuData } from "@/Lib/menuData";

type MenuNode = {
  id: string;
  children?: MenuNode[];
};

interface MenuItemProps {
  item: MenuNode;
  level: number;
  activeId: string | null;
  expandedSections: string[];
  handleContent: (id: string) => void;
  toggleSection: (id: string) => void;
}

function MenuItem({
  item,
  level,
  activeId,
  expandedSections,
  handleContent,
  toggleSection,
}: MenuItemProps) {
  const hasChildren = !!item.children?.length;
  const isExpanded = expandedSections.includes(item.id);
  const isActive = activeId === item.id;

  const handleClick = () => {
    handleContent(item.id);

    if (hasChildren) {
      toggleSection(item.id);
    }

    const card = document.getElementById(`card-${item.id}`);

    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      <div
        id={`menu-${item.id}`}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          cursor: "pointer",

          padding: "6px 0",
          paddingLeft: `${level * 15}px`,

          fontSize: level === 0 ? "13px" : "12px",

          fontWeight: isActive ? 700 : level === 0 ? 600 : 400,

          color: isActive ? "#000" : "#333",

          backgroundColor: isActive ? "#e5e5e5" : "transparent",

          borderRadius: "4px",

          transition: "background-color 0.2s ease",
        }}
      >
        
        <span>{item.id}</span>

        
        {hasChildren && (
          <span
            style={{
              fontSize: "9px",
              color: "#999",
              marginRight: "5px",
            }}
          >
            {isExpanded ? "🔽" : "▶️"}
          </span>
        )}
      </div>

      
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              activeId={activeId}
              expandedSections={expandedSections}
              handleContent={handleContent}
              toggleSection={toggleSection}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  handleContent,
  activeId,
}: {
  handleContent: (id: string) => void;
  activeId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  
  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  
  const findParentPath = (
    items: MenuNode[],
    targetId: string,
    parents: string[] = [],
  ): string[] | null => {
    for (const item of items) {
      if (item.id === targetId) {
        return parents;
      }

      if (item.children) {
        const result = findParentPath(item.children, targetId, [
          ...parents,
          item.id,
        ]);

        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  useEffect(() => {
    if (!activeId) return;

    const parentPath = findParentPath(menuData, activeId);

    if (parentPath) {
      setExpandedSections((prev) => {
        const newSections = new Set([...prev, ...parentPath]);

        return Array.from(newSections);
      });
    }
  }, [activeId]);

  
  useEffect(() => {
    if (!activeId || !containerRef.current) return;

    const el = document.getElementById(`menu-${activeId}`);

    if (el) {
      el.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
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
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "25px",
          color: "#555",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        Fastcredit API
      </h2>

      {menuData.map((section) => (
        <MenuItem
          key={section.id}
          item={section}
          level={0}
          activeId={activeId}
          expandedSections={expandedSections}
          handleContent={handleContent}
          toggleSection={toggleSection}
        />
      ))}
    </div>
  );
}
