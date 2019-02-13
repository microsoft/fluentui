import * as React from 'react';
import { IChartProps, IChartDataPoint, MultiStackedBarChart } from '@uifabric/charting';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { getStackedBarChartVisualizationStyles } from './StackedBarChart.styles';
import { IStackedBarChartVisualizationProps, IStackedBarChartVisualizationStyles } from './StackedBarChart.types';

import { IRecommendationBannerChartData, IRecommendationBannerChartDataPoint } from '../Recommendation.types';

export const MultiStackedBarChartVisualization: React.SFC<IStackedBarChartVisualizationProps> = (
  props: IStackedBarChartVisualizationProps
) => {
  const { visualizationDatapoints } = props;
  const getClassNames = classNamesFunction<{}, IStackedBarChartVisualizationStyles>();
  const classNames = getClassNames(getStackedBarChartVisualizationStyles);

  const legendColors = ['#0078D4', '#0B6A0B', '#662D91', '#038387', '#00AE56'];
  const legendColorLength = legendColors.length;
  let counter = 0;
  const chartData: IChartProps[] = [];
  const hideRatio: boolean[] = [];

  if (visualizationDatapoints) {
    visualizationDatapoints.forEach((data: IRecommendationBannerChartData) => {
      const chartDataPoints: IChartDataPoint[] = data.chartData.map((dataPoint: IRecommendationBannerChartDataPoint) => {
        return {
          legend: dataPoint.datapointText,
          data: dataPoint.datapointValue,
          color: legendColors[counter++ % legendColorLength]
        };
      });

      const chartProp: IChartProps = {
        chartTitle: data.chartTitle,
        chartData: chartDataPoints
      };

      chartData.push(chartProp);
      hideRatio.push(true);
    });

    return (
      <div className={classNames.chartVisualizationContainerStyle}>
        <div className={classNames.chartVisualizationStyle}>
          <MultiStackedBarChart data={chartData} hideRatio={hideRatio} />
        </div>
      </div>
    );
  }

  return null;
};
