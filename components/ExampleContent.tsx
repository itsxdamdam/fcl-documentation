"use client";

import { useMemo, useState } from "react";
import CodeBlock from "./CodeBlock";
import { ChevronDown } from "./icons";
import type { Colors } from "@/utils/theme";
import {
  buildExamples,
  buildRequestCode,
  RESPONSE_HEADERS,
  type Language,
} from "@/utils/apiExamples";
import type { AnnotatedNode } from "@/utils/tree";

interface ExampleContentProps {
  item: AnnotatedNode;
  language: Language;
  colors: Colors;
  onDark: boolean;
}

export default function ExampleContent({
  item,
  language,
  colors,
  onDark,
}: ExampleContentProps) {
  const [tab, setTab] = useState<"body" | "headers">("body");

  const { requestBody, responseBody } = useMemo(() => buildExamples(item), [item]);
  const request = useMemo(
    () => buildRequestCode(item, requestBody, language),
    [item, requestBody, language],
  );

  const headingColor = onDark ? colors.rightPanelText : colors.centerText;
  const subtleColor = onDark ? "rgba(255,255,255,0.85)" : colors.centerMuted;

  if (!item.method) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
          color: subtleColor,
          fontSize: "14px",
        }}
      >
        Select an endpoint from the list to see an example request and response.
      </div>
    );
  }

  const pill = (text: string) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        fontWeight: 500,
        color: onDark ? "#ffffff" : colors.centerText,
        backgroundColor: onDark ? "rgba(255,255,255,0.15)" : colors.urlBoxBg,
        borderRadius: "6px",
        padding: "5px 10px",
        cursor: "pointer",
      }}
    >
      {text}
      <ChevronDown size={12} color={onDark ? "#ffffff" : colors.centerText} />
    </span>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: headingColor }}>
          Example Request
        </h3>
        {pill("Sample Response")}
      </div>

      <CodeBlock code={request.code} lang={request.lang} label={request.lang} collapsible />

      <h3
        style={{
          margin: "6px 0 0",
          fontSize: "16px",
          fontWeight: 700,
          color: headingColor,
        }}
      >
        Example Response
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "18px" }}>
          {(["body", "headers"] as const).map((key) => {
            const active = tab === key;
            const text = key === "body" ? "Body" : `Headers (${RESPONSE_HEADERS.length})`;

            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 0 6px",
                  fontSize: "13px",
                  fontWeight: active ? 700 : 500,
                  color: active ? headingColor : subtleColor,
                  borderBottom: active
                    ? `2px solid ${onDark ? "#ffffff" : colors.accent}`
                    : "2px solid transparent",
                }}
              >
                {text}
              </button>
            );
          })}
        </div>

        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: onDark ? "#ffffff" : "#10a54a",
            backgroundColor: onDark ? "rgba(255,255,255,0.16)" : "rgba(16,165,74,0.12)",
            borderRadius: "5px",
            padding: "4px 9px",
          }}
        >
          200 OK
        </span>
      </div>

      {tab === "body" ? (
        <CodeBlock code={responseBody} lang="json" label="json" collapsible />
      ) : (
        <div
          style={{
            backgroundColor: "#1e1e28",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            fontSize: "12.5px",
            fontFamily:
              "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {RESPONSE_HEADERS.map(([name, value], index) => (
            <div
              key={name}
              style={{
                display: "flex",
                gap: "12px",
                padding: "8px 14px",
                borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#9cdcfe", minWidth: "190px", flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ color: "#ce9178", wordBreak: "break-all" }}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
