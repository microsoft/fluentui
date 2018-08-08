export const HighContrastSelector = '@media screen and (-ms-high-contrast: active)';
export const HighContrastSelectorWhite = '@media screen and (-ms-high-contrast: black-on-white)';
export const HighContrastSelectorBlack = '@media screen and (-ms-high-contrast: white-on-black)';

export const ScreenWidthMinSmall = 320;
export const ScreenWidthMinMedium = 480;
export const ScreenWidthMinLarge = 640;
export const ScreenWidthMinXLarge = 1024;
export const ScreenWidthMinXXLarge = 1366;
export const ScreenWidthMinXXXLarge = 1920;
export const ScreenWidthMaxSmall = ScreenWidthMinMedium - 1;
export const ScreenWidthMaxMedium = ScreenWidthMinLarge - 1;
export const ScreenWidthMaxLarge = ScreenWidthMinXLarge - 1;
export const ScreenWidthMaxXLarge = ScreenWidthMinXXLarge - 1;
export const ScreenWidthMaxXXLarge = ScreenWidthMinXXXLarge - 1;

export const ScreenWidthMinUhfMobile = 768;

export function getScreenSelector(min: number, max: number): string {
  return `@media only screen and (min-width: ${min}px) and (max-width: ${max}px)`;
}
