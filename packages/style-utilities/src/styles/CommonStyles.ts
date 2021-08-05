import { IRawStyle } from '../MergeStyles';

export const HighContrastSelector = '@media screen and (-ms-high-contrast: active), (forced-colors: active)';
export const HighContrastSelectorWhite =
  '@media screen and (-ms-high-contrast: black-on-white), (forced-colors: black-on-white)';
export const HighContrastSelectorBlack =
  '@media screen and (-ms-high-contrast: white-on-black), (forced-colors: white-on-black)';
export const EdgeChromiumHighContrastSelector = '@media screen and (forced-colors: active)';

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

export function getScreenSelector(min: number | undefined, max: number | undefined): string {
  const minSelector = typeof min === 'number' ? ` and (min-width: ${min}px)` : '';
  const maxSelector = typeof max === 'number' ? ` and (max-width: ${max}px)` : '';
  return `@media only screen${minSelector}${maxSelector}`;
}

/**
 * The style which turns off high contrast adjustment in browsers.
 */
export function getHighContrastNoAdjustStyle(): IRawStyle {
  return {
    forcedColorAdjust: 'none',
    MsHighContrastAdjust: 'none',
  };
}

/**
 * The style which turns off high contrast adjustment in (only) Edge Chromium browser.
 *  @deprecated Use `getHighContrastNoAdjustStyle`
 */
export function getEdgeChromiumNoHighContrastAdjustSelector(): { [EdgeChromiumHighContrastSelector]: IRawStyle } {
  return {
    [EdgeChromiumHighContrastSelector]: {
      forcedColorAdjust: 'none',
    },
  };
}
