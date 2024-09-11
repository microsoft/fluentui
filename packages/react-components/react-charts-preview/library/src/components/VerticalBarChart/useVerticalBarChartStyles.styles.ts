import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { IVerticalBarChartProps, IVerticalBarChartStyles, IVerticalBarChartStyleProps } from '../../index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens } from '@fluentui/react-theme';

export const verticalbarchartClassNames: SlotClassNames<IVerticalBarChartStyles> = {
  opacityChangeOnHover: 'fui-vbc__opacityChangeOnHover',
  xAxisTicks: 'fui-vbc__xAxisTicks',
  yAxisTicks: 'fui-vbc__yAxisTicks',
  yAxisDomain: 'fui-vbc__yAxisDomain',
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
  tooltip: '',
};
const useStyles = makeStyles({
  xAxisTicks: {},
  yAxisTicks: {
    transform: 'scaleX(-1)',
  },
  yAxisDomain: {
    transform: 'scaleX(-1)',
  },
  barLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    fill: tokens.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useVerticalBarChartStyles_unstable = (props: IVerticalBarChartProps): IVerticalBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(verticalbarchartClassNames.opacityChangeOnHover),
    xAxisTicks: mergeClasses(
      // eslint-disable-next-line deprecation/deprecation
      verticalbarchartClassNames.xAxisTicks,
      baseStyles.xAxisTicks /*props.styles?.xAxisTicks*/,
    ),
    yAxisTicks: mergeClasses(
      // eslint-disable-next-line deprecation/deprecation
      verticalbarchartClassNames.yAxisTicks,
      baseStyles.yAxisTicks /*props.styles?.yAxisTicks*/,
    ),
    yAxisDomain: mergeClasses(
      // eslint-disable-next-line deprecation/deprecation
      verticalbarchartClassNames.yAxisDomain,
      baseStyles.yAxisDomain /*props.styles?.yAxisDomain*/,
    ),
    barLabel: mergeClasses(verticalbarchartClassNames.barLabel, baseStyles.barLabel /*props.styles?.barLabel*/),
  };
};
