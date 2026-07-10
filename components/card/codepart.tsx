import { MenuChild, menuData} from "@/Lib/menuData";
import React, { useEffect, useState } from "react";


interface Props {
  activeId: string | null;
}

export default function CodePart({ activeId }: Props) {
  const [menuItem, setMenuItem] = useState<MenuChild | null>(null);

  const filterMenu = () => {
    const knox = menuData.filter((item) => item.id === activeId);
    setMenuItem(knox[0]);
  };
  useEffect(() => {
    if (activeId) {
      filterMenu();
    }
  }, [activeId]);

  return (
    <div 
      style={{
        height: "1000vh",
        backgroundColor: "#bb1e16",
        width: "500px",
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      
      <div style={{ padding: "20px", paddingTop: "200px" }}>
        <div
          style={{
            backgroundColor: "#0d0d0d",
            padding: "50px",
            borderRadius: "2px",
            overflowX: "auto",
            width: "450px",
            color: "#f3f3f3",
          }}
        >
          {menuItem?.codesnippet && (
            <pre>
              <code>{menuItem.codesnippet&& menuItem.codesnippet}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
