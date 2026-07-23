import type { CSSProperties } from "react";

interface IconProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

const base = (size: number): CSSProperties => ({
  width: size,
  height: size,
  display: "inline-block",
  flexShrink: 0,
});

export function ChevronRight({ size = 12, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ size = 12, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Gear({ size = 16, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Moon({ size = 16, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sun({ size = 16, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Play({ size = 14, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill={color} style={{ ...base(size), ...style }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function Folder({ size = 16, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <path
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Copy({ size = 15, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <rect x="9" y="9" width="11" height="11" rx="2" stroke={color} strokeWidth="1.7" />
      <path d="M5 15V5a2 2 0 012-2h10" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Check({ size = 15, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ListLines({ size = 15, color = "currentColor", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }}>
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
