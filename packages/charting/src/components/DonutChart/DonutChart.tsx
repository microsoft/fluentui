import { styled } from '../../Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { DonutChartBase } from './DonutChart.base';
import { getStyles } from './DonutChart.styles';

// Create a DonutChart variant which uses these default styles and this styled subcomponent.
export const DonutChart: React.StatelessComponent<IDonutChartProps> = styled<IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles>(
  DonutChartBase,
  getStyles
);
