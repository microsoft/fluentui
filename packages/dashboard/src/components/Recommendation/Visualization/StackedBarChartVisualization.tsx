import * as React from 'react';
import { IChartProps, IChartDataPoint, StackedBarChart } from '@uifabric/charting';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { getStackedBarChartVisualizationStyles } from './StackedBarChart.styles';
import { IStackedBarChartVisualizationProps, IStackedBarChartVisualizationStyles } from './StackedBarChart.types';

import { IRecommendationBannerChartData } from '../Recommendation.types';

export const StackedBarChartVisualization: React.SFC<IStackedBarChartVisualizationProps> = (props: IStackedBarChartVisualizationProps) => {
  const chartColors = ['#662D91', '#E6E6E6'];
  const { visualizationDatapoints } = props;
  const getClassNames = classNamesFunction<{}, IStackedBarChartVisualizationStyles>();
  const classNames = getClassNames(getStackedBarChartVisualizationStyles);
  const chartData: IChartProps[] = [];

  if (visualizationDatapoints) {
    visualizationDatapoints.forEach((data: IRecommendationBannerChartData) => {
      const maxIndex = Math.min(data.chartData.length, 2);
      const chartDataPoints: IChartDataPoint[] = [];
      for (let i = 0; i < maxIndex; i++) {
        chartDataPoints.push({
          legend: data.chartData[i].datapointText,
          data: data.chartData[i].datapointValue,
          color: chartColors[i]
        });
      }

      const chartProp: IChartProps = {
        chartTitle: data.chartTitle,
        chartData: chartDataPoints
      };

      chartData.push(chartProp);
    });

    const stackedBarCharts = (
      <div className={classNames.chartVisualizationContainerStyle}>
        <div className={classNames.chartVisualizationStyle}>
          {chartData.map((data: IChartProps) => (
            <StackedBarChart data={data} barHeight={8} hideLegend={true} />
          ))}
        </div>
      </div>
    );

    return stackedBarCharts;
  }

  return null;
};
