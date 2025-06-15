/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import type { Data, PlotData, PlotlySchema, OutputChartType } from '@fluentui/chart-utilities';
import {
  decodeBase64Fields,
  isArrayOrTypedArray,
  isDateArray,
  isMonthArray,
  isNumberArray,
  isYearArray,
  mapFluentChart,
  sanitizeJson,
} from '@fluentui/chart-utilities';
import { tokens } from '@fluentui/react-theme';
import { ThemeContext_unstable as V9ThemeContext } from '@fluentui/react-shared-contexts';
import { Theme, webLightTheme } from '@fluentui/tokens';
import * as d3Color from 'd3-color';

import {
  correctYearMonth,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
} from './PlotlySchemaAdapter';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { LineChart, LineChartProps } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart, AreaChartProps } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { ImageExportOptions, toImage } from './imageExporter';
import { Chart } from '../../types/index';
import { ScatterChart } from '../ScatterChart/index';

import { withResponsiveContainer } from '../ResponsiveContainer/withResponsiveContainer';

const ResponsiveDonutChart = withResponsiveContainer(DonutChart);
const ResponsiveVerticalStackedBarChart = withResponsiveContainer(VerticalStackedBarChart);
const ResponsiveLineChart = withResponsiveContainer(LineChart);
const ResponsiveHorizontalBarChartWithAxis = withResponsiveContainer(HorizontalBarChartWithAxis);
const ResponsiveAreaChart = withResponsiveContainer(AreaChart);
const ResponsiveHeatMapChart = withResponsiveContainer(HeatMapChart);
const ResponsiveSankeyChart = withResponsiveContainer(SankeyChart);
const ResponsiveGaugeChart = withResponsiveContainer(GaugeChart);
const ResponsiveGroupedVerticalBarChart = withResponsiveContainer(GroupedVerticalBarChart);
const ResponsiveVerticalBarChart = withResponsiveContainer(VerticalBarChart);
const ResponsiveScatterChart = withResponsiveContainer(ScatterChart);

/**
 * DeclarativeChart schema.
 * {@docCategory DeclarativeChart}
 */
