"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  annotatedMenu,
  findParentPath,
  type AnnotatedNode,
} from "@/utils/tree";
import { ChevronRight, ChevronDown, Folder } from "./icons";
import { methodColor, type Colors } from "@/utils/theme";

function titleCase(value: string): string {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function labelFor(node: AnnotatedNode): string {
  const title = node.title?.trim();

  return title ? title : titleCase(node.id);
}

interface NodeProps {
  node: AnnotatedNode;
  level: number;
  activeKey: string | null;
  expanded: Set<string>;
  onSelect: (key: string) => void;
  onToggle: (key: string) => void;
  colors: Colors;
}

function SidebarNode({
  node,
  level,
  activeKey,
  expanded,
  onSelect,
  onToggle,
  colors,
}: NodeProps) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expanded.has(node._key);
  const isActive = activeKey === node._key;
  const isPlainLink = !hasChildren && !node.method;

  const handleClick = () => {
    onSelect(node._key);

    if (hasChildren) {
      onToggle(node._key);
    }
  };

  return (
    <div>
      <div
        id={`menu-${node._key}`}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          cursor: "pointer",
          padding: "6px 8px",
          paddingLeft: `${10 + level * 14}px`,
          borderRadius: "6px",
          backgroundColor: isActive ? colors.activeBg : "transparent",
          color: isActive ? colors.activeText : colors.sidebarText,
          transition: "background-color 0.15s ease",
        }}
      >
        {hasChildren ? (
          <span style={{ display: "flex", color: colors.sidebarMuted }}>
            {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        ) : (
          !node.method && <span style={{ width: 12, flexShrink: 0 }} />
        )}

        {hasChildren && <Folder size={15} color="#3aa66f" />}

        {node.method && (
          <span
            style={{
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: "0.03em",
              color: methodColor(node.method),
              minWidth: "30px",
              flexShrink: 0,
            }}
          >
            {node.method.toUpperCase()}
          </span>
        )}

        <span
          style={{
            fontSize: level === 0 ? "13px" : "12.5px",
            fontWeight: isActive ? 700 : hasChildren ? 600 : 400,
            textDecoration: isPlainLink ? "underline" : "none",
            textUnderlineOffset: "2px",
            lineHeight: 1.35,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={labelFor(node)}
        >
          {labelFor(node)}
        </span>
      </div>

      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child) => (
            <SidebarNode
              key={child._key}
              node={child}
              level={level + 1}
              activeKey={activeKey}
              expanded={expanded}
              onSelect={onSelect}
              onToggle={onToggle}
              colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  activeKey: string | null;
  onSelect: (key: string) => void;
  colors: Colors;
}

export default function Sidebar({ activeKey, onSelect, colors }: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Set<string>>(
    // Digital Services > User Management > V1 open by default.
    () => new Set(["1", "1-0", "1-0-0"]),
  );

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // Auto-expand the ancestors of the active node so it is always visible.
  useEffect(() => {
    if (!activeKey) return;

    const path = findParentPath(activeKey);

    if (path?.length) {
      setExpanded((prev) => new Set([...prev, ...path]));
    }
  }, [activeKey]);

  // Keep the active row scrolled into view within the sidebar.
  useEffect(() => {
    if (!activeKey) return;

    const el = document.getElementById(`menu-${activeKey}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeKey]);

  return (
    <nav
      ref={containerRef}
      style={{
        width: "290px",
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        backgroundColor: colors.sidebarBg,
        borderRight: `1px solid ${colors.border}`,
        // paddingLeft: "14px",
        // paddingRight: "14px",
        paddingBottom: "25px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          border: `1px solid ${colors.border}`,
          padding: "12px 5px",
          marginBottom: "16px",
          backgroundColor: "#da2529",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Image
          src="/assets/logo.png"
          alt="Fastcredit — Finance Company Limited"
          width={189}
          height={61}
          style={{ height: "34px", width: "auto" }}
        />
      </div>

      {annotatedMenu.map((node) => (
        <SidebarNode
          key={node._key}
          node={node}
          level={0}
          activeKey={activeKey}
          expanded={expanded}
          onSelect={onSelect}
          onToggle={toggle}
          colors={colors}
        />
      ))}
    </nav>
  );
}
