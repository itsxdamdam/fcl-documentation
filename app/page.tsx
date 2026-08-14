"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/card/Cardcomp";
import CodePart from "../components/card/codepart";
import { flatten } from "../utils/tree";
import { getColors, type Theme } from "../utils/theme";
import type { Language } from "../utils/apiExamples";
import "./globals.css";
type LayoutMode = "Double Column" | "Single Column";

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | null>("0");
  const [theme, setTheme] = useState<Theme>("light");
  const [layout, setLayout] = useState<LayoutMode>("Double Column");
  const [language, setLanguage] = useState<Language>("JavaScript - Fetch");

  const colors = useMemo(() => getColors(theme), [theme]);
  const centerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allKeys = useMemo(() => flatten().map((node) => node._key), []);

  const handleSelect = (key: string) => {
    const el = document.getElementById(`card-${key}`);

    if (!el) return;

    isClickScrolling.current = true;
    setActiveKey(key);
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${key}`);
    }

    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

 
  useEffect(() => {
    const key = window.location.hash.replace(/^#/, "");
    if (!key) return;

    const el = document.getElementById(`card-${key}`);
    if (!el) return;

    isClickScrolling.current = true;
    setActiveKey(key);
    el.scrollIntoView({ block: "start" });

    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const root = centerRef.current;
    if (!root) return;

    const elements = allKeys
      .map((key) => document.getElementById(`card-${key}`))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        entries.forEach((entry) => {
          const key = entry.target.id.replace("card-", "");

          if (entry.isIntersecting) {
            visible.set(key, entry.intersectionRatio);
          } else {
            visible.delete(key);
          }
        });

        const topMost = allKeys.find((key) => visible.has(key));

        if (topMost) {
          setActiveKey((prev) => (prev === topMost ? prev : topMost));
        }
      },
      {
        root,
        rootMargin: "-10% 0px -70% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [allKeys]);

  const doubleColumn = layout === "Double Column";
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="formedia"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.centerBg,
        color: colors.centerText,
      }}
    >
      {/* <Header
        colors={colors}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        layout={layout}
        onLayoutChange={setLayout}
        language={language}
        onLanguageChange={setLanguage}
      /> */}

      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          // marginTop: "52px",
        }}
      >
        <Sidebar
          activeKey={activeKey}
          onSelect={(k) => {
            handleSelect(k);
            if (isMobile) setSidebarOpen(false);
          }}
          colors={colors}
          mobile={isMobile}
          open={isMobile ? sidebarOpen : true}
          onClose={() => setSidebarOpen(false)}
        />

        {isMobile && (
          <>
            {sidebarOpen && (
              <div
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  zIndex: 1100,
                }}
              />
            )}

            <button
              onClick={() => setSidebarOpen((s) => !s)}
              title="Menu"
              style={{
                position: "fixed",
                top: 12,
                left: 12,
                zIndex: 1200,
                border: "none",
                background: "grey",
                color: colors.accentText,
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </>
        )}

        <main
          ref={centerRef}
          style={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            padding: "12px 48px 120px",
            boxSizing: "border-box",
            backgroundColor: colors.centerBg,
          }}
        >
          <div style={{ maxWidth: "760px" }}>
            <Card colors={colors} layout={layout} language={language} />
          </div>
        </main>

        {doubleColumn && (
          <CodePart activeKey={activeKey} colors={colors} language={language} />
        )}
      </div>
    </div>
  );
}
