import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IMultiStackedBarChartProps, IMultiStackedBarChartStyleProps, IMultiStackedBarChartStyles } from './MultiStackedBarChart.types';
import { MultiStackedBarChartBase } from './MultiStackedBarChart.base';
import { getMultiStackedBarChartStyles } from './MultiStackedBarChart.styles';

// Create a MultiStackedBarChart variant which uses these default styles and this styled subcomponent.
export const MultiStackedBarChart: React.StatelessComponent<IMultiStackedBarChartProps> = styled<
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyleProps,
  IMultiStackedBarChartStyles
>(MultiStackedBarChartBase, getMultiStackedBarChartStyles);
