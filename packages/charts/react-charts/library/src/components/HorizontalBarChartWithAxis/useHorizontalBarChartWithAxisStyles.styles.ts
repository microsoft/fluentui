import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { HorizontalBarChartWithAxisProps, HorizontalBarChartWithAxisStyles } from './index';
import { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

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
};

const useStyles = makeStyles({
  opacityChangeOnHover: {
    opacity: 0.1, // supports custom opacity
  },

  xAxisTicks: {},

  tooltip: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingHorizontalS),
    position: 'absolute',
    textAlign: 'center',
    top: tokens.spacingVerticalNone,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    pointerEvents: 'none',
  },
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
    tooltip: mergeClasses(hbcWithAxisClassNames.tooltip, baseStyles.tooltip),
  };
};
