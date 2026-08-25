'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

/**
 * Styles shared by the month and year picker items, which present the same button grid over
 * different data.
 */
export const useCalendarItemStyles = makeStyles({
  buttonRow: {
    columnGap: tokens.spacingHorizontalM,
    display: 'flex',
    marginBottom: '16px',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  itemButton: {
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground3,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '40px',
    lineHeight: '40px',
    minHeight: '40px',
    minWidth: '40px',
    overflow: 'visible',
    padding: '0',
    width: '40px',
    fontWeight: tokens.fontWeightRegular,

    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorNeutralForeground1Static,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,

      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'WindowText',
        forcedColorAdjust: 'none',
        outline: '1px solid Highlight',
      },
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,

      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },
    },
  },
  highlightCurrent: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
    '&:hover, &:hover:active': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,

      '@media (forced-colors: active)': {
        backgroundColor: 'WindowText',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
  },
  highlightSelected: {
    backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    color: tokens.colorNeutralForeground1Static,
    fontWeight: tokens.fontWeightSemibold,

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      color: tokens.colorNeutralForeground1Static,

      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
    },
  },
  disabled: {
    '&, &:disabled, & button': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
    '@media (forced-colors: active)': {
      color: 'GrayText',
      forcedColorAdjust: 'none',
    },
  },
});
