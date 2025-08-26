import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { ScatterChartProps, ScatterChartStyles } from './ScatterChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { getMarkerLabelStyle, getTooltipStyle } from '../../utilities/index';

/**
 * @internal
 */
export const scatterChartClassNames: SlotClassNames<ScatterChartStyles> = {
  tooltip: 'fui-line__tooltip',
  markerLabel: 'fui-line__markerLabel',
  root: 'fui-line__root',
  xAxis: 'fui-line__xAxis',
  yAxis: 'fui-line__yAxis',
  legendContainer: 'fui-line__legendContainer',
  hover: 'fui-line__hover',
  descriptionMessage: 'fui-line__descriptionMessage',
  axisTitle: 'fui-line__axisTitle',
  chartTitle: 'fui-line__chartTitle',
  opacityChangeOnHover: 'fui-line__opacityChangeOnHover',
  shapeStyles: 'fui-line__shapeStyles',
  chartWrapper: 'fui-line__chartWrapper',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  tooltip: getTooltipStyle() as GriffelStyle,
  markerLabel: getMarkerLabelStyle() as GriffelStyle,
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useScatterChartStyles = (props: ScatterChartProps): ScatterChartStyles => {
  const baseStyles = useStyles();
  return {
    tooltip: mergeClasses(scatterChartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    markerLabel: mergeClasses(scatterChartClassNames.markerLabel, baseStyles.markerLabel, props.styles?.markerLabel),
  };
};
