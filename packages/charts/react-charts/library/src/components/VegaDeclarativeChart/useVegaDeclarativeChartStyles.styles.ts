'use client';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/** Composition frames are token-styled; simple units retain their existing native DOM. */
export const useVegaDeclarativeChartStyles = makeStyles({
  grid: { display: 'grid', gap: tokens.spacingHorizontalL },
  cell: { minWidth: 0 },
  header: {
    margin: 0,
    paddingBlock: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  message: {
    margin: 0,
    padding: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
});
