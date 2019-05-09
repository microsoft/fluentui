import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IBenchmarkBarChartProps, IBenchmarkBarChartStyleProps, IBenchmarkBarChartStyle } from './BenchmarkBarChart.types';
import { BenchmarkBarChartBase } from './BenchmarkBarChart.base';
import { getBenchmarkBarChartStyles } from './BenchmarkBarChart.style';

// Create a BenchmarkBarChart variant which uses these default styles and this styled subcomponent.
export const BenchmarkBarChart: React.StatelessComponent<IBenchmarkBarChartProps> = styled<
  IBenchmarkBarChartProps,
  IBenchmarkBarChartStyleProps,
  IBenchmarkBarChartStyle
>(BenchmarkBarChartBase, getBenchmarkBarChartStyles);
