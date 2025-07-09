import type { CartesianChartProps, CartesianChartStyles } from '../CommonComponents/CartesianChart.types';
import type { HeatMapChartData } from '../../types/DataPoint';

/**
 * Heat Map Chart properties
 * {@docCategory HeatMapChart}
 */
export interface HeatMapChartProps extends CartesianChartProps {
  /**
   * chart title for the chart
   */
  chartTitle?: string;
  /**
   * data to provide for Heat Map
   */
  data: HeatMapChartData[];
  /**
   * The domain value for the color scale,
   *
   */
  domainValuesForColorScale: number[];
  /**
   * The range values for the color scale,
   * fill the array with colors in hex format
   * note:- it should contain values exactly as many as values in the array
   * `domainValuesForColorScale`
   */
  rangeValuesForColorScale: string[];
  /**
   * date formatter of x axis,
   * if the x-axis data point are of date type then user can use this
   * prop to format the date
   * refer to https://github.com/d3/d3-time-format for string values
   * @default '%b/%d'
   */
  xAxisDateFormatString?: string;
  /**
   * date formatter of y axis,
   * if the y-axis data point are or date type then user can use this
   * prop to format the date
   * refer to https://github.com/d3/d3-time-format for string values
   * @default '%b/%d'
   */
  yAxisDateFormatString?: string;
  /**
   * number formatter of x axis
   * if the x-axis data pints are of number type then user can
   * use this prop to format the number
   * refer to https://github.com/d3/d3-format for string values
   * @default '.2~s'
   */
  xAxisNumberFormatString?: string;
  /**
   * number formatter of y axis
   * if the y-axis data pints are of number type then user can
   * use this prop to format the number
   * refer to https://github.com/d3/d3-format for string values
   * @default '.2~s'
   */
  yAxisNumberFormatString?: string;
  /**
   * string formatter for x-axis.
   * This prop only applies if the x-axis is of string type
   *
   * For the accessiblity reason we sort the x-axis data point given by the consumer in ascending
   * order and then render in the x-axis. this behaviour would force the order of the data points.
   * to overcome , user can give x-axis point names as p1 p2...etc and map those p1 and p2 to custom name.
   * behind the scene the charting will actually sort the p1 and p2 and then we can attach the custom
   * name to that point by using this prop, hence giving the us the flexiblity of the order in which
   * label should render
   *
   * see the example file for the usage of the prop
   */
  xAxisStringFormatter?: (point: string) => string;

  /**
   * string formatter for y-axis.
   * This prop only applies if the y-axis is of string type
   *
   * For the accessiblity reason we sort the x-axis data point given by the consumer in ascending
   * order and then render in the y-axis. this behaviour would force the order of the data points.
   * to overcome , user can give y-axis point names as p1 p2...etc and map those p1 and p2 to custom name.
   * behind the scene the charting will actually sort the p1 and p2 and then we can attach the custom
   * name to that point by using this prop, hence giving the us the flexiblity of the order in which
   * label should render
   *
   * see the exaple file for the usage of the prop
   */
  yAxisStringFormatter?: (point: string) => string;
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: HeatMapChartStyles;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   *@default false
   *Used for showing complete y axis lables   */
  showYAxisLables?: boolean;

  /**
   * @default alphabetical
   * The prop used to decide order of string axis labels */
  sortOrder?: 'none' | 'alphabetical';

  /**
   *@default false
   *Used for to elipse y axis labes and show tooltip on x axis labels
   */
  showYAxisLablesTooltip?: boolean;
}

/**
 * Heat Map Chart styles
 * {@docCategory HeatMapChart}
 */
export interface HeatMapChartStyles extends CartesianChartStyles {
  root?: string;
  text?: string;
  calloutContentRoot?: string;
}
