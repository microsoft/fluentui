import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { IVerticalBarChartProps, IVerticalBarChartStyles } from '../../index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const verticalbarchartClassNames: SlotClassNames<IVerticalBarChartStyles> = {
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
    ...shorthands.padding('8px'),
    position: 'absolute',
    textAlign: 'center',
    top: '0px',
    fill: tokens.colorNeutralBackground1,
    borderRadius: '2px',
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
export const useVerticalBarChartStyles_unstable = (props: IVerticalBarChartProps): IVerticalBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(
      verticalbarchartClassNames.opacityChangeOnHover,
      // baseStyles.opacityChangeOnHover /*
      props.styles?.opacityChangeOnHover,
    ),
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
    tooltip: mergeClasses(verticalbarchartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    barLabel: mergeClasses(verticalbarchartClassNames.barLabel, baseStyles.barLabel /*props.styles?.barLabel*/),
  };
};