export interface Schema {
  /**
   * Plotly schema represented as JSON object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  /**
   * Optional callback to access the IDeclarativeChart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<IDeclarativeChart>;
}

/**
 * {@docCategory DeclarativeChart}
 */
export interface IDeclarativeChart {
  exportAsImage: (opts?: ImageExportOptions) => Promise<string>;
}

const useColorMapping = () => {
  const colorMap = React.useRef(new Map<string, string>());
  return colorMap;
};

const useIsDarkTheme = (): boolean => {
  const parentV9Theme = React.useContext(V9ThemeContext) as Theme;
  const v9Theme: Theme = parentV9Theme ? parentV9Theme : webLightTheme;

  // Get background and foreground colors
  const backgroundColor = d3Color.hsl(v9Theme.colorNeutralBackground1);
  const foregroundColor = d3Color.hsl(v9Theme.colorNeutralForeground1);

  const isDarkTheme = backgroundColor.l < foregroundColor.l;

  return isDarkTheme;
};

/**
 * DeclarativeChart component.
 * {@docCategory DeclarativeChart}
 */
export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>((props, forwardedRef) => {
  const { plotlySchema } = sanitizeJson(props.chartSchema);
  const chart: OutputChartType = mapFluentChart(plotlySchema);
  if (!chart.isValid) {
    throw new Error(`Invalid chart schema: ${chart.errorMessage}`);
  }
  let plotlyInput = plotlySchema as PlotlySchema;
  try {
    plotlyInput = decodeBase64Fields(plotlyInput);
  } catch (error) {
    throw new Error(`Failed to decode plotly schema: ${error}`);
  }
  const plotlyInputWithValidData: PlotlySchema = {
    ...plotlyInput,
    data: chart.validTracesInfo!.map(trace => plotlyInput.data[trace[0]]),
  };

  let { selectedLegends } = plotlySchema;
  const colorMap = useColorMapping();
  const isDarkTheme = useIsDarkTheme();
  const chartRef = React.useRef<Chart>(null);

  if (!isArrayOrTypedArray(selectedLegends)) {
    selectedLegends = [];
  }

  const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends);
  const onActiveLegendsChange = (keys: string[]) => {
    setActiveLegends(keys);
    if (props.onSchemaChange) {
      props.onSchemaChange({ plotlySchema: { plotlyInput, selectedLegends: keys } });
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { plotlySchema } = sanitizeJson(props.chartSchema);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { selectedLegends } = plotlySchema;
    setActiveLegends(selectedLegends ?? []);
  }, [props.chartSchema]);

  const multiSelectLegendProps = {
    canSelectMultipleLegends: true,
    onChange: onActiveLegendsChange,
    selectedLegends: activeLegends,
  };

  const commonProps = {
    legendProps: multiSelectLegendProps,
    componentRef: chartRef,
  };

  const renderLineAreaScatter = (plotlyData: Data[], isAreaChart: boolean): JSX.Element => {
    const isScatterMarkers = (plotlyData[0] as PlotData)?.mode === 'markers';
    const chartProps: LineChartProps | AreaChartProps = {
      ...transformPlotlyJsonToScatterChartProps(
        { data: plotlyData, layout: plotlyInput.layout },
        isAreaChart,
        colorMap,
        isDarkTheme,
      ),
      ...commonProps,
    };
    if (isAreaChart) {
      return <ResponsiveAreaChart {...chartProps} />;
    }
    if (isScatterMarkers) {
      return <ResponsiveScatterChart {...chartProps} />;
    }
    return <ResponsiveLineChart {...chartProps} />;
  };

  const checkAndRenderChart = (isAreaChart: boolean = false) => {
    let fallbackVSBC = false;
    const xValues = (plotlyInputWithValidData.data[0] as PlotData).x;
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const isXMonth = isMonthArray(xValues);

    // Consider year as categorical variable not numeric continuous variable
    // Also year is not considered a date variable as it is represented as a point
    // in time and brings additional complexity of handling timezone and locale
    // formatting given the current design of the charting library
    const isXYear = isYearArray(xValues);

    if ((isXDate || isXNumber) && !isXYear) {
      return renderLineAreaScatter(plotlyInputWithValidData.data, isAreaChart);
    } else if (isXMonth) {
      const updatedData = plotlyInputWithValidData.data.map((dataPoint: PlotData) => ({
        ...dataPoint,
        x: correctYearMonth(dataPoint.x),
      }));
      return renderLineAreaScatter(updatedData, isAreaChart);
    }
    // Unsupported schema, render as VerticalStackedBarChart
    fallbackVSBC = true;
    return (
      <ResponsiveVerticalStackedBarChart
        {...transformPlotlyJsonToVSBCProps(plotlyInputWithValidData, colorMap, isDarkTheme, fallbackVSBC)}
        {...commonProps}
      />
    );
  };

  // TODO
  const exportAsImage = React.useCallback((opts?: ImageExportOptions) => {
    return toImage(chartRef.current?.chartContainer, {
      background: tokens.colorNeutralBackground1,
      scale: 5,
      ...opts,
    });
  }, []);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      exportAsImage,
    }),
    [exportAsImage],
  );

  switch (chart.type) {
    case 'donut':
      return (
        <ResponsiveDonutChart
          {...transformPlotlyJsonToDonutProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'horizontalbar':
      return (
        <ResponsiveHorizontalBarChartWithAxis
          {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'groupedverticalbar':
      return (
        <ResponsiveGroupedVerticalBarChart
          {...transformPlotlyJsonToGVBCProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'verticalstackedbar':
      return (
        <ResponsiveVerticalStackedBarChart
          {...transformPlotlyJsonToVSBCProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'heatmap':
      return (
        <ResponsiveHeatMapChart
          {...transformPlotlyJsonToHeatmapProps(plotlyInputWithValidData)}
          {...commonProps}
          legendProps={{}}
        />
      );
    case 'sankey':
      return (
        <ResponsiveSankeyChart
          {...transformPlotlyJsonToSankeyProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'gauge':
      return (
        <ResponsiveGaugeChart
          {...transformPlotlyJsonToGaugeProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'verticalbar':
      return (
        <ResponsiveVerticalBarChart
          {...transformPlotlyJsonToVBCProps(plotlyInputWithValidData, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    // TODO: Add 'scatter' as a separate chart type
    case 'area':
    case 'line':
    case 'fallback':
      // Need recheck for area chart as we don't have ability to check for valid months in previous step
      const isAreaChart = plotlyInputWithValidData.data.some(
        (series: PlotData) => series.fill === 'tonexty' || series.fill === 'tozeroy' || !!series.stackgroup,
      );
      return checkAndRenderChart(isAreaChart);
    default:
      throw new Error(`Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}`);
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
