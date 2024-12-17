/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  isDateArray,
  isNumberArray,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
} from './PlotlySchemaAdapter';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { useTheme } from '@fluentui/react/lib/Theme';

export const UseIsDarkTheme = (): boolean => {
  const theme = useTheme();
  return theme?.isInverted ?? false;
};

/**
 * DeclarativeChart schema.
 * {@docCategory DeclarativeChart}
 */
export interface Schema {
  /**
   * Plotly schema represented as JSON object
   */
  plotlySchema: any;
}

/**
 * DeclarativeChart props.
 * {@docCategory DeclarativeChart}
 */
export interface DeclarativeChartProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * The schema representing the chart data, layout and configuration
   */
  chartSchema: Schema;

  /**
   * Callback when an event occurs
   */
  onSchemaChange?: (eventData: Schema) => void;
}

const useColorMapping = () => {
  const colorMap = React.useRef(new Map<string, string>());
  return colorMap;
};

/**
 * DeclarativeChart component.
 * {@docCategory DeclarativeChart}
 */
export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>((props, forwardedRef) => {
  const { plotlySchema } = props.chartSchema;
  const { data, layout, selectedLegends } = plotlySchema;
  const xValues = data[0].x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);
  const colorMap = useColorMapping();
  const isDarkTheme = UseIsDarkTheme();

  const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends ?? []);
  const onActiveLegendsChange = (keys: string[]) => {
    setActiveLegends(keys);
    if (props.onSchemaChange) {
      props.onSchemaChange({ plotlySchema: { data, layout, selectedLegends: keys } });
    }
  };

  const legendProps = {
    canSelectMultipleLegends: false,
    onChange: onActiveLegendsChange,
    ...(activeLegends.length > 0 && { selectedLegend: activeLegends[0] }),
  };

  switch (data[0].type) {
    case 'pie':
      return (
        <DonutChart
          {...transformPlotlyJsonToDonutProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={legendProps}
        />
      );
    case 'bar':
      const orientation = data[0].orientation;
      if (orientation === 'h') {
        return (
          <HorizontalBarChartWithAxis
            {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={legendProps}
          />
        );
      } else {
        if (['group', 'overlay'].includes(plotlySchema?.layout?.barmode)) {
          return (
            <GroupedVerticalBarChart
              {...transformPlotlyJsonToGVBCProps(plotlySchema, colorMap, isDarkTheme)}
              legendProps={legendProps}
            />
          );
        }
        return (
          <VerticalStackedBarChart
            {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={legendProps}
          />
        );
      }
    case 'scatter':
      const isAreaChart = data.some((series: any) => series.fill === 'tonexty');
      if (isXDate || isXNumber) {
        if (isAreaChart) {
          return (
            <AreaChart
              {...transformPlotlyJsonToScatterChartProps({ data, layout }, true, colorMap, isDarkTheme)}
              legendProps={legendProps}
            />
          );
        }
        return (
          <LineChart
            {...transformPlotlyJsonToScatterChartProps({ data, layout }, false, colorMap, isDarkTheme)}
            legendProps={legendProps}
          />
        );
      }
      return (
        <VerticalStackedBarChart
          {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={legendProps}
        />
      );
    case 'heatmap':
      return <HeatMapChart {...transformPlotlyJsonToHeatmapProps(plotlySchema)} legendProps={legendProps} />;
    case 'sankey':
      return <SankeyChart {...transformPlotlyJsonToSankeyProps(plotlySchema, colorMap, isDarkTheme)} />;
    case 'indicator':
      if (data?.[0]?.mode?.includes('gauge')) {
        return (
          <GaugeChart
            {...transformPlotlyJsonToGaugeProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={legendProps}
          />
        );
      }
      return <div>Unsupported Schema</div>;
    case 'histogram':
      return (
        <VerticalBarChart
          {...transformPlotlyJsonToVBCProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={legendProps}
        />
      );
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
