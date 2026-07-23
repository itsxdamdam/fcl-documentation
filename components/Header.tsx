"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Gear, Moon, Sun, Play } from "./icons";
import type { Theme, Colors } from "@/utils/theme";
import { LANGUAGES, type Language } from "@/utils/apiExamples";

type LayoutMode = "Double Column" | "Single Column";

interface DropdownProps {
  label: string;
  value: string;
  options: readonly string[];
  onSelect: (value: string) => void;
  colors: Colors;
}

function Dropdown({ label, value, options, onSelect, colors }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: colors.headerLabel,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.accent,
            fontSize: "13px",
            fontWeight: 600,
            padding: "4px 2px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
          <ChevronDown size={13} color={colors.accent} />
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              minWidth: "180px",
              backgroundColor: colors.headerBg === "#191919" ? "#242424" : "#20202a",
              border: `1px solid ${colors.headerBorder}`,
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              padding: "6px",
              zIndex: 1000,
            }}
          >
            {options.map((option) => {
              const active = option === value;

              return (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: active ? "rgba(255,108,55,0.15)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: active ? colors.accent : "#d8d8de",
                    fontSize: "12.5px",
                    fontWeight: active ? 600 : 400,
                    padding: "8px 10px",
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface HeaderProps {
  colors: Colors;
  theme: Theme;
  onToggleTheme: () => void;
  layout: LayoutMode;
  onLayoutChange: (layout: LayoutMode) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function Header({
  colors,
  theme,
  onToggleTheme,
  layout,
  onLayoutChange,
  language,
  onLanguageChange,
}: HeaderProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "52px",
        zIndex: 500,
        backgroundColor: colors.headerBg,
        borderBottom: `1px solid ${colors.headerBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "26px",
          overflowX: "auto",
        }}
      >
        <Dropdown
          label="Environment"
          value="No Environment"
          options={["No Environment", "Development", "Production"]}
          onSelect={() => {}}
          colors={colors}
        />
        <Dropdown
          label="Layout"
          value={layout}
          options={["Double Column", "Single Column"]}
          onSelect={(v) => onLayoutChange(v as LayoutMode)}
          colors={colors}
        />
        <Dropdown
          label="Language"
          value={language}
          options={LANGUAGES}
          onSelect={(v) => onLanguageChange(v as Language)}
          colors={colors}
        />

        <button
          title="Settings"
          style={{
            display: "flex",
            alignItems: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.headerLabel,
            padding: "4px",
          }}
        >
          <Gear size={17} />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
        <button
          onClick={onToggleTheme}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          style={{
            display: "flex",
            alignItems: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.headerText,
            padding: "4px",
          }}
        >
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: colors.accent,
            color: colors.accentText,
            border: "none",
            cursor: "pointer",
            borderRadius: "7px",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <Play size={13} color={colors.accentText} />
          Run in Postman
        </button>
      </div>
    </header>
  );
}
