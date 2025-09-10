import { makeStyles, mergeClasses } from '@griffel/react';
import { HorizontalBarChartWithAxisProps, HorizontalBarChartWithAxisStyles } from './index';
import { SlotClassNames } from '@fluentui/react-utilities';

export const hbcWithAxisClassNames: SlotClassNames<HorizontalBarChartWithAxisStyles> = {
  opacityChangeOnHover: 'fui-hbcwa__opacityChangeOnHover',
  xAxisTicks: 'fui-hbcwa__xAxisTicks',
  tooltip: 'fui-hbcwa__tooltip',
  chartLabel: '',
  xAxisDomain: '',
  xAxisText: '',
  yAxisDomain: '',
  yAxisTicks: '',
  yAxisText: '',
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  axisTitle: '',
  chartTitle: '',
  shapeStyles: '',
  chartWrapper: '',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
};

const useStyles = makeStyles({
  opacityChangeOnHover: {
    opacity: 0.1, // supports custom opacity
  },

  xAxisTicks: {},
});

/**
 * Apply styling to the HorizontalBarChartWithAxis slots based on the state
 */
export const useHorizontalBarChartWithAxisStyles = (
  props: HorizontalBarChartWithAxisProps,
): HorizontalBarChartWithAxisStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(hbcWithAxisClassNames.opacityChangeOnHover, baseStyles.opacityChangeOnHover),
    xAxisTicks: mergeClasses(hbcWithAxisClassNames.xAxisTicks, baseStyles.xAxisTicks),
  };
};
