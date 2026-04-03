/** Apple-inspired: cool grays + system blue */
export const dashboardColors = {
  pageBackground: "#f5f5f7",
  pageGradientStart: "#fbfbfd",
  pageGradientEnd: "#e8eef5",
  cardBackground: "#ffffff",
  studyCardBackground: "#f5f7fa",
  textareaBackground: "#fafbfc",

  cardBorder: "#d2d2d7",
  studyCardBorder: "#c5c9d0",
  textareaBorder: "#d2d2d7",

  title: "#1d1d1f",
  sectionTitle: "#424245",
  subtitle: "#6e6e73",
  studyTitle: "#1d1d1f",
  studySubtitle: "#6e6e73",
  textareaText: "#1d1d1f",
  textareaPlaceholder: "#86868b",

  uploadButtonBackground: "#007aff",
  uploadButtonText: "#ffffff",
  uploadButtonHover: "#0066db",
  cancelButtonBackground: "#f5f5f7",
  cancelButtonText: "#424245",
  cancelButtonBorder: "#d2d2d7",
  cancelButtonHover: "#ebebed",
  cancelButtonActive: "#e5e5ea",
  deleteButtonBackground: "#fef2f2",
  deleteButtonText: "#d70015",
  deleteButtonBorder: "#ffd0d3",
  deleteButtonHover: "#ffe5e7",
  deleteButtonActive: "#ffd4d8",

  shadowSm: "0 1px 3px rgba(0, 55, 90, 0.06)",
  shadowMd: "0 4px 20px rgba(0, 55, 90, 0.08)",
  shadowLg: "0 12px 48px rgba(0, 55, 90, 0.1)",
} as const;

export const workspaceColors = {
  tabBackground: "#e8ecf2",
  tabInactive: "#f2f4f7",
  tabActive: dashboardColors.cardBackground,

  generateButtonBackground: "#007aff",

  contentGradientStart: "#f8fafc",
  contentGradientEnd: "#e3f0ff",
} as const;
