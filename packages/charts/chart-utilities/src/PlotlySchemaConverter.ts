import type { Datum, TypedArray, PlotData, PlotlySchema, Data } from './PlotlySchema';
import { decodeBase64Fields } from './DecodeBase64Data';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OutputChartType {
  isValid: boolean;
  errorMessage?: string;
  type?: string;
  /**
   * Array of [index, chartType] pairs
   */
  validTracesInfo?: [number, string][];
}

const SUPPORTED_PLOT_TYPES = [
  'pie',
  'bar',
  'scatter',
  'heatmap',
  'sankey',
  'indicator',
  'gauge',
  'histogram',
  'histogram2d',
];

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

export const isDateArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
  return isArrayOfType(data, isDate);
};

export const isNumberArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
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

export const validate2Dseries = (series: Partial<PlotData>): boolean => {
  if (Array.isArray(series.x) && series.x.length > 0 && Array.isArray(series.x[0])) {
    return false;
  }
  if (Array.isArray(series.y) && series.y.length > 0 && Array.isArray(series.y[0])) {
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

const validateSeriesData = (series: Partial<PlotData>, validateNumericY: boolean) => {
  if (!validate2Dseries(series)) {
    throw new Error(`Invalid 2D series encountered.`);
  }
  if (validateNumericY && !isNumberArray(series.y)) {
    throw new Error(`Non numeric Y values encountered.`);
  }
};

const validateBarData = (data: Partial<PlotData>) => {
  if (data.orientation === 'h' && data.base !== undefined) {
    throw new Error('Unsupported chart type: Gantt');
  } else if (data.orientation === 'h' && isNumberArray(data.x)) {
    validateSeriesData(data, false);
  } else {
    validateSeriesData(data, true);
  }
};

const validateScatterData = (data: Partial<PlotData>) => {
  if (data.mode === 'markers' && !isNumberArray(data.x)) {
    throw new Error(`Unsupported chart - type :${data.type}, mode: ${data.mode}, xAxisType: String or Date`);
  } else {
    validateSeriesData(data, true);
  }
};

const DATA_VALIDATORS_MAP: Record<string, ((data: Data) => void)[]> = {
  indicator: [
    data => {
      if (!(data as Partial<PlotData>).mode?.includes('gauge')) {
        throw new Error(`Unsupported chart - type: ${data.type}, mode: ${(data as Partial<PlotData>).mode}`);
      }
    },
  ],
  histogram: [data => validateSeriesData(data as Partial<PlotData>, false)],
  contour: [
    data => {
      throw new Error(`Unsupported chart - type :${data.type}`);
    },
  ],
  bar: [data => validateBarData(data as Partial<PlotData>)],
  scatter: [data => validateScatterData(data as Partial<PlotData>)],
};

const DEFAULT_CHART_TYPE = '';
const getValidTraces = (dataArr: Data[]) => {
  const errorMessages: string[] = [];
  const validTraces = dataArr
    .map((data, index): [number, string] => {
      let type = data.type;
      if (isLineData(data as Partial<PlotData>)) {
        type = 'scatter';
      }

      if (type && DATA_VALIDATORS_MAP[type]) {
        const validators = DATA_VALIDATORS_MAP[type];
        for (const validator of validators) {
          try {
            validator(data);
          } catch (error) {
            errorMessages.push(`data[${index}]: ${error}`);
            return [-1, DEFAULT_CHART_TYPE];
          }
        }
      }

      return [index, DEFAULT_CHART_TYPE];
    })
    .filter(trace => trace[0] >= 0);

  if (validTraces.length === 0) {
    throw new Error(errorMessages.join('; '));
  }

  return validTraces;
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

    const validTraces = getValidTraces(validSchema.data);
    const firstData = validSchema.data[validTraces[0][0]];

    switch (firstData.type) {
      case 'pie':
        return { isValid: true, type: 'donut', validTracesInfo: validTraces };
      case 'histogram2d':
      case 'heatmap':
        return { isValid: true, type: 'heatmap', validTracesInfo: validTraces };
      case 'sankey':
        return { isValid: true, type: 'sankey', validTracesInfo: validTraces };
      case 'indicator':
      case 'gauge':
        return { isValid: true, type: 'gauge', validTracesInfo: validTraces };
      case 'histogram':
        return { isValid: true, type: 'verticalbar', validTracesInfo: validTraces };
      default:
        const containsBars = validTraces.some(trace => validSchema.data[trace[0]].type === 'bar');
        const containsLines = validTraces.some(
          trace =>
            validSchema.data[trace[0]].type === 'scatter' ||
            isLineData(validSchema.data[trace[0]] as Partial<PlotData>),
        );
        if (containsBars && containsLines) {
          return { isValid: true, type: 'verticalstackedbar', validTracesInfo: validTraces };
        }
        if (containsBars) {
          const firstBarData = firstData as Partial<PlotData>;
          if (firstBarData.orientation === 'h' && isNumberArray(firstBarData.x)) {
            return { isValid: true, type: 'horizontalbar', validTracesInfo: validTraces };
          } else {
            if (['group', 'overlay'].includes(validSchema?.layout?.barmode!)) {
              return { isValid: true, type: 'groupedverticalbar', validTracesInfo: validTraces };
            }
            return { isValid: true, type: 'verticalstackedbar', validTracesInfo: validTraces };
          }
        }
        if (containsLines) {
          const firstScatterData = firstData as Partial<PlotData>;
          const isAreaChart = validTraces.some(trace => {
            const scatterData = validSchema.data[trace[0]] as Partial<PlotData>;
            return scatterData.fill === 'tonexty' || scatterData.fill === 'tozeroy' || !!scatterData.stackgroup;
          });
          const isXDate = isDateArray(firstScatterData.x);
          const isXNumber = isNumberArray(firstScatterData.x);
          if (isXDate || isXNumber) {
            return { isValid: true, type: isAreaChart ? 'area' : 'line', validTracesInfo: validTraces };
          }
          return { isValid: true, type: 'fallback', validTracesInfo: validTraces };
        }

        return { isValid: false, errorMessage: `Unsupported chart - type :${firstData.type}}` };
    }
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid plotly schema: ${error}` };
  }
};
