'use client';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useVegaLiteRangedStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  svg: { display: 'block', overflow: 'hidden' },
  axis: { fill: tokens.colorNeutralForeground1, fontSize: tokens.fontSizeBase200 },
  axisLine: { stroke: tokens.colorNeutralStroke1, strokeWidth: tokens.strokeWidthThin },
  mark: {
    ':focus-visible': { stroke: tokens.colorStrokeFocus2, strokeWidth: tokens.strokeWidthThick },
    '@media (forced-colors: active)': { fill: 'CanvasText', stroke: 'CanvasText' },
  },
  tooltip: { padding: tokens.spacingHorizontalS, color: tokens.colorNeutralForeground1 },
});
