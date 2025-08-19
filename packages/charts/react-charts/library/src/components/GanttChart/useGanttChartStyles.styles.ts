import { GanttChartStyles, GanttChartProps } from '../../index';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const ganttClassNames: SlotClassNames<GanttChartStyles> = {
  root: '',
  xAxis: '',
  yAxis: '',
  legendContainer: '',
  hover: '',
  descriptionMessage: '',
  tooltip: '',
  axisTitle: '',
  chartTitle: '',
  opacityChangeOnHover: '',
  shapeStyles: '',
  chartWrapper: '',
  svgTooltip: '',
  chart: '',
  axisAnnotation: '',
};

/**
 * Apply styling to the GanttChart component
 */
export const useGanttChartStyles = (props: GanttChartProps): GanttChartStyles => {
  return {};
};
