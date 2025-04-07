/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import type { PlotData, PlotlySchema, OutputChartType } from '@fluentui/chart-utilities';
import {
  decodeBase64Fields,
  isArrayOrTypedArray,
  isDateArray,
  isNumberArray,
  mapFluentChart,
  sanitizeJson,
} from '@fluentui/chart-utilities';
import {
  isMonthArray,
  updateXValues,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToVBCProps,
} from './PlotlySchemaAdapter';
import { LineChart, LineChartProps } from '../LineChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { ImageExportOptions, toImage } from './imageExporter';
import { Chart } from '../../types/index';
import { tokens } from '@fluentui/react-theme';

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
  const isDarkTheme = false;
  const chartRef = React.useRef<Chart>(null);

  if (!isArrayOrTypedArray(selectedLegends)) {
    selectedLegends = [];
  }

  const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends);
  const onActiveLegendsChange = (keys: string[]) => {
    setActiveLegends(keys);
    if (props.onSchemaChange) {
      props.onSchemaChange({ plotlySchema: { plotlyInputWithValidData, selectedLegends: keys } });
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

  const checkAndRenderChart = (
    renderChartJsx: (chartProps: LineChartProps) => JSX.Element,
    isAreaChart: boolean = false,
  ) => {
    const xValues = (plotlyInputWithValidData.data[0] as PlotData).x;
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const isXMonth = isMonthArray(xValues);
    if (isXDate || isXNumber) {
      const chartProps: LineChartProps = {
        ...transformPlotlyJsonToScatterChartProps(
          { data: plotlyInputWithValidData.data, layout: plotlyInputWithValidData.layout },
          isAreaChart,
          colorMap,
          isDarkTheme,
        ),
        ...commonProps,
      };
      return renderChartJsx(chartProps);
    } else if (isXMonth) {
      const updatedData = plotlyInputWithValidData.data.map((dataPoint: PlotData) => ({
        ...dataPoint,
        x: updateXValues(dataPoint.x),
      }));
      const chartProps: LineChartProps = {
        ...transformPlotlyJsonToScatterChartProps(
          { data: updatedData, layout: plotlyInputWithValidData.layout },
          isAreaChart,
          colorMap,
          isDarkTheme,
        ),
        ...commonProps,
      };
      return renderChartJsx(chartProps);
    }
    throw new Error(`Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}`);
  };

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

  switch (plotlyInputWithValidData.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(plotlySchema, colorMap, isDarkTheme)} {...commonProps} />;
    case 'bar':
      throw new Error(`Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}`);
    case 'scatter':
      if (plotlyInputWithValidData.data[0].mode === 'markers') {
        throw new Error(
          `Unsupported chart - type :${plotlyInputWithValidData.data[0]?.type}, mode: ${plotlyInputWithValidData.data[0]?.mode}`,
        );
      }
      const isAreaChart = plotlyInputWithValidData.data.some(
        (series: PlotData) => series.fill === 'tonexty' || series.fill === 'tozeroy',
      );
      const renderChartJsx = (chartProps: LineChartProps) => {
        if (isAreaChart) {
          throw new Error(
            `Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}, fill: ${
              (plotlyInputWithValidData.data[0] as Partial<PlotData>)?.fill
            }`,
          );
        }
        return <LineChart {...chartProps} />;
      };
      return checkAndRenderChart(renderChartJsx, isAreaChart);
    case 'heatmap':
      throw new Error(`Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}`);
    case 'sankey':
      throw new Error(`Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}`);
    case 'indicator':
    case 'gauge':
      throw new Error(
        `Unsupported chart - type: ${plotlyInputWithValidData.data[0]?.type}, mode: ${plotlyInputWithValidData.data[0]?.mode}`,
      );
    case 'histogram':
      return (
        <VerticalBarChart {...transformPlotlyJsonToVBCProps(plotlySchema, colorMap, isDarkTheme)} {...commonProps} />
      );
    case 'contour':
      throw new Error(`Unsupported chart - type: ${plotlyInputWithValidData.data[0]?.type}`);
    default:
      const xValues = (plotlyInputWithValidData.data[0] as PlotData).x;
      const yValues = (plotlyInputWithValidData.data[0] as PlotData).y;
      if (xValues && yValues && xValues.length > 0 && yValues.length > 0) {
        const renderLineChartJsx = (chartProps: LineChartProps) => {
          return <LineChart {...chartProps} />;
        };
        return checkAndRenderChart(renderLineChartJsx);
      }
      throw new Error(`Unsupported chart type :${plotlyInputWithValidData.data[0]?.type}`);
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
