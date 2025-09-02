export const serverURL = "http://localhost:5000";
export const LS_THEME = "fm_theme_v1";

export const FILTERS = {
  all: () => true,
  active: (t) => !t.complete,
  completed: (t) => t.complete,
};
