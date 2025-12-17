import { PolarChartStyles, PolarChartProps } from './PolarChart.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const polarChartClassNames: SlotClassNames<PolarChartStyles> = {
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
  plotContainer: '',
  annotationLayer: '',
};

/**
 * Apply styling to the PolarChart component
 */
export const usePolarChartStyles = (props: PolarChartProps): PolarChartStyles => {
  return {};
};
