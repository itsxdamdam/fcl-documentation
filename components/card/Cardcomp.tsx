"use client";

import { flatten, type AnnotatedNode } from "@/utils/tree";
import { methodColor, type Colors } from "@/utils/theme";
import { BASE_URL, buildExamples, type FieldRow, type Language } from "@/utils/apiExamples";
import ExampleContent from "../ExampleContent";

function depthOf(key: string): number {
  return key.split("-").length - 1;
}

function headingSize(node: AnnotatedNode): number {
  if (node.method) return 19;

  switch (depthOf(node._key)) {
    case 0:
      return 26;
    case 1:
      return 21;
    case 2:
      return 18;
    default:
      return 16;
  }
}

function FieldTable({ rows, colors }: { rows: FieldRow[]; colors: Colors }) {
  return (
    <div
      style={{
        border: `1px solid ${colors.tableBorder}`,
        borderRadius: "8px",
        overflow: "hidden",
        marginTop: "10px",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ backgroundColor: colors.tableHeaderBg }}>
            {["Field", "Type", "Description"].map((head, i) => (
              <th
                key={head}
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  fontWeight: 600,
                  color: colors.tableText,
                  borderBottom: `1px solid ${colors.tableBorder}`,
                  width: i === 2 ? "auto" : i === 1 ? "110px" : "36%",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.field}-${index}`}>
              <td
                style={{
                  padding: "10px 14px",
                  color: colors.tableText,
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: "12.5px",
                  borderTop: `1px solid ${colors.tableBorder}`,
                  verticalAlign: "top",
                  wordBreak: "break-word",
                }}
              >
                {row.field}
              </td>
              <td
                style={{
                  padding: "10px 14px",
                  color: colors.tableMuted,
                  fontSize: "12.5px",
                  borderTop: `1px solid ${colors.tableBorder}`,
                  verticalAlign: "top",
                }}
              >
                {row.type}
              </td>
              <td
                style={{
                  padding: "10px 14px",
                  color: colors.tableText,
                  borderTop: `1px solid ${colors.tableBorder}`,
                  verticalAlign: "top",
                  lineHeight: 1.55,
                }}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTitle({ text, colors }: { text: string; colors: Colors }) {
  return (
    <h3
      style={{
        fontSize: "15px",
        fontWeight: 700,
        color: colors.centerText,
        margin: "26px 0 0",
      }}
    >
      {text}
    </h3>
  );
}

interface CardProps {
  colors: Colors;
  layout: "Double Column" | "Single Column";
  language: Language;
}

export default function Card({ colors, layout, language }: CardProps) {
  const nodes = flatten();
  const singleColumn = layout === "Single Column";

  return (
    <div>
      {nodes.map((node) => {
        const isEndpoint = Boolean(node.method);
        const examples = isEndpoint ? buildExamples(node) : null;

        return (
          <section
            key={node._key}
            id={`card-${node._key}`}
            style={{
              scrollMarginTop: "68px",
              paddingTop: "18px",
              paddingBottom: "26px",
              borderBottom: isEndpoint ? `1px solid ${colors.border}` : "none",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
              {node.method && (
                <span
                  style={{
                    fontSize: `${headingSize(node)}px`,
                    fontWeight: 700,
                    color: methodColor(node.method),
                    letterSpacing: "0.02em",
                  }}
                >
                  {node.method.toUpperCase()}
                </span>
              )}
              <h2
                style={{
                  fontSize: `${headingSize(node)}px`,
                  fontWeight: 700,
                  color: colors.centerText,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {node.title?.trim() || node.id}
              </h2>
            </div>

            {isEndpoint && node.url && (
              <div
                style={{
                  marginTop: "14px",
                  backgroundColor: colors.urlBoxBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  padding: "12px 14px",
                  fontSize: "13px",
                  color: colors.urlBoxText,
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                  wordBreak: "break-all",
                  lineHeight: 1.5,
                }}
              >
                {BASE_URL}
                {node.url}
              </div>
            )}

            {node.content?.trim() && (
              <p
                style={{
                  marginTop: "14px",
                  marginBottom: 0,
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: colors.centerMuted,
                  whiteSpace: "pre-line",
                }}
              >
                {node.content.trim()}
              </p>
            )}

            {examples && examples.requestFields.length > 0 && (
              <>
                <SectionTitle text="Request" colors={colors} />
                <FieldTable rows={examples.requestFields} colors={colors} />
              </>
            )}

            {examples && examples.responseFields.length > 0 && (
              <>
                <SectionTitle text="Response" colors={colors} />
                <FieldTable rows={examples.responseFields} colors={colors} />
              </>
            )}

            {singleColumn && isEndpoint && (
              <div style={{ marginTop: "26px" }}>
                <ExampleContent
                  item={node}
                  language={language}
                  colors={colors}
                  onDark={false}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
