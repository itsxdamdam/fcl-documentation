"use client";

import { findByKey } from "@/utils/tree";
import type { Colors } from "@/utils/theme";
import type { Language } from "@/utils/apiExamples";
import ExampleContent from "../ExampleContent";

interface CodePartProps {
  activeKey: string | null;
  colors: Colors;
  language: Language;
}

export default function CodePart({ activeKey, colors, language }: CodePartProps) {
  const item = activeKey ? findByKey(activeKey) : null;

  return (
    <aside
      style={{
        width: "44%",
        minWidth: "440px",
        maxWidth: "620px",
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        backgroundColor: colors.rightPanelBg,
        boxSizing: "border-box",
        padding: "26px 24px 60px",
      }}
    >
      {item ? (
        <ExampleContent item={item} language={language} colors={colors} onDark />
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
