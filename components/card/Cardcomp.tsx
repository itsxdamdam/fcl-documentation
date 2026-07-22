"use client";

import { MenuChild } from "@/Lib/menuData";

interface Props {
  data: MenuChild[];
}

export default function Card({ data }: Props) {
  return (
    <div>
      {data.map((section) => (
        <div key={section.id} style={{ marginBottom: "60px" }}>
          {/* Section heading — id needed so scroll-spy can highlight the section itself */}
          <div id={section.id} style={{ scrollMarginTop: "80px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
              {section.title}
            </h2>
            {section.content && (
              <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                {section.content}
              </p>
              
            )}
          </div>

          {/* Each endpoint/child needs its OWN id — this is what CodePart looks up */}
          {section.children?.map((child) => (
            <div
              key={child.id}
              id={child.id}
              style={{
                marginBottom: "40px",
                paddingTop: "20px",
                scrollMarginTop: "800px", // keeps scrollIntoView from tucking content under a sticky header
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>
                {child.method && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#fff",
                      backgroundColor: "#d97706",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginRight: "8px",
                    }}
                  >
                    {child.method}
                  </span>
                )}
                {child.title}
              </h3>

              {child.url && (
                <code style={{ fontSize: "13px", color: "#666" }}>{child.url}</code>
              )}

              {child.content && (
                <p style={{ fontSize: "14px", color: "#444", marginTop: "8px" }}>
                  {child.content}
                </p>
                
              )}

         
 
      </div>
    // </div>
    //           {codepart.activeid}
    //         </div>
            
          ))}
          
        </div>
      ))}
    </div>
    
  );
  
}
