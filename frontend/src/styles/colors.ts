export const dashboardColors = {
  // Backgrounds
  pageBackground: "#F2F7FF",
  pageGradientStart: "#F8FBFF",
  pageGradientEnd: "#EEF5FF",
  cardBackground: "#FFFFFF",
  studyCardBackground: "#cee3fab7",
  textareaBackground: "#fcfaf6",

  // Borders
  cardBorder: "#CBDCF4",
  studyCardBorder: "#a8bddb",
  textareaBorder: "#EBCFA5",

  // Text
  title: "#132E4F",
  sectionTitle: "#1D4D80",
  subtitle: "#4D6887",
  studyTitle: "#234366",
  studySubtitle: "#58779A",
  textareaText: "#2E2A24",
  textareaPlaceholder: "#8B7B63",

  // Button 
  uploadButtonBackground: "#F0BA4A",
  uploadButtonText: "#2B2012",
  uploadButtonHover: "#E2A93A",
  cancelButtonBackground: "#f5f5f5",
  cancelButtonText: "#444",
  cancelButtonBorder: "#CBDCF4",
  cancelButtonHover: "#e0e7ef",
  cancelButtonActive: "#d3dae3",
  deleteButtonBackground: "#fff0f0",
  deleteButtonText: "#e53e3e",
  deleteButtonBorder: "#e53e3e",
  deleteButtonHover: "#ffe0e0",
  deleteButtonActive: "#f8bcbc",
  
} as const;

export const workspaceColors = {
  // Tabs 
  tabBackground: "#E6EEF8",
  tabInactive: "#DCE7F5",
  tabActive: dashboardColors.cardBackground,

  // Button
  generateButtonBackground: "#4D6887",
} as const;