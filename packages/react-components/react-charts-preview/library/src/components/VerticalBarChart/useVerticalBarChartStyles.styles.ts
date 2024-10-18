import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { VerticalBarChartProps, VerticalBarChartStyles } from '../../index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const verticalbarchartClassNames: SlotClassNames<VerticalBarChartStyles> = {
  opacityChangeOnHover: 'fui-vbc__opacityChangeOnHover',
  xAxisTicks: 'fui-vbc__xAxisTicks',
  yAxisTicks: 'fui-vbc__yAxisTicks',
  yAxisDomain: 'fui-vbc__yAxisDomain',
  tooltip: 'fui-vbc__tooltip',
  barLabel: 'fui-vbc__barLabel',
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  calloutContentRoot: '',
  calloutContentX: '',
  calloutContentY: '',
  descriptionMessage: '',
  calloutDateTimeContainer: '',
  calloutInfoContainer: '',
  calloutBlockContainer: '',
  calloutBlockContainertoDrawShapefalse: '',
  calloutBlockContainertoDrawShapetrue: '',
  calloutlegendText: '',
  axisTitle: '',
  chartTitle: '',
  shapeStyles: '',
  chartWrapper: '',
};
const useStyles = makeStyles({
  opacityChangeOnHover: {},
  xAxisTicks: {},
  yAxisTicks: {
    transform: 'scaleX(-1)',
  },
  yAxisDomain: {
    transform: 'scaleX(-1)',
  },
  tooltip: {
    ...typographyStyles.body1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingHorizontalS),
    position: 'absolute',
    textAlign: 'center',
    top: tokens.spacingVerticalNone,
    fill: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    pointerEvents: 'none',
  },
  barLabel: {
    ...typographyStyles.caption1Strong,
    fill: tokens.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useVerticalBarChartStyles_unstable = (props: VerticalBarChartProps): VerticalBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(
      verticalbarchartClassNames.opacityChangeOnHover,
      baseStyles.opacityChangeOnHover /*props.styles?.opacityChangeOnHover*/,
    ),
    xAxisTicks: mergeClasses(baseStyles.xAxisTicks /*props.styles?.xAxisTicks*/),
    yAxisTicks: mergeClasses(baseStyles.yAxisTicks /*props.styles?.yAxisTicks*/),
    yAxisDomain: mergeClasses(baseStyles.yAxisDomain /*props.styles?.yAxisDomain*/),
    tooltip: mergeClasses(verticalbarchartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    barLabel: mergeClasses(verticalbarchartClassNames.barLabel, baseStyles.barLabel /*props.styles?.barLabel*/),
  };
};
