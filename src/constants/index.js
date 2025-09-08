export const serverURL = "https://simpleapi-two.vercel.app/";
export const LS_THEME = "fm_theme_v1";

export const FILTERS = {
  all: () => true,
  active: (t) => !t.complete,
  completed: (t) => t.complete,
};
