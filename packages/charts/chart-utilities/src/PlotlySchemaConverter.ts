import type { Datum, TypedArray, PlotData, PlotlySchema, Data } from './PlotlySchema';
import { decodeBase64Fields } from './DecodeBase64Data';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OutputChartType {
  isValid: boolean;
  errorMessage?: string;
  type?: string;
  validDataIndices?: number[];
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

const DATA_VALIDATORS_MAP: Record<string, ((data: Data) => void)[]> = {
  indicator: [
    (data: Partial<PlotData>) => {
      if (!data.mode?.includes('gauge')) {
        throw new Error(`Unsupported chart - type: ${data.type}, mode: ${data.mode}`);
      }
    },
  ],
  histogram: [(data: Partial<PlotData>) => validateSeriesData(data, false)],
  contour: [
    (data: Partial<PlotData>) => {
      throw new Error(`Unsupported chart - type :${data.type}`);
    },
  ],
  bar: [
    (data: Partial<PlotData>) => {
      if (data.orientation === 'h' && data.base !== undefined) {
        throw new Error('Unsupported chart type: Gantt');
      } else if (data.orientation === 'h' && isNumberArray(data.x)) {
        validateSeriesData(data, false);
      } else {
        validateSeriesData(data, true);
      }
    },
  ],
  scatter: [
    (data: Partial<PlotData>) => {
      if (data.mode === 'markers' && !isNumberArray(data.x)) {
        throw new Error(`Unsupported chart - type :${data.type}, mode: ${data.mode}, xAxisType: String or Date`);
      } else {
        validateSeriesData(data, true);
      }
    },
  ],
};

const getValidDataIndices = (dataArr: Data[]) => {
  let errorMessage: string | undefined;
  const validDataIndices = dataArr
    .map((data, index) => {
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
            errorMessage = `data[${index}]: ${error}`;
            return -1;
          }
        }
      }
      return index;
    })
    .filter(dataIdx => dataIdx >= 0);
  if (validDataIndices.length === 0) {
    throw new Error(errorMessage);
  }
  return validDataIndices;
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

    const validDataIndices = getValidDataIndices(validSchema.data);
    const firstData = validSchema.data[validDataIndices[0]];
    switch (firstData.type) {
      case 'pie':
        return { isValid: true, type: 'donut', validDataIndices };
      case 'heatmap':
        return { isValid: true, type: 'heatmap', validDataIndices };
      case 'sankey':
        return { isValid: true, type: 'sankey', validDataIndices };
      case 'indicator':
      case 'gauge':
        return { isValid: true, type: 'gauge', validDataIndices };
      case 'histogram':
        return { isValid: true, type: 'verticalbar', validDataIndices };
      default:
        const containsBars = validDataIndices.some(idx => validSchema.data[idx].type === 'bar');
        const containsLines = validDataIndices.some(
          idx => validSchema.data[idx].type === 'scatter' || isLineData(validSchema.data[idx] as Partial<PlotData>),
        );
        if (containsBars && containsLines) {
          return { isValid: true, type: 'verticalstackedbar', validDataIndices };
        }
        if (containsBars) {
          const barData = firstData as Partial<PlotData>;
          if (barData.orientation === 'h' && isNumberArray(barData.x)) {
            return { isValid: true, type: 'horizontalbar', validDataIndices };
          } else {
            if (['group', 'overlay'].includes(validSchema?.layout?.barmode!)) {
              return { isValid: true, type: 'groupedverticalbar', validDataIndices };
            }
            return { isValid: true, type: 'verticalstackedbar', validDataIndices };
          }
        }
        if (containsLines) {
          const scatterData = firstData as Partial<PlotData>;
          const isAreaChart = validDataIndices.some(idx =>
            ['tonexty', 'tozeroy'].includes(`${(validSchema.data[idx] as Partial<PlotData>).fill}`),
          );
          const isXDate = isDateArray(scatterData.x);
          const isXNumber = isNumberArray(scatterData.x);
          if (isXDate || isXNumber) {
            return { isValid: true, type: isAreaChart ? 'area' : 'line', validDataIndices };
          }
          return { isValid: true, type: 'fallback', validDataIndices };
        }

        return { isValid: false, errorMessage: `Unsupported chart - type :${firstData.type}}` };
    }
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid plotly schema: ${error}` };
  }
};
