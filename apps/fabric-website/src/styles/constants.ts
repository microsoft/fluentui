import { ScreenWidthMinUhfMobile, ScreenWidthMinXLarge } from 'office-ui-fabric-react/lib/Styling';

// Padding matches padding used by UHF at the same (lg / sm) UHF breakpoints
export const appPaddingLeftLg = 32;
export const appPaddingRightLg = 32;
export const appPaddingLeftSm = 24;
export const appPaddingRightSm = 24;

// General use padding for consistency.
export const appPaddingLg = 52;
export const appPaddingMd = 40;
export const appPaddingSm = 28;

export const appPadding = {
  large: appPaddingLg,
  medium: appPaddingMd,
  small: appPaddingSm,
  leftLarge: appPaddingLeftLg,
  rightLarge: appPaddingRightLg,
  leftSmall: appPaddingLeftSm,
  rightSmall: appPaddingRightSm
};

export const contentPaddingSmall = 16;
export const contentPaddingLg = 32;
export const contentPaddingXl = 40;
export const contentPaddingBottom = 100;

export const queryUhfMobileMin = `@media screen and (min-width: ${ScreenWidthMinUhfMobile}px)`;
export const queryXLargeMin = `@media screen and (min-width: ${ScreenWidthMinXLarge}px)`;

export const ScreenWidthMaxUhfMobile = ScreenWidthMinUhfMobile - 0.001;
export const ScreenWidthMaxXLarge = ScreenWidthMinXLarge - 0.001;

export const mediaQuery = {
  minMobile: `@media only screen and (min-width: ${ScreenWidthMinUhfMobile}px)`,
  maxMobile: `@media only screen and (max-width: ${ScreenWidthMaxUhfMobile}px)`,
  minLarge: `@media only screen and (min-width: ${ScreenWidthMinXLarge}px)`,
  maxLarge: `@media only screen and (max-width: ${ScreenWidthMaxXLarge}px)`
};
