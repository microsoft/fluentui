import { BrandVariants } from '@fluentui/react-components';

export type ThemeList = Record<string, { brand?: BrandVariants }>;

export const themeList: ThemeList = {
  CustomLight: {},
  CustomDark: {},
};

const lightThemes = Object.keys(themeList).map(currTheme => {
  return currTheme + 'Light';
});
const darkThemes = Object.keys(themeList).map(currTheme => {
  return currTheme + 'Dark';
});

const allThemes = [];

for (let i = 0; i < lightThemes.length * 2; i += 2) {
  allThemes[i] = lightThemes[i / 2];
  allThemes[i + 1] = darkThemes[i / 2];
}
