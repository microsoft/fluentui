/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToColumnProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  isDateArray,
  isNumberArray,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
} from './PlotlySchemaAdapter';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { color as d3Color } from 'd3-color';
import { DataVizPalette, getNextColor } from '../../utilities/colors';

/**
 * DeclarativeChart props.
 * {@docCategory DeclarativeChart}
 */
export interface DeclarativeChartProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * The schema representing the chart
   */
  chartSchema: any;
}

const useColorMapping = () => {
  const colorMapping = React.useRef(new Map<string, string>());
  const colorIndex = React.useRef(0);

  const totalColors = Object.keys(DataVizPalette).length;

  const getColor = (colorString: string): string => {
    if (colorString === '') {
      const nextColor = getNextColor(colorIndex.current % totalColors);
      colorIndex.current += 1;
      return nextColor;
    }
    const d3ColorObj = d3Color(colorString);
    const hexColor = d3ColorObj ? d3ColorObj.formatHex() : colorString;

    if (!colorMapping.current.has(hexColor)) {
      const nextColor = getNextColor(colorIndex.current % totalColors);
      colorMapping.current.set(hexColor, nextColor);
      colorIndex.current += 1;
      return nextColor;
    }

    return colorMapping.current.get(hexColor) as string;
  };

  return getColor;
};

/**
 * DeclarativeChart component.
 * {@docCategory DeclarativeChart}
 */
export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>((props, forwardedRef) => {
  const getColor = useColorMapping();
  const xValues = props.chartSchema.data[0].x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);

  switch (props.chartSchema.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(props.chartSchema, getColor)} />;
    case 'bar':
      const orientation = props.chartSchema.data[0].orientation;
      if (orientation === 'h') {
        return (
          <HorizontalBarChartWithAxis
            {...transformPlotlyJsonToHorizontalBarWithAxisProps(props.chartSchema, getColor)}
          />
        );
      } else {
        return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(props.chartSchema, getColor)} />;
      }
    case 'scatter':
      const isAreaChart = props.chartSchema.data.some((series: any) => series.fill === 'tonexty');
      if (isXDate || isXNumber) {
        if (isAreaChart) {
          return <AreaChart {...transformPlotlyJsonToScatterChartProps(props.chartSchema, true, getColor)} />;
        }
        return <LineChart {...transformPlotlyJsonToScatterChartProps(props.chartSchema, false, getColor)} />;
      }
      return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(props.chartSchema, getColor)} />;
    case 'heatmap':
      return <HeatMapChart {...transformPlotlyJsonToHeatmapProps(props.chartSchema)} />;
    case 'sankey':
      return <SankeyChart {...transformPlotlyJsonToSankeyProps(props.chartSchema, getColor)} />;
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
