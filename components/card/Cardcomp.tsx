import React from "react";
import { MenuSection } from "../../Lib/menuData";

export default function Card({ data }: { data: MenuSection[] }) {
  return (
    <div>
      {data.map((section) => (
        <div key={section.id} id={section.id} style={{ marginBottom: "60px", scrollMarginTop: "40px" }}>
          <h1
            style={{
              textAlign: "left",
              paddingBottom: "10px",
              fontWeight: "bold",
              fontSize: "26px",
              marginBottom: "10px",
            }}
          >
            {section.title}
          </h1>

          {section.children?.map((item) => (
            <div
              key={item.id}
              id={item.id}
              style={{ marginBottom: "30px", scrollMarginTop: "40px" }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  color: "#333",
                  fontWeight: 600,
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {item.method && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: item.method === "POST" ? "#d97706" : "#2e9e5b",
                    }}
                  >
                    {item.method}
                  </span>
                )}
                {item.title}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </p>

              {item.children?.map((child) => (
                <div
                  key={child.id}
                  id={child.id}
                  style={{ marginLeft: "20px", marginBottom: "16px", scrollMarginTop: "40px" }}
                >
                  <h3 style={{ fontSize: "15px", color: "#555", fontWeight: 600 }}>
                    {child.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.6 }}>
                    {child.content}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* spacer so the last section can scroll all the way up and still trigger as active */}
      <div style={{ height: "60vh" }} />
    </div>
  );
}