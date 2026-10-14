'use client';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useVegaLiteChartPresentationStyles = makeStyles({
  title: {
    margin: tokens.spacingVerticalNone,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    // Composed unit views already supply an authored h3 before the responsive renderer.
    // Hide only the renderer's heading, not its subtitle or standalone authored titles.
    '[data-vega-view] &': { display: 'none' },
  },
  subtitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
  },
});
