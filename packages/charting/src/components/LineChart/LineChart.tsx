import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles } from './LineChart.types';
import { LineChartBase } from './LineChart.base';
import { getStyles } from './LineChart.styles';

// Create a LineChart variant which uses these default styles and this styled subcomponent.
export const LineChart: React.StatelessComponent<ILineChartProps> = styled<ILineChartProps, ILineChartStyleProps, ILineChartStyles>(
  LineChartBase,
  getStyles
);
