export type Theme = "light" | "dark";

export interface Colors {
  headerBg: string;
  headerBorder: string;
  headerText: string;
  headerLabel: string;
  accent: string;
  accentText: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarMuted: string;
  border: string;
  centerBg: string;
  centerText: string;
  centerMuted: string;
  urlBoxBg: string;
  urlBoxText: string;
  tableHeaderBg: string;
  tableBorder: string;
  tableText: string;
  tableMuted: string;
  rightPanelBg: string;
  rightPanelText: string;
  codeBg: string;
  codeHeaderBg: string;
  activeBg: string;
  activeText: string;
  scrollThumb: string;
}

export function getColors(theme: Theme): Colors {
  if (theme === "dark") {
    return {
      headerBg: "#131318",
      headerBorder: "#2a2a34",
      headerText: "#ededed",
      headerLabel: "#8a8a96",
      accent: "#ff6c37",
      accentText: "#ffffff",
      sidebarBg: "#17171d",
      sidebarText: "#cfcfd8",
      sidebarMuted: "#7f7f8c",
      border: "#2a2a34",
      centerBg: "#111116",
      centerText: "#e9e9ef",
      centerMuted: "#9a9aa6",
      urlBoxBg: "#1d1d25",
      urlBoxText: "#c6c6d2",
      tableHeaderBg: "#1c1c24",
      tableBorder: "#2a2a34",
      tableText: "#cfcfd8",
      tableMuted: "#9a9aa6",
      rightPanelBg: "#0d3f31",
      rightPanelText: "#eafff7",
      codeBg: "#0c0c11",
      codeHeaderBg: "#1a1a22",
      activeBg: "#26262f",
      activeText: "#ffffff",
      scrollThumb: "#3a3a46",
    };
  }
  return {
    headerBg: "#191919",
    headerBorder: "#2c2c2c",
    headerText: "#ededed",
    headerLabel: "#c4c4c4",
    accent: "#ff6c37",
    accentText: "#ffffff",
    sidebarBg: "#fbfbfb",
    sidebarText: "#333333",
    sidebarMuted: "#8c8c8c",
    border: "#e7e7e7",
    centerBg: "#ffffff",
    centerText: "#1a1a1a",
    centerMuted: "#5b5b5b",
    urlBoxBg: "#f4f4f4",
    urlBoxText: "#3a3a3a",
    tableHeaderBg: "#f7f7f7",
    tableBorder: "#e8e8e8",
    tableText: "#333333",
    tableMuted: "#8a8a8a",
    rightPanelBg: "#008a45",
    rightPanelText: "#ffffff",
    codeBg: "#1e1e28",
    codeHeaderBg: "#2a2a38",
    activeBg: "#eeeeee",
    activeText: "#111111",
    scrollThumb: "#d0d0d0",
  };
}

export function methodColor(method?: string): string {
  switch ((method || "").toUpperCase()) {
    case "GET":
      return "#10a54a";
    case "POST":
      return "#e0801f";
    case "PUT":
      return "#3d7fd6";
    case "PATCH":
      return "#8a5cd6";
    case "DELETE":
      return "#e0392b";
    default:
      return "#8a8a8a";
  }
}
