'use client';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useVegaLiteCenteredAreaStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  svg: { display: 'block', overflow: 'hidden' },
  axis: { fill: tokens.colorNeutralForeground1, fontSize: tokens.fontSizeBase200 },
  axisLine: { stroke: tokens.colorNeutralStroke1, strokeWidth: tokens.strokeWidthThin },
  area: {
    '@media (forced-colors: active)': { fill: 'Canvas', stroke: 'CanvasText', strokeWidth: tokens.strokeWidthThin },
  },
  point: {
    fillOpacity: 0,
    strokeOpacity: 0,
    pointerEvents: 'all',
    ':focus': {
      fill: tokens.colorNeutralBackground1,
      fillOpacity: 1,
      stroke: tokens.colorStrokeFocus2,
      strokeOpacity: 1,
      strokeWidth: tokens.strokeWidthThick,
    },
    ':hover': { fillOpacity: 1 },
    '@media (forced-colors: active)': {
      ':focus': { fill: 'Canvas', stroke: 'Highlight' },
    },
  },
  tooltip: { padding: tokens.spacingHorizontalS, color: tokens.colorNeutralForeground1 },
});
