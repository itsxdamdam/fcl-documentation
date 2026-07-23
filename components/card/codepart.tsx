"use client";

import { MenuChild, menuData } from "@/Lib/menuData";
import { useEffect, useState } from "react";

interface Props {
  activeId: string | null;
}

const findMenuItem = (items: MenuChild[], id: string): MenuChild | null => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    if (item.children) {
      const found = findMenuItem(item.children, id);

      if (found) {
        return found;
      }
    }
  }

  return null;
};

export default function CodePart({ activeId }: Props) {
  const [menuItem, setMenuItem] = useState<MenuChild | null>(null);

  useEffect(() => {
    if (!activeId) {
      setMenuItem(null);
      return;
    }

    const foundItem = findMenuItem(menuData, activeId);

    setMenuItem(foundItem);
  }, [activeId]);

  if (!menuItem) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "40px",
            color: "#555",
          }}
        >
          Select an item from the sidebar.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fff",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "40px",
          backgroundColor: "#616161",
          position: "sticky",
          top: 0,
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        >
          Code Example
        </h3>

        <div
          style={{
            backgroundColor: "#0d0d0d",
            borderRadius: "8px",
            padding: "25px",
            overflowX: "auto",
            minHeight: "200px",
            color: "#f3f3f3",
            boxSizing: "border-box",
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            <code>
              {menuItem.codesnippet || "// No code example available"}
            </code>
          </pre>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "40px",
          backgroundColor: "#fff",
          color: "#222",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          {menuItem.title}
        </h2>

        {menuItem.method && (
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              backgroundColor: "#d97706",
              padding: "4px 8px",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          >
            {menuItem.method}
          </span>
        )}

        {/* URL */}
        {menuItem.url && (
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <code
              style={{
                fontSize: "13px",
                color: "#555",
                backgroundColor: "#f5f5f5",
                padding: "8px 10px",
                borderRadius: "4px",
              }}
            >
              {menuItem.url}
            </code>
          </div>
        )}

        {menuItem.content && (
          <div
            style={{
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#444",
            }}
          >
            <p>{menuItem.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
