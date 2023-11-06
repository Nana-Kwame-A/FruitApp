export const onTheme = (theme, lightOption, darkOption) => {
  return theme === "dark" ? lightOption : darkOption;
};
