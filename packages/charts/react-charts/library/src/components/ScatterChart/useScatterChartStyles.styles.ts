import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { ScatterChartProps, ScatterChartStyles } from './ScatterChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';

/**
 * @internal
 */
export const scatterChartClassNames: SlotClassNames<ScatterChartStyles> = {
  tooltip: 'fui-line__tooltip',
  root: 'fui-line__root',
  xAxis: 'fui-line__xAxis',
  yAxis: 'fui-line__yAxis',
  legendContainer: 'fui-line__legendContainer',
  hover: 'fui-line__hover',
  calloutContentRoot: 'fui-line__calloutContentRoot',
  calloutContentX: 'fui-line__calloutContentX',
  calloutContentY: 'fui-line__calloutContentY',
  descriptionMessage: 'fui-line__descriptionMessage',
  calloutDateTimeContainer: 'fui-line__calloutDateTimeContainer',
  calloutInfoContainer: 'fui-line__calloutInfoContainer',
  calloutBlockContainer: 'fui-line__calloutBlockContainer',
  calloutlegendText: 'fui-line__calloutLegendText',
  axisTitle: 'fui-line__axisTitle',
  chartTitle: 'fui-line__chartTitle',
  opacityChangeOnHover: 'fui-line__opacityChangeOnHover',
  shapeStyles: 'fui-line__shapeStyles',
  chartWrapper: 'fui-line__chartWrapper',
  calloutBlockContainertoDrawShapefalse: '', // Not used so marked as empty. ToDo - How to configure inheritence properly
  calloutBlockContainertoDrawShapetrue: '', // Not used so marked as empty. ToDo - How to configure inheritence properly
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  tooltip: {
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
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useScatterChartStyles_unstable = (props: ScatterChartProps): ScatterChartStyles => {
  const baseStyles = useStyles();
  return {
    tooltip: mergeClasses(scatterChartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
  };
};
