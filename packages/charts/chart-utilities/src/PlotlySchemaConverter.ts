import type { Datum, TypedArray, PlotData, PlotlySchema, Data, Layout, SankeyData } from './PlotlySchema';
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

const UNSUPPORTED_MSG_PREFIX = 'Unsupported chart - type :';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNumber = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDate = (value: any): boolean => {
  // Don't consider number as date. There is no way to differentiate milliseconds from date and number
  // without additional context.
  if (isNumber(value)) {
    return false;
  }

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

const isYear = (input: string | number | Date | null): boolean => {
  if (isNumber(input)) {
    const possibleYear = typeof input === 'string' ? parseFloat(input) : Number(input);
    return Number.isInteger(possibleYear) && possibleYear >= 1900 && possibleYear <= 2100;
  }
  return false;
};

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
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return isArrayOfType(data, (value: any): boolean => isDate(value) || value === null);
};

export const isNumberArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return isArrayOfType(
    data,
    (value: any): boolean =>
      (typeof value === 'string' && isNumber(value)) || typeof value === 'number' || value === null,
  );
};

export const isYearArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return isArrayOfType(data, (value: any): boolean => isYear(value) || value === null);
};

export const isStringArray = (data: Datum[] | Datum[][] | TypedArray | undefined) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isArrayOfType(data, (value: any) => typeof value === 'string' || value === null);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isInvalidValue = (value: any) => {
  return typeof value === 'undefined' || value === null || (typeof value === 'number' && !isFinite(value));
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
    if (typeof validatedSchema !== 'object') {
      throw new Error(`Plotly input is not an object. Input type: ${typeof validatedSchema}`);
    }
    if (!isArrayOrTypedArray(validatedSchema.data)) {
      throw new Error('Plotly input data is not a valid array or typed array');
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
    throw new Error(`${UNSUPPORTED_MSG_PREFIX} Gantt`);
  } else if (data.orientation === 'h' && isNumberArray(data.x)) {
    validateSeriesData(data, false);
  } else if (!isNumberArray(data.y) && !isStringArray(data.y)) {
    throw new Error(`Non numeric or string Y values encountered.`);
  }
};

