import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IGanttChartProps, IGanttChartStyleProps, IGanttChartStyles } from '../../index';
import { GanttChartBase } from './GanttChart.base';
import { getStyles } from './GanttChart.styles';

// Create a GanttChart variant which uses these default styles and this styled subcomponent.
/**
 * GanttChart component.
 * {@docCategory GanttChart}
 */
export const GanttChart: React.FunctionComponent<IGanttChartProps> = styled<
  IGanttChartProps,
  IGanttChartStyleProps,
  IGanttChartStyles
>(GanttChartBase, getStyles);
