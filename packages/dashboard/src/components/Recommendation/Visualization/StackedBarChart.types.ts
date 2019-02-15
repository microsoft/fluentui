import { IStyle } from 'office-ui-fabric-react/lib/Styling';

import { IRecommendationBannerChartData } from '../Recommendation.types';

/**
 * Props for StackedBarChart Visualization
 */
export interface IStackedBarChartVisualizationProps {
  /**
   * Chart datapoints used to render the Visualization
   *
   * @type {IRecommendationBannerChartData[]}
   * @memberof IStackedBarChartVisualizationProps
   */
  visualizationDatapoints?: IRecommendationBannerChartData[];
}

/**
 * Styles for Rendering StackedBar Chart visualization
 */
export interface IStackedBarChartVisualizationStyles {
  /**
   * styles for Chart visualization container
   */
  chartVisualizationContainerStyle: IStyle;

  /**
   * styles for chart visualization
   */
  chartVisualizationStyle: IStyle;
}
