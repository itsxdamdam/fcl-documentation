"use client";

import { Fragment, useState, type ReactNode } from "react";
import { Copy, Check } from "./icons";

const CODE_COLORS = {
  bg: "#1e1e28",
  text: "#d4d4d4",
  key: "#9cdcfe",
  string: "#ce9178",
  keyword: "#569cd6",
  number: "#b5cea8",
  literal: "#569cd6",
  comment: "#6a9955",
  punctuation: "#d4d4d4",
};

const JS_KEYWORDS =
  "var|let|const|new|function|return|import|from|for|while|if|else|method|headers|body|redirect|true|false|null|await|async";

function tokenize(code: string, lang: string): ReactNode[] {
  const nodes: ReactNode[] = [];

  const pattern =
    lang === "json"
      ? /("(?:\\.|[^"\\])*")(\s*:)|("(?:\\.|[^"\\])*")|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g
      : new RegExp(
          `(#[^\\n]*|//[^\\n]*)|('(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*"|\`(?:\\\\.|[^\`\\\\])*\`)|\\b(${JS_KEYWORDS})\\b|(-?\\d+(?:\\.\\d+)?)`,
          "g",
        );

  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={`t${i++}`}>{code.slice(last, match.index)}</Fragment>);
    }

    if (lang === "json") {
      if (match[1] !== undefined) {
        // object key
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.key }}>
            {match[1]}
          </span>,
        );
        nodes.push(<Fragment key={`t${i++}`}>{match[2]}</Fragment>);
      } else if (match[3] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.string }}>
            {match[3]}
          </span>,
        );
      } else if (match[4] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.literal }}>
            {match[4]}
          </span>,
        );
      } else if (match[5] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.number }}>
            {match[5]}
          </span>,
        );
      }
    } else {
      if (match[1] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.comment }}>
            {match[1]}
          </span>,
        );
      } else if (match[2] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.string }}>
            {match[2]}
          </span>,
        );
      } else if (match[3] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.keyword }}>
            {match[3]}
          </span>,
        );
      } else if (match[4] !== undefined) {
        nodes.push(
          <span key={`t${i++}`} style={{ color: CODE_COLORS.number }}>
            {match[4]}
          </span>,
        );
      }
    }

    last = pattern.lastIndex;
  }

  if (last < code.length) {
    nodes.push(<Fragment key={`t${i++}`}>{code.slice(last)}</Fragment>);
  }

  return nodes;
}

interface CodeBlockProps {
  code: string;
  lang: string;
  label: string;
  collapsible?: boolean;
}

export default function CodeBlock({ code, lang, label, collapsible = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lineCount = code.split("\n").length;
  const isLong = collapsible && lineCount > 12;
  const collapsed = isLong && !expanded;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };

  return (
    <div
      style={{
        backgroundColor: CODE_COLORS.bg,
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#c8c8d0",
            backgroundColor: "rgba(255,255,255,0.08)",
            padding: "3px 10px",
            borderRadius: "5px",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>

        <button
          onClick={copy}
          title="Copy"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: copied ? "#4ade80" : "#b7b7c2",
            fontSize: "11px",
            padding: "2px 4px",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <div style={{ position: "relative" }}>
        <pre
          style={{
            margin: 0,
            padding: "16px 18px",
            overflowX: "auto",
            maxHeight: collapsed ? "220px" : "none",
            fontSize: "12.5px",
            lineHeight: 1.65,
            color: CODE_COLORS.text,
            fontFamily:
              "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
            tabSize: 2,
          }}
        >
          <code>{tokenize(code, lang)}</code>
        </pre>

        {isLong && (
          <div
            style={{
              position: collapsed ? "absolute" : "static",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              padding: collapsed ? "34px 0 10px" : "0 0 12px",
              background: collapsed
                ? "linear-gradient(to bottom, rgba(30,30,40,0), rgba(30,30,40,0.95))"
                : "transparent",
            }}
          >
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e6e6ee",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {expanded ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
