import { styled } from '../../Utilities';
import { IVerticalBarChartProps, IVerticalBarChartStyleProps, IVerticalBarChartStyles } from './VerticalBarChart.types';
import { VerticalBarChartBase } from './VerticalBarChart.base';
import { getStyles } from './VerticalBarChart.styles';

// Create a VerticalBarChart variant which uses these default styles and this styled subcomponent.
export const VerticalBarChart: React.StatelessComponent<IVerticalBarChartProps> = styled<
  IVerticalBarChartProps,
  IVerticalBarChartStyleProps,
  IVerticalBarChartStyles
>(VerticalBarChartBase, getStyles);
