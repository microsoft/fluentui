'use client';

import { makeStyles } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';

/** Extractable, theme-aware content styles; the native chart owns callout positioning. */
export const useVegaLiteTooltipStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    margin: tokens.spacingVerticalNone,
    padding: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
  value: {
    margin: tokens.spacingVerticalNone,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
});
