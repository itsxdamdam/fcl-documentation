import { MenuChild, menuData} from "@/Lib/menuData";
import React, { useEffect, useState } from "react";
import MenuItem from "../MenuItem";



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
        backgroundColor: "#616161",
        width: "500px",
        paddingTop:"200px",
       
        display: "flex",
        justifyContent: "center",
      }}
    >
      

             <div
          style={{
            
             paddingTop: "200px",
            backgroundColor: "#0d0d0d",
            padding: "100px",
            borderRadius: "2px",
            overflowX: "auto",
            width: "450px",
            height: "10px",
            color: "#f3f3f3",
          }}
        >
        vvyvv
          
        </div>
        
      
      
    </div>
  );
}

