import { menuData } from "@/Lib/menuData";
import React, { useEffect, useState } from "react";

interface Props {
  activeId: string | null;
}

export default function CodePart({ activeId }: Props) {
  const [menuItem, setMenuItem] = useState(null);

  const filterMenu = () => {
    const knox = menuData.filter((item) => item.id === activeId);
    setMenuItem(knox[0]);
    console.log("knox", knox);
  };
  console.log('activeId', activeId)
  useEffect(() => {
    filterMenu();
  }, [activeId]);
  console.log("menuItem", menuItem);
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
          <div>
            {menuItem?.children.map((knx) => (
              <h1 key={knx.title}> {knx.codesnippet} </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
