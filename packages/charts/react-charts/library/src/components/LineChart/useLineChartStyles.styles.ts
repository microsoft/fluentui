import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { LineChartProps, LineChartStyles } from './LineChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { HighContrastSelector } from '../../utilities/index';
import { getMarkerLabelStyle, getTooltipStyle } from '../../utilities/index';

/**
 * @internal
 */
export const linechartClassNames: SlotClassNames<LineChartStyles> = {
  tooltip: 'fui-line__tooltip',
  lineBorder: 'fui-line_lineBorder',
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
  lineBorder: {
    stroke: tokens.colorNeutralBackground1,
    [HighContrastSelector]: {
      stroke: 'Canvas',
    },
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useLineChartStyles = (props: LineChartProps): LineChartStyles => {
  const baseStyles = useStyles();
  return {
    tooltip: mergeClasses(linechartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
    lineBorder: mergeClasses(linechartClassNames.lineBorder, baseStyles.lineBorder /*props.styles?.lineBorder*/),
    markerLabel: mergeClasses(linechartClassNames.markerLabel, baseStyles.markerLabel /*props.styles?.markerLabel*/),
  };
};
