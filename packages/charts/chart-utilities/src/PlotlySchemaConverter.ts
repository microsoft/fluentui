import type { Datum, TypedArray, PlotData, PlotlySchema } from './PlotlySchema';

const SUPPORTED_PLOT_TYPES = ['pie', 'bar', 'scatter', 'heatmap', 'sankey', 'indicator', 'gauge', 'histogram'];

/* eslint-disable @typescript-eslint/no-explicit-any */
const isDate = (value: any): boolean => {
  const parsedDate = new Date(Date.parse(value));
  if (isNaN(parsedDate.getTime())) {
    return false;
  }
  const parsedYear = parsedDate.getFullYear();
  const yearInString = /\b\d{4}\b/.test(value);
  if (!yearInString && (parsedYear === 2000 || parsedYear === 2001)) {
    return false;
  }
  return true;
};

const isNumber = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);

const isArrayOfType = (
  plotCoordinates: Datum[] | Datum[][] | TypedArray | undefined,
  typeCheck: (datum: any, ...args: any[]) => boolean,
  ...args: any[]
): boolean => {
  if (!isArrayOrTypedArray(plotCoordinates)) {
    return false;
  }

  if (plotCoordinates!.length === 0) {
    return false;
  }

  if (Array.isArray(plotCoordinates![0])) {
    // Handle 2D array
    return (plotCoordinates as Datum[][]).every(innerArray => innerArray.every(datum => typeCheck(datum, ...args)));
  } else {
    // Handle 1D array
    return (plotCoordinates as Datum[]).every(datum => typeCheck(datum, ...args));
  }
};

export const isDateArray = (data: Datum[] | Datum[][] | TypedArray): boolean => {
  return isArrayOfType(data, isDate);
};

export const isNumberArray = (data: Datum[] | Datum[][] | TypedArray): boolean => {
  return isArrayOfType(data, isNumber);
};

export const isLineData = (data: Partial<PlotData>): boolean => {
  return (
    !SUPPORTED_PLOT_TYPES.includes(`${data.type}`) &&
    Array.isArray(data.x) &&
    isArrayOfType(data.y, (value: any) => typeof value === 'number') &&
    data.x.length > 0 &&
    data.x.length === data.y!.length
  );
};

export const invalidate2Dseries = (series: PlotData, chartType: string): void => {
  if (series.x?.length > 0 && Array.isArray(series.x[0])) {
    throw new Error(`transform to ${chartType}:: 2D x array not supported`);
  }
  if (series.y?.length > 0 && Array.isArray(series.y[0])) {
    throw new Error(`transform to ${chartType}:: 2D y array not supported`);
  }
};

export const getValidSchema = (input: any): PlotlySchema => {
  return input as PlotlySchema;
};

const validateDatapointsInternal = (plotlyData: PlotlySchema) => {
  let fallbackVSBC = false;
  const xValues = (plotlyData.data[0] as PlotData).x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);
  const isXMonth = isMonthArray(xValues);
  if (isXDate || isXNumber) {
    return true;
  } else if (isXMonth) {
    return true;
  }

  fallbackVSBC = true;
  return true;
  // return (
  // <ResponsiveVerticalStackedBarChart
  //   {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme, fallbackVSBC)}
  //   {...commonProps}
  // />
  // );
};

export const isSchemaSupported = (input: any): boolean => {
  const validSchema: PlotlySchema = getValidSchema(input);
  switch (validSchema.data[0].type) {
    case 'pie':
      return true;
    case 'bar':
      const orientation = validSchema.data[0].orientation;
      if (orientation === 'h' && isNumberArray((validSchema.data[0] as PlotData).x)) {
        return true;
      } else {
        const containsLines = validSchema.data.some(
          series => series.type === 'scatter' || isLineData(series as Partial<PlotData>),
        );
        if (['group', 'overlay'].includes(validSchema?.layout?.barmode!) && !containsLines) {
          return true;
        }
        return true;
      }
    case 'scatter':
      if (validSchema.data[0].mode === 'markers') {
        return false;
      }
      const isAreaChart = validSchema.data.some(
        (series: PlotData) => series.fill === 'tonexty' || series.fill === 'tozeroy',
      );

      return validateDatapointsInternal(validSchema);
    case 'heatmap':
      return true;
    case 'sankey':
      return true;
    case 'indicator':
    case 'gauge':
      if (validSchema.data?.[0]?.mode?.includes('gauge') || validSchema.data?.[0]?.type === 'gauge') {
        return true;
      }
      return false;
    case 'histogram':
      return true;
    default:
      const xValues = (validSchema.data[0] as PlotData).x;
      const yValues = (validSchema.data[0] as PlotData).y;
      if (xValues && yValues && xValues.length > 0 && yValues.length > 0) {
        return validateDatapointsInternal(validSchema);
      }
      return false;
  }
};

const MAX_DEPTH = 15;
export const sanitizeJson = (jsonObject: any, depth: number = 0): any => {
  if (depth > MAX_DEPTH) {
    throw new Error('Maximum json depth exceeded');
  }

  if (typeof jsonObject === 'object' && jsonObject !== null) {
    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        if (typeof jsonObject[key] === 'string') {
          jsonObject[key] = jsonObject[key].replace(/</g, '&lt;').replace(/>/g, '&gt;');
        } else {
          jsonObject[key] = sanitizeJson(jsonObject[key], depth + 1);
        }
      }
    }
  }

  return jsonObject;
};

function isTypedArray(a: any) {
  return ArrayBuffer.isView(a) && !(a instanceof DataView);
}

export function isArrayOrTypedArray(a: any) {
  return Array.isArray(a) || isTypedArray(a);
}
