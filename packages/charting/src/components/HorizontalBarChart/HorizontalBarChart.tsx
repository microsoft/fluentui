import { styled } from 'office-ui-fabric-react/lib/Utilities';
import {
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles
} from './HorizontalBarChart.types';
import { HorizontalBarChartBase } from './HorizontalBarChart.base';
import { getStyles } from './HorizontalBarChart.styles';

// Create a HorizontalBarChart variant which uses these default styles and this styled subcomponent.
export const HorizontalBarChart = styled<
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles
>(HorizontalBarChartBase, getStyles);