const validateScatterData = (data: Partial<PlotData>) => {
  const mode = data.mode ?? '';
  const xAxisType = data && data.x && data.x.length > 0 ? typeof data?.x?.[0] : 'undefined';
  const yAxisType = data && data.y && data.y.length > 0 ? typeof data?.y?.[0] : 'undefined';
  if (['markers'].includes(mode)) {
    // Any series having only markers -> Supported number x/string x/date x + number y
    if (!isNumberArray(data.x) && !isStringArray(data.x) && !isDateArray(data.x)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, xAxisType: ${xAxisType}`);
    }
    if (!isNumberArray(data.y)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, yAxisType: ${yAxisType}`);
    }
  } else if (['lines+markers', 'markers+lines', 'text+lines+markers', 'lines', 'text+lines'].includes(mode)) {
    if (!isNumberArray(data.x) && !isStringArray(data.x) && !isDateArray(data.x)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, xAxisType: ${xAxisType}`);
    }
    if (
      ['lines+markers', 'markers+lines', 'text+lines+markers', 'lines', 'text+lines'].includes(mode) &&
      !isNumberArray(data.y) &&
      !isStringArray(data.y)
    ) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, yAxisType: ${yAxisType}`);
    }
  } else {
    throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, Unsupported mode`);
  }
};

const invalidateLogAxisType = (layout: Partial<Layout> | undefined): boolean => {
  const isLogAxisType =
    layout?.xaxis?.type === 'log' ||
    layout?.yaxis?.type === 'log' ||
    layout?.yaxis2?.type === 'log' ||
    layout?.xaxis2?.type === 'log';

  return isLogAxisType;
};

/**
 * Detects cycles in Sankey chart data.
 * @param nodes Array of node labels.
 * @param links Array of links with source and target as node indices.
 * @returns true if a cycle is found.
 */
function findSankeyCycles(input: Partial<SankeyData>): boolean {
  const graph: Record<number, number[]> = {};
  input.node?.label?.forEach((_, idx) => (graph[idx] = []));
  input.link?.value?.forEach((val, idx) => {
    if (
      !(isInvalidValue(val) || isInvalidValue(input.link?.source?.[idx]) || isInvalidValue(input.link?.target?.[idx]))
    ) {
      graph[input.link!.source![idx]].push(input.link!.target![idx]);
    }
  });

  const visited = new Set<number>();
  const stack = new Set<number>();

  function dfs(node: number, path: number[]) {
    if (isInvalidValue(node) || !graph[node]) {
      // Invalid node or no edges, return
      return false;
    }
    if (stack.has(node)) {
      // Cycle detected, return
      return true;
    }
    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    stack.add(node);
    for (const neighbor of graph[node]) {
      const cycleDetected = dfs(neighbor, [...path, neighbor]);
      if (cycleDetected) {
        return true; // Cycle found in the path
      }
    }
    stack.delete(node);
    return false; // No cycle found in this path
  }

  for (let i = 0; i < Object.keys(graph).length; i++) {
    const cycleFound = dfs(i, [i]);
    if (cycleFound) {
      return true; // Cycle found
    }
  }

  return false; // No cycles found
}

const DATA_VALIDATORS_MAP: Record<string, ((data: Data) => void)[]> = {
  indicator: [
    data => {
      if (!(data as Partial<PlotData>).mode?.includes('gauge')) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${(data as Partial<PlotData>).mode}`);
      }
    },
  ],
  histogram: [data => validateSeriesData(data as Partial<PlotData>, false)],
  bar: [
    data => {
      validateBarData(data as Partial<PlotData>);
    },
  ],
  sankey: [
    data => {
      if (findSankeyCycles(data as Partial<SankeyData>)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, Cycles in Sankey chart not supported`);
      }
    },
  ],
  scatter: [data => validateScatterData(data as Partial<PlotData>)],
  scatterpolar: [
    data => {
      if (!isNumberArray((data as Partial<PlotData>).theta)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, Non numeric theta values`);
      }
      if (!isNumberArray((data as Partial<PlotData>).r)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, Non numeric r values`);
      }
    },
  ],
};

const DEFAULT_CHART_TYPE = '';
const getValidTraces = (dataArr: Data[]) => {
  const errorMessages: string[] = [];
  const validTraces = dataArr
    .map((data, index): [number, string] => {
      const type = data.type;

      if (type && DATA_VALIDATORS_MAP[type]) {
        const validators = DATA_VALIDATORS_MAP[type];
        for (const validator of validators) {
          try {
            validator(data);
          } catch (error) {
            errorMessages.push(`data[${index}] - type: ${data.type}, ${error}`);
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

    if (invalidateLogAxisType(validSchema.layout)) {
      return { isValid: false, errorMessage: 'Log axis type is not supported' };
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
      case 'scatterpolar':
        return { isValid: true, type: 'scatterpolar', validTracesInfo: validTraces };
      case 'table':
        return { isValid: true, type: 'table', validTracesInfo: validTraces };
      default:
        const isScatterChart = validTraces.every(trace => {
          const data = validSchema.data[trace[0]] as Partial<PlotData>;
          return data.type === 'scatter' && (data.mode ?? '') === 'markers';
        });
        if (isScatterChart) {
          return { isValid: true, type: 'scatter', validTracesInfo: validTraces };
        }

        const containsBars = validTraces.some(trace => validSchema.data[trace[0]].type === 'bar');
        const containsLines = validTraces.some(trace => validSchema.data[trace[0]].type === 'scatter');
        if (containsBars && containsLines) {
          return { isValid: true, type: 'verticalstackedbar', validTracesInfo: validTraces };
        }
        if (containsBars) {
          const firstBarData = firstData as Partial<PlotData>;
          if (firstBarData.orientation === 'h' && isNumberArray(firstBarData.x)) {
            return { isValid: true, type: 'horizontalbar', validTracesInfo: validTraces };
          } else {
            if (['group', 'overlay'].includes(validSchema?.layout?.barmode!)) {
              if (!isNumberArray(firstBarData.y)) {
                return { isValid: false, errorMessage: 'GVBC does not support string y-axis.' };
              }
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
          const isXYear = isYearArray(firstScatterData.x);
          const isYString = isStringArray(firstScatterData.y);
          if ((isXDate || isXNumber) && !isXYear && !isYString) {
            return { isValid: true, type: isAreaChart ? 'area' : 'line', validTracesInfo: validTraces };
          } else if (isAreaChart) {
            return {
              isValid: false,
              errorMessage: 'Fallback to VerticalStackedBarChart is not allowed for Area Charts.',
            };
          }
          return { isValid: true, type: 'fallback', validTracesInfo: validTraces };
        }

        return { isValid: false, errorMessage: `${UNSUPPORTED_MSG_PREFIX} ${firstData.type}` };
    }
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid plotly schema: ${error}` };
  }
};
