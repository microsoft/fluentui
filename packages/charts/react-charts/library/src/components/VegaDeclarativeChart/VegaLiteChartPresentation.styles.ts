'use client';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useVegaLiteChartPresentationStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  svg: { display: 'block', overflow: 'hidden' },
  axis: { fill: tokens.colorNeutralForeground1, fontSize: tokens.fontSizeBase200 },
  axisLine: { stroke: tokens.colorNeutralStroke1, strokeWidth: tokens.strokeWidthThin },
  focusIndicator: {
    ':focus-visible': { stroke: tokens.colorStrokeFocus2, strokeWidth: tokens.strokeWidthThick },
  },
  tooltip: { padding: tokens.spacingHorizontalS, color: tokens.colorNeutralForeground1 },
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
