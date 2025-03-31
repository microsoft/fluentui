import type { Datum, TypedArray, PlotData, PlotlySchema } from './PlotlySchema';
import { decodeBase64Fields } from './DecodeBase64Data';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OutputChartType {
  isValid: boolean;
  errorMessage?: string;
  type?: string;
}

const SUPPORTED_PLOT_TYPES = ['pie', 'bar', 'scatter', 'heatmap', 'sankey', 'indicator', 'gauge', 'histogram'];

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDate = (value: any): boolean => {
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

export const isNumber = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);

export const isArrayOfType = (
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

export const validate2Dseries = (series: PlotData): boolean => {
  if (series.x?.length > 0 && Array.isArray(series.x[0])) {
    return false;
  }
  if (series.y?.length > 0 && Array.isArray(series.y[0])) {
    return false;
  }

  return true;
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

export function isTypedArray(a: any) {
  return ArrayBuffer.isView(a) && !(a instanceof DataView);
}

export function isArrayOrTypedArray(a: any) {
  return Array.isArray(a) || isTypedArray(a);
}

export const getValidSchema = (input: any): PlotlySchema => {
  try {
    const validatedSchema = input as PlotlySchema;
    if (!validatedSchema) {
      throw new Error('Plotly input is null or undefined');
    }
    if (!validatedSchema.data) {
      throw new Error('Plotly input data is null or undefined');
    }
    if (validatedSchema.data.length === 0) {
      throw new Error('Plotly input data is empty');
    }
    return validatedSchema;
  } catch (error) {
    throw new Error(`Invalid plotly schema: ${error}`);
  }
};

const validateDatapointsInternal = (plotlyData: PlotlySchema, isAreaChart: boolean): OutputChartType => {
  const xValues = (plotlyData.data[0] as PlotData).x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);
  if (isXDate || isXNumber) {
    return validateSeriesData(plotlyData, isAreaChart ? 'area' : 'line', false);
  }

  return validateSeriesData(plotlyData, 'fallback', true);
};

const validateSeriesData = (input: PlotlySchema, type: string, validateNumericY: boolean): OutputChartType => {
  for (let i = 0; i < input.data.length; i++) {
    const series = input.data[i] as PlotData;
    if (!validate2Dseries(series)) {
      return { isValid: false, errorMessage: `${type}. Invalid 2D series encountered.`, type };
    }
    if (validateNumericY && !isNumberArray(series.y)) {
      return { isValid: false, errorMessage: `${type}. Non numeric Y values encountered.`, type };
    }
  }
  return { isValid: true, type };
};

export const mapFluentChart = (input: any): OutputChartType => {
  try {
    sanitizeJson(input);
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid JSON: ${error}` };
  }

  try {
    let validSchema: PlotlySchema = getValidSchema(input);

    try {
      validSchema = decodeBase64Fields(validSchema);
    } catch (error) {
      return { isValid: false, errorMessage: `Failed to decode plotly schema: ${error}` };
    }

    switch (validSchema.data[0].type) {
      case 'pie':
        return { isValid: true, type: 'donut' };
      case 'bar':
        const orientation = validSchema.data[0].orientation;
        const containsBase = validSchema.data.some((series: PlotData) => series.base !== undefined);
        if (orientation === 'h' && containsBase) {
          return { isValid: false, errorMessage: 'Unsupported chart type: Gantt' };
        } else if (orientation === 'h' && isNumberArray((validSchema.data[0] as PlotData).x)) {
          return validateSeriesData(validSchema, 'horizontalbar', false);
        } else {
          const containsLines = validSchema.data.some(
            series => series.type === 'scatter' || isLineData(series as Partial<PlotData>),
          );
          if (['group', 'overlay'].includes(validSchema?.layout?.barmode!) && !containsLines) {
            return validateSeriesData(validSchema, 'groupedverticalbar', true);
          }
          return validateSeriesData(validSchema, 'verticalstackedbar', true);
        }
      case 'heatmap':
        return { isValid: true, type: 'heatmap' };
      case 'sankey':
        return { isValid: true, type: 'sankey' };
      case 'indicator':
      case 'gauge':
        if (validSchema.data?.[0]?.mode?.includes('gauge') || validSchema.data?.[0]?.type === 'gauge') {
          return { isValid: true, type: 'gauge' };
        }
        return {
          isValid: false,
          errorMessage: `Unsupported chart - type: ${validSchema.data[0]?.type}, mode: ${validSchema.data[0]?.mode}`,
        };
      case 'histogram':
        return validateSeriesData(validSchema, 'verticalbar', false);
      case 'scatter':
        if (validSchema.data[0]?.mode === 'markers' && !isNumberArray(validSchema.data[0].x!)) {
          return {
            isValid: false,
            errorMessage: `Unsupported chart - type :${validSchema.data[0]?.type}, mode: ${validSchema.data[0]?.mode}
           , xAxisType: String or Date`,
          };
        }
        const isAreaChart = validSchema.data.some(
          (series: PlotData) => series.fill === 'tonexty' || series.fill === 'tozeroy',
        );
        return validateDatapointsInternal(validSchema, isAreaChart);
      case 'contour':
        return {
          isValid: false,
          errorMessage: `Unsupported chart - type :${validSchema.data[0]?.type}`,
        };
      default:
        const xValues = (validSchema.data[0] as PlotData).x;
        const yValues = (validSchema.data[0] as PlotData).y;
        if (xValues && yValues && xValues.length > 0 && yValues.length > 0) {
          return validateDatapointsInternal(validSchema, false);
        }
        return {
          isValid: false,
          errorMessage: `Unsupported chart - type :${validSchema.data[0]?.type}}`,
        };
    }
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid plotly schema: ${error}` };
  }
};
