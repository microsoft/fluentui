import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { AreaChartProps, AreaChartStyles } from './index';
import { SlotClassNames } from '@fluentui/react-utilities';
import { getTooltipStyle } from '../../utilities/index';

export const areaChartClassNames: SlotClassNames<AreaChartStyles> = {
  tooltip: 'fui-ac__tooltip',
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  axisTitle: '',
  chartTitle: '',
  opacityChangeOnHover: '',
  shapeStyles: '',
  chartWrapper: '',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
};

const useStyles = makeStyles({
  tooltip: getTooltipStyle() as GriffelStyle,
});

/**
 * Apply styling to the AreaChart slots based on the state
 */
export const useAreaChartStyles = (props: AreaChartProps): AreaChartStyles => {
  const baseStyles = useStyles();

  return {
    tooltip: mergeClasses(areaChartClassNames.tooltip, baseStyles.tooltip /*props.styles?.tooltip*/),
  };
};
