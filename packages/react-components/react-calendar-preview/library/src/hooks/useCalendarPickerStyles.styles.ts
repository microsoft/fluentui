'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

/**
 * Chrome shared by the month and year pickers, which render the same header, navigation and grid
 * shell. Each picker owns its slot class names and applies these styles itself.
 */
export const useCalendarPickerStyles = makeStyles({
  root: {
    boxSizing: 'content-box',
    overflow: 'hidden',
    padding: '12px',
    width: '196px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
  },
  header: {
    display: 'flex',
  },
  heading: {
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: 'inherit',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    overflow: 'visible',
    padding: '0 4px 0 10px',
    textAlign: 'left',
  },
  hasHeaderClickCallback: {
    // If this is updated, make sure to update headerIsClickable in useCalendarDayStyles as well
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
  },
  navigation: {
    alignItems: 'center',
    display: 'flex',
  },
  navigationButton: {
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '28px',
    lineHeight: '28px',
    minHeight: '28px',
    minWidth: '28px',
    overflow: 'visible',
    padding: '0',
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },

    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
    },
  },
  grid: {
    marginTop: '4px',
  },
});
