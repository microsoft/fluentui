import { ScreenWidthMinUhfMobile, ScreenWidthMinXLarge } from '@fluentui/react/lib/Styling';

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
  rightSmall: appPaddingRightSm,
};

export const contentPaddingSmall = 16;
export const contentPaddingLg = 32;
export const contentPaddingXl = 40;
export const contentPaddingBottom = 100;

// Component variables
export const contentWidth = 1024; // Target width for content area to show large breakpoint width for examples;
export const contentPadding = appPaddingSm;

export const PageHeaderFullHeight = 136;

export const navWidthSm = 252;
export const navWidthLg = 302;
export const navPadding = appPaddingSm;
export const topNavHeight = 52;

// We want the text to appear the same distance from the body and the nav. It include 8 padding already.
export const sideRailPaddingLeft = appPaddingMd - 8;
export const sideRailWidth = 182 + sideRailPaddingLeft;

export const CodeBlockToggleButtonHeight = 28;

// Left padding + Nav + Body and Content Padding + Content + SideRail + Right padding.
export const appMaximumWidthSm =
  appPaddingLeftLg + navWidthSm + appPaddingMd + contentPadding * 2 + contentWidth + sideRailWidth + appPaddingRightLg;
export const appMaximumWidthLg =
  appPaddingLeftLg + navWidthLg + appPaddingMd + contentPadding * 2 + contentWidth + sideRailWidth + appPaddingRightLg;

export const queryUhfMobileMin = `@media screen and (min-width: ${ScreenWidthMinUhfMobile}px)`;
export const queryXLargeMin = `@media screen and (min-width: ${ScreenWidthMinXLarge}px)`;

export const ScreenWidthMaxUhfMobile = ScreenWidthMinUhfMobile - 0.001;
export const ScreenWidthMaxXLarge = ScreenWidthMinXLarge - 0.001;

export const mediaQuery = {
  minMobile: `@media only screen and (min-width: ${ScreenWidthMinUhfMobile}px)`,
  maxMobile: `@media only screen and (max-width: ${ScreenWidthMaxUhfMobile}px)`,
  minLarge: `@media only screen and (min-width: ${ScreenWidthMinXLarge}px)`,
  maxLarge: `@media only screen and (max-width: ${ScreenWidthMaxXLarge}px)`,
};
