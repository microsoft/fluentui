/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { IRefObject } from '@fluentui/react/lib/Utilities';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import type { Data, PlotData, PlotlySchema, OutputChartType } from '@fluentui/chart-utilities';
import {
  isArrayOrTypedArray,
  isDateArray,
  isNumberArray,
  mapFluentChart,
  sanitizeJson,
} from '@fluentui/chart-utilities';

import {
  isMonthArray,
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
import { LineChart, ILineChartProps } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart, IAreaChartProps } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { IChart, IImageExportOptions } from '../../types/index';
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
  componentRef?: IRefObject<IDeclarativeChart>;
}

/**
 * {@docCategory DeclarativeChart}
 */
export interface IDeclarativeChart {
  exportAsImage: (opts?: IImageExportOptions) => Promise<string>;
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
  const { plotlySchema } = sanitizeJson(props.chartSchema);
  const chart: OutputChartType = mapFluentChart(plotlySchema);
  if (!chart.isValid) {
    throw new Error(`Invalid chart schema: ${chart.errorMessage}`);
  }
  const plotlyInput = plotlySchema as PlotlySchema;

  let { selectedLegends } = plotlySchema;
  const colorMap = useColorMapping();
  const theme = useTheme();
  const isDarkTheme = theme?.isInverted ?? false;
  const chartRef = React.useRef<IChart>(null);

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
    calloutProps: { layerProps: { eventBubblingEnabled: true } },
  };

  const renderLineArea = (plotlyData: Data[], isAreaChart: boolean): JSX.Element => {
    const isScatterMarkers = (plotlyData[0] as PlotData)?.mode?.includes('markers');
    const chartProps: ILineChartProps | IAreaChartProps = {
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
    return <ResponsiveLineChart {...chartProps} lineMode={isScatterMarkers ? 'scatter' : 'default'} />;
  };

  const checkAndRenderChart = (isAreaChart: boolean = false) => {
    let fallbackVSBC = false;
    const xValues = (plotlyInput.data[0] as PlotData).x;
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const isXMonth = isMonthArray(xValues);
    if (isXDate || isXNumber) {
      return renderLineArea(plotlyInput.data, isAreaChart);
    } else if (isXMonth) {
      const updatedData = plotlyInput.data.map((dataPoint: PlotData) => ({
        ...dataPoint,
        x: correctYearMonth(dataPoint.x),
      }));
      return renderLineArea(updatedData, isAreaChart);
    }
    // Unsupported schema, render as VerticalStackedBarChart
    fallbackVSBC = true;
    return (
      <ResponsiveVerticalStackedBarChart
        {...transformPlotlyJsonToVSBCProps(plotlyInput, colorMap, isDarkTheme, fallbackVSBC)}
        {...commonProps}
      />
    );
  };

  const exportAsImage = React.useCallback(
    (opts?: IImageExportOptions): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!chartRef.current || typeof chartRef.current.toImage !== 'function') {
          return reject(Error('Chart cannot be exported as image'));
        }

        chartRef.current
          .toImage({
            background: theme.semanticColors.bodyBackground,
            scale: 5,
            ...opts,
          })
          .then(resolve)
          .catch(reject);
      });
    },
    [theme],
  );

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
          {...transformPlotlyJsonToDonutProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'horizontalbar':
      return (
        <ResponsiveHorizontalBarChartWithAxis
          {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'groupedverticalbar':
      return (
        <ResponsiveGroupedVerticalBarChart
          {...transformPlotlyJsonToGVBCProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'verticalstackedbar':
      return (
        <ResponsiveVerticalStackedBarChart
          {...transformPlotlyJsonToVSBCProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'heatmap':
      return (
        <ResponsiveHeatMapChart {...transformPlotlyJsonToHeatmapProps(plotlyInput)} {...commonProps} legendProps={{}} />
      );
    case 'sankey':
      return (
        <ResponsiveSankeyChart
          {...transformPlotlyJsonToSankeyProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'gauge':
      return (
        <ResponsiveGaugeChart
          {...transformPlotlyJsonToGaugeProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'verticalbar':
      return (
        <ResponsiveVerticalBarChart
          {...transformPlotlyJsonToVBCProps(plotlyInput, colorMap, isDarkTheme)}
          {...commonProps}
        />
      );
    case 'area':
    case 'line':
    case 'fallback':
      return checkAndRenderChart(chart.type === 'area');
    default:
      throw new Error(`Unsupported chart type :${plotlyInput.data[0]?.type}`);
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
