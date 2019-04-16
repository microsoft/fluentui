import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IPieChartProps, IPieChartStyleProps, IPieChartStyles } from './PieChart.types';
import { PieChartBase } from './PieChart.base';
import { getStyles } from './PieChart.styles';

// Create a PieChart variant which uses these default styles and this styled subcomponent.
export const PieChart: React.StatelessComponent<IPieChartProps> = styled<IPieChartProps, IPieChartStyleProps, IPieChartStyles>(
  PieChartBase,
  getStyles
);
