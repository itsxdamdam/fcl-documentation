"use client";

import { useEffect, useRef, useState } from "react";
import  MenuItem  from "./MenuItem";
import { menuData } from "@/Lib/menuData";

export default function Sidebar({
  handleContent,
  activeId,
}: {
  handleContent: (id: string) => void;
  activeId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter((id) => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };
  useEffect(() => {
    if (!activeId) return;

    // Find the section that owns the active id — either the section itself
    // or one of its children
    const ownerSection = menuData.find(
      (section) =>
        section.id === activeId ||
        section.children?.some((child) => child.id === activeId),
    );
    if (ownerSection && !expandedSections.includes(ownerSection.id)) {
      setExpandedSections((prev) => [...prev, ownerSection.id]);
    }
  }, [activeId]);

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
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "25px",
          color: "555",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        Fastcredit API
      </h2>
    

      {menuData?.map((section) => {
        const isExpanded = expandedSections.includes(section.id);

        return (
          <div key={section.id} style={{ marginBottom: "16px" }}>
            
            <p
              id={`menu-${section.id}`}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "8px",
             
                cursor: "pointer",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
              onClick={() => {
                handleContent(section.id);
                toggleSection(section.id);
              }}
            >
              <span>{section.id}</span>
              {section.children && (
                <span style={{ fontSize: "10px", color: "#999" }}>
                  {isExpanded ? "🔽" : "▶️"}
                </span>
              )}
            </p>

            {isExpanded && section.children && (
              <div
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                
                {section.children?.map((child) => (
                  <span
                    key={
                      menuData.find((s) => s.id === child.id)?.id || child.id
                    }
                    style={{
                      fontSize: "12px",
                      fontWeight: activeId === child.id ? 600 : 400,
                  
                      cursor: "pointer",
                      padding: "2px 0",
                    }}
                    onClick={() => {
                      handleContent(child.id);

                      document.getElementById(child.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    
                  >
                    {child.id}
                  </span>
                  
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

