'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { PolarChartStyles, PolarChartProps } from './PolarChart.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

/**
 * @internal
 */
export const polarChartClassNames: SlotClassNames<PolarChartStyles> = {
  root: 'fui-polar__root',
  chartWrapper: 'fui-polar__chartWrapper',
  chart: 'fui-polar__chart',
  gridLineInner: 'fui-polar__gridLineInner',
  gridLineOuter: 'fui-polar__gridLineOuter',
  tickLabel: 'fui-polar__tickLabel',
  legendContainer: 'fui-polar__legendContainer',
};

const useStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    textAlign: 'left',
  },

  chart: {
    display: 'block',
  },

  gridLine: {
    fill: 'none',
    stroke: tokens.colorNeutralForeground1,
    strokeWidth: '1px',
  },

  gridLineInner: {
    opacity: 0.2,
  },

  gridLineOuter: {
    opacity: 1,
  },

  tickLabel: {
    ...typographyStyles.caption2Strong,
    fill: tokens.colorNeutralForeground1,
  },

  legendContainer: {
    width: '100%',
  },
});

/**
 * Apply styling to the PolarChart component
 */
export const usePolarChartStyles = (props: PolarChartProps): PolarChartStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(polarChartClassNames.root, baseStyles.root, props.styles?.root),
    chartWrapper: mergeClasses(polarChartClassNames.chartWrapper, props.styles?.chartWrapper),
    chart: mergeClasses(polarChartClassNames.chart, baseStyles.chart, props.styles?.chart),
    gridLineInner: mergeClasses(
      polarChartClassNames.gridLineInner,
      baseStyles.gridLine,
      baseStyles.gridLineInner,
      props.styles?.gridLineInner,
    ),
    gridLineOuter: mergeClasses(
      polarChartClassNames.gridLineOuter,
      baseStyles.gridLine,
      baseStyles.gridLineOuter,
      props.styles?.gridLineOuter,
    ),
    tickLabel: mergeClasses(polarChartClassNames.tickLabel, baseStyles.tickLabel, props.styles?.tickLabel),
    legendContainer: mergeClasses(
      polarChartClassNames.legendContainer,
      baseStyles.legendContainer,
      props.styles?.legendContainer,
    ),
  };
};
