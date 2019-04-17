import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IHorizontalBarChartProps, IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';
import { HorizontalBarChartBase } from './HorizontalBarChart.base';
import { getHorizontalBarChartStyles } from './HorizontalBarChart.styles';

// Create a HorizontalBarChart variant which uses these default styles and this styled subcomponent.
export const HorizontalBarChart: React.StatelessComponent<IHorizontalBarChartProps> = styled<
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles
>(HorizontalBarChartBase, getHorizontalBarChartStyles);
