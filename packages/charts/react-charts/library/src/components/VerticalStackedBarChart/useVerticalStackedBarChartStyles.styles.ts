import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import { VerticalStackedBarChartProps, VerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { getBarLabelStyle, getTooltipStyle } from '../../utilities/index';

export const verticalstackedbarchartClassNames: SlotClassNames<VerticalStackedBarChartStyles> = {
  opacityChangeOnHover: 'fui-vsbc__opacityChangeOnHover',
  tooltip: 'fui-vsbc__tooltip',
  barLabel: 'fui-vsbc__barLabel',
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
    cursor: 'default',
  },
  tooltip: getTooltipStyle() as GriffelStyle,
  barLabel: getBarLabelStyle() as GriffelStyle,
});

export const useVerticalStackedBarChartStyles = (
  props: VerticalStackedBarChartProps,
): VerticalStackedBarChartStyles => {
  const baseStyles = useStyles();

  return {
    opacityChangeOnHover: mergeClasses(
      verticalstackedbarchartClassNames.opacityChangeOnHover,
      baseStyles.opacityChangeOnHover,
      props.href ? 'pointer' : 'default',
    ),
    tooltip: mergeClasses(verticalstackedbarchartClassNames.tooltip, baseStyles.tooltip),
    barLabel: mergeClasses(verticalstackedbarchartClassNames.barLabel, baseStyles.barLabel),
  };
};
