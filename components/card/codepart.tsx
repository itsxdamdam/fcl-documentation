"use client";

import { useEffect, useState } from "react";
import { findByKey } from "@/utils/tree";
import type { Colors } from "@/utils/theme";
import type { Language } from "@/utils/apiExamples";
import ExampleContent from "../ExampleContent";

interface CodePartProps {
  activeKey: string | null;
  colors: Colors;
  language: Language;
  hideBelow?: number;
}

export default function CodePart({
  activeKey,
  colors,
  language,
  hideBelow = 900,
}: CodePartProps) {
  const item = activeKey ? findByKey(activeKey) : null;
  const [visible, setVisible] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth > hideBelow : true,
  );

  useEffect(() => {
    const onResize = () => {
      setVisible(window.innerWidth > hideBelow);
    };

    
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hideBelow]);

  if (!visible) return null;

  return (
    <aside
      style={{
        width: "44%",
        minWidth: "150px",
        maxWidth: "440px",
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        backgroundColor: colors.rightPanelBg,
        boxSizing: "border-box",
        padding: "26px 24px 60px",
      }}
    >
      {item ? (
        <ExampleContent
          item={item}
          language={language}
          colors={colors}
          onDark
        />
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.rightPanelText,
            fontSize: "14px",
          }}
        >
          Select an item from the sidebar.
        </div>
      )}
    </aside>
  );
}
