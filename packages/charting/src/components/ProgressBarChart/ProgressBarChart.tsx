import { styled } from '../../Utilities';
import { IProgressBarChartProps, IProgressBarChartStyleProps, IProgressBarChartStyles } from './ProgressBarChart.types';
import { ProgressBarChartBase } from './ProgressBarChart.base';
import { getStyles } from './ProgressBarChart.styles';

// Create a ProgressBarChart variant which uses these default styles and this styled subcomponent.
export const ProgressBarChart = styled<IProgressBarChartProps, IProgressBarChartStyleProps, IProgressBarChartStyles>(
  ProgressBarChartBase,
  getStyles
);
