'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { useVegaLiteChartPresentationStyles } from './VegaLiteChartPresentation.styles';

const useStyles = makeStyles({
  mark: {
    '@media (forced-colors: active)': { fill: 'CanvasText', stroke: 'CanvasText' },
  },
});

export const useVegaLiteRangedStyles = (): ReturnType<typeof useVegaLiteChartPresentationStyles> & { mark: string } => {
  const shared = useVegaLiteChartPresentationStyles();
  const classes = useStyles();
  return { ...shared, mark: mergeClasses(shared.focusIndicator, classes.mark) };
};
