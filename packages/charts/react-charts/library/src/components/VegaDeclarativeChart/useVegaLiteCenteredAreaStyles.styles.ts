'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useVegaLiteChartPresentationStyles } from './VegaLiteChartPresentation.styles';

const useStyles = makeStyles({
  area: {
    '@media (forced-colors: active)': { fill: 'Canvas', stroke: 'CanvasText', strokeWidth: tokens.strokeWidthThin },
  },
  point: {
    fillOpacity: 0,
    strokeOpacity: 0,
    pointerEvents: 'all',
    ':focus-visible': {
      fill: tokens.colorNeutralBackground1,
      fillOpacity: 1,
      strokeOpacity: 1,
    },
    ':hover': { fillOpacity: 1 },
    '@media (forced-colors: active)': {
      ':focus-visible': { fill: 'Canvas', stroke: 'Highlight' },
    },
  },
});

export const useVegaLiteCenteredAreaStyles = (): ReturnType<typeof useVegaLiteChartPresentationStyles> &
  ReturnType<typeof useStyles> => {
  const shared = useVegaLiteChartPresentationStyles();
  const classes = useStyles();
  return { ...shared, ...classes, point: mergeClasses(shared.focusIndicator, classes.point) };
};
