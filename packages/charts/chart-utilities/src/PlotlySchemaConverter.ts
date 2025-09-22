import type { Datum, TypedArray, PlotData, PlotlySchema, Data, Layout, SankeyData } from './PlotlySchema';
import { decodeBase64Fields } from './DecodeBase64Data';

export type FluentChart =
  | 'area'
  | 'composite'
  | 'donut'
  | 'fallback'
  | 'gauge'
  | 'groupedverticalbar'
  | 'heatmap'
  | 'horizontalbar'
  | 'line'
  | 'scatter'
  | 'scatterpolar'
  | 'sankey'
  | 'table'
  | 'verticalstackedbar'
  | 'gantt';

export type TraceInfo = {
  index: number;
  type: FluentChart;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OutputChartType {
  isValid: boolean;
  errorMessage?: string;
  type?: string;
  /**
   * Array of [index, chartType] pairs
   */
  validTracesInfo?: TraceInfo[];
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMonth = (possiblyMonthValue: any): boolean => {
  if (typeof possiblyMonthValue !== 'string') {
    return false;
  }

  // Try to parse as a month name using system locale and then 'en-US'
  const testDate = new Date(`${possiblyMonthValue} 1, 2000`);
  if (isNaN(testDate.getTime())) {
    return false;
  }

  // Get month names for both locales
  const locales = [undefined, 'en-US'];
  for (const locale of locales) {
    // Full month name
    const fullMonth = testDate.toLocaleString(locale, { month: 'long' });
    // Short month name
    const shortMonth = testDate.toLocaleString(locale, { month: 'short' });

    if (
      possiblyMonthValue.toLowerCase() === fullMonth.toLowerCase() ||
      possiblyMonthValue.toLowerCase() === shortMonth.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
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

export const isMonthArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return isArrayOfType(data, (value: any): boolean => isMonth(value) || value === null);
};

export const isYearArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return isArrayOfType(data, (value: any): boolean => isYear(value) || value === null);
};

export const isStringArray = (data: Datum[] | Datum[][] | TypedArray | undefined) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isArrayOfType(data, (value: any) => typeof value === 'string' || value === null);
};

export const isObjectArray = (data: Datum[] | Datum[][] | TypedArray | undefined): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isArrayOfType(
    data,
    (value: any): boolean => typeof value === 'object' && value !== null && !isArrayOrTypedArray(value),
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
  const isXEmpty = data.x && isArrayOrTypedArray(data.x) && data.x.length === 0;
  const isYEmpty = data.y && isArrayOrTypedArray(data.y) && data.y.length === 0;
  if (isXEmpty || isYEmpty) {
    let emptyMsg = 'Bar chart: ';
    if (isXEmpty && isYEmpty) {
      emptyMsg += 'both x and y arrays are empty.';
    } else if (isXEmpty) {
      emptyMsg += 'x array is empty.';
    } else if (isYEmpty) {
      emptyMsg += 'y array is empty.';
    }
    throw new Error(emptyMsg);
  }
  if (data.orientation === 'h') {
    if (!isNumberArray(data.x) && !isDateArray(data.x)) {
      throw new Error(
        `${UNSUPPORTED_MSG_PREFIX} ${data.type}, orientation: ${data.orientation}, string x values not supported.`,
      );
    }
    if (!canMapToGantt(data) && isDateArray(data.x)) {
      throw new Error(
        `${UNSUPPORTED_MSG_PREFIX} ${data.type}, orientation: ${data.orientation}` +
          `, date x values not supported in HBWA.`,
      );
    }
    validateSeriesData(data, false);
  } else {
    if (!isNumberArray(data.y) && !isStringArray(data.y) && !isObjectArray(data.y)) {
      throw new Error(`Non numeric, string, or object Y values encountered, type: ${typeof data.y}`);
    }
  }
};
const isScatterMarkers = (mode: string): boolean => {
  return ['markers', 'text+markers', 'markers+text', 'text'].includes(mode);
};

const validateScatterData = (data: Partial<PlotData>, layout: Partial<Layout> | undefined) => {
  const mode = data.mode ?? '';
  const xAxisType = data && data.x && data.x.length > 0 ? typeof data?.x?.[0] : 'undefined';
  const yAxisType = data && data.y && data.y.length > 0 ? typeof data?.y?.[0] : 'undefined';
  if (isScatterMarkers(mode)) {
    // Any series having only markers -> Supported number x/string x/date x + number y or string y
    if (!isNumberArray(data.x) && !isStringArray(data.x) && !isDateArray(data.x)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, xAxisType: ${xAxisType}`);
    }
    if (!isNumberArray(data.y) && !isStringArray(data.y)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, yAxisType: ${yAxisType}`);
    }
  } else if (
    [
      'lines+markers',
      'markers+lines',
      'text+lines+markers',
      'lines',
      'text+lines',
      'lines+text',
      'lines+markers+text',
    ].includes(mode)
  ) {
    if (!isNumberArray(data.x) && !isStringArray(data.x) && !isDateArray(data.x)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, xAxisType: ${xAxisType}`);
    }
    if (!isNumberArray(data.y) && !isStringArray(data.y)) {
      throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, yAxisType: ${yAxisType}`);
    }
  } else {
    throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${mode}, Unsupported mode`);
  }

  const isAreaChart = isScatterAreaChart(data);
  const isFallbackNeeded = doesScatterNeedFallback(data);
  if (isAreaChart && isFallbackNeeded) {
    throw new Error(
      `${UNSUPPORTED_MSG_PREFIX} ${data.type}, Fallback to VerticalStackedBarChart is not allowed for Area Charts.`,
    );
  }
  if (isAreaChart && invalidateLogAxisType(data, layout)) {
    throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, log axis type not supported for AreaChart.`);
  }
  if (isFallbackNeeded && invalidateLogAxisType(data, layout)) {
    throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, log axis type not supported for VSBC fallback.`);
  }
};

const invalidateLogAxisType = (data: Partial<PlotData>, layout: Partial<Layout> | undefined) => {
  const axisIds = getAxisIds(data) as Record<string, number>;
  return Object.keys(axisIds).some(axLetter => {
    const axisKey = getAxisKey(axLetter as 'x' | 'y', axisIds[axLetter]);
    return layout?.[axisKey]?.type === 'log';
  });
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

const DATA_VALIDATORS_MAP: Record<string, ((data: Data, layout: Partial<Layout> | undefined) => void)[]> = {
  indicator: [
    data => {
      if (!(data as Partial<PlotData>).mode?.includes('gauge')) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, mode: ${(data as Partial<PlotData>).mode}`);
      }
    },
  ],
  histogram: [
    (data, layout) => {
      if (invalidateLogAxisType(data as Partial<PlotData>, layout)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, log axis type not supported.`);
      }
    },
    data => validateSeriesData(data as Partial<PlotData>, false),
  ],
  bar: [
    (data, layout) => {
      if (invalidateLogAxisType(data as Partial<PlotData>, layout)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, log axis type not supported.`);
      }
    },
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
  scatter: [(data, layout) => validateScatterData(data as Partial<PlotData>, layout)],
  scattergl: [(data, layout) => validateScatterData(data as Partial<PlotData>, layout)],
  scatterpolar: [
    data => {
      if (!isNumberArray((data as Partial<PlotData>).theta) && !isStringArray((data as Partial<PlotData>).theta)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, theta values must be array of numbers or strings`);
      }
      if (!isNumberArray((data as Partial<PlotData>).r)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, Non numeric r values`);
      }
    },
  ],
  funnel: [data => validateSeriesData(data as Partial<PlotData>, false)],
  histogram2d: [
    (data, layout) => {
      if (invalidateLogAxisType(data as Partial<PlotData>, layout)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, log axis type not supported.`);
      }
    },
  ],
  heatmap: [
    (data, layout) => {
      if (invalidateLogAxisType(data as Partial<PlotData>, layout)) {
        throw new Error(`${UNSUPPORTED_MSG_PREFIX} ${data.type}, log axis type not supported.`);
      }
    },
  ],
};

const DEFAULT_CHART_TYPE = '';
const getValidTraces = (dataArr: Data[], layout: Partial<Layout> | undefined) => {
  const errorMessages: string[] = [];
  const validTraces = dataArr
    .map((data, index): [number, string] => {
      const type = data.type;

      if (type && DATA_VALIDATORS_MAP[type]) {
        const validators = DATA_VALIDATORS_MAP[type];
        for (const validator of validators) {
          try {
            validator(data, layout);
          } catch (error) {
            errorMessages.push(`data[${index}] - type: ${data.type}, ${error}`);
            return [-1, DEFAULT_CHART_TYPE];
          }
        }
      }

      return [index, type ?? DEFAULT_CHART_TYPE];
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

    const validTraces = getValidTraces(validSchema.data, validSchema.layout);
    let mappedTraces = validTraces.map(trace => {
      const traceIndex = trace[0];
      const traceData = validSchema.data[traceIndex];

      switch (traceData.type) {
        case 'pie':
          return { isValid: true, traceIndex, type: 'donut' };
        case 'histogram2d':
        case 'heatmap':
          return { isValid: true, traceIndex, type: 'heatmap' };
        case 'sankey':
          return { isValid: true, traceIndex, type: 'sankey' };
        case 'indicator':
        case 'gauge':
          return { isValid: true, traceIndex, type: 'gauge' };
        case 'histogram':
          return { isValid: true, traceIndex, type: 'verticalbar' };
        case 'scatterpolar':
          return { isValid: true, traceIndex, type: 'scatterpolar' };
        case 'table':
          return { isValid: true, traceIndex, type: 'table' };
        case 'bar':
          const barData = traceData as Partial<PlotData>;
          if (barData.orientation === 'h') {
            if (canMapToGantt(barData)) {
              return { isValid: true, traceIndex, type: 'gantt' };
            }
            return { isValid: true, traceIndex, type: 'horizontalbar' };
          } else {
            // Handle object arrays in y values by setting barmode to group and routing to GVBC
            if (isObjectArray(barData.y)) {
              return { isValid: true, traceIndex, type: 'groupedverticalbar' };
            }

            if (['group', 'overlay'].includes(validSchema?.layout?.barmode!)) {
              if (!isNumberArray(barData.y)) {
                return { isValid: false, errorMessage: 'GVBC does not support string y-axis.' };
              }
              return { isValid: true, traceIndex, type: 'groupedverticalbar' };
            }
            return { isValid: true, traceIndex, type: 'verticalstackedbar' };
          }
        case 'funnel':
        case 'funnelarea':
          return { isValid: true, traceIndex, type: 'funnel' };
        case 'scatter':
        case 'scattergl':
          const scatterData = traceData as Partial<PlotData>;
          const isAreaChart = isScatterAreaChart(scatterData);
          const isScatterChart = isScatterMarkers(scatterData.mode ?? '');
          if (isScatterChart) {
            return { isValid: true, traceIndex, type: 'scatter' };
          }

          if (!doesScatterNeedFallback(scatterData)) {
            return { isValid: true, traceIndex, type: isAreaChart ? 'area' : 'line' };
          }

          // isScatterAreaChart and doesScatterNeedFallback cannot both return true for the
          // same trace due to the validation logic in validateScatterData.
          return { isValid: true, traceIndex, type: 'fallback' };
        default:
          return { isValid: false, errorMessage: `${UNSUPPORTED_MSG_PREFIX} ${traceData.type}` };
      }
    });

    const noValidTrace = mappedTraces.every(trace => !trace.isValid);
    if (noValidTrace) {
      return {
        isValid: false,
        errorMessage: mappedTraces
          .filter(trace => !trace.isValid)
          .map(trace => trace.errorMessage)
          .filter((msg, idx, arr) => msg && arr.indexOf(msg) === idx)
          .join('; '),
      };
    }

    // Filter invalid traces and render successfully even if 1 valid trace is present
    mappedTraces = mappedTraces.filter(trace => trace.isValid);

    const tracesInfo = mappedTraces.map(
      trace =>
        ({
          index: trace.traceIndex!,
          type: trace.type!,
        } as TraceInfo),
    );

    const containsBars = mappedTraces.some(
      trace => trace.type === 'groupedverticalbar' || trace.type === 'verticalstackedbar',
    );
    const containsLines = mappedTraces.some(trace => trace.type === 'line' || trace.type === 'fallback');
    if (containsLines) {
      if (containsBars) {
        const shouldUseGVBC = !mappedTraces.some(trace => trace.type === 'verticalstackedbar');
        return {
          isValid: true,
          type: shouldUseGVBC ? 'groupedverticalbar' : 'fallback',
          validTracesInfo: tracesInfo,
        };
      }

      if (mappedTraces.some(trace => trace.type === 'fallback')) {
        return {
          isValid: true,
          type: 'fallback',
          validTracesInfo: tracesInfo,
        };
      }
    }

    const uniqueTypes = new Set(mappedTraces.map(trace => trace.type));

    if (uniqueTypes.size > 1) {
      return {
        isValid: true,
        type: `composite`,
        validTracesInfo: tracesInfo,
      };
    }
    const chartType = Array.from(uniqueTypes)[0];
    return {
      isValid: true,
      type: chartType,
      validTracesInfo: tracesInfo,
    };
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid plotly schema: ${error}` };
  }
};

const canMapToGantt = (data: Partial<PlotData>) => {
  return isDateArray(data.base) || isNumberArray(data.base);
};

export const getAxisIds = (data: Partial<PlotData>) => {
  let xAxisId = 1;
  if (typeof data.xaxis === 'string' && /^x\d+$/.test(data.xaxis)) {
    xAxisId = parseInt(data.xaxis.slice(1), 10);
  }

  let yAxisId = 1;
  if (typeof data.yaxis === 'string' && /^y\d+$/.test(data.yaxis)) {
    yAxisId = parseInt(data.yaxis.slice(1), 10);
  }

  return {
    x: xAxisId,
    y: yAxisId,
  };
};

export const getAxisKey = (axLetter: 'x' | 'y', axId: number) => {
  return `${axLetter}axis${axId > 1 ? axId : ''}` as keyof Layout;
};

export const isScatterAreaChart = (data: Partial<PlotData>) => {
  return data.fill === 'tonexty' || data.fill === 'tozeroy' || !!data.stackgroup;
};

const doesScatterNeedFallback = (data: Partial<PlotData>) => {
  if (isScatterMarkers(data.mode ?? '')) {
    return false;
  }

  const isXDate = isDateArray(data.x);
  const isXNumber = isNumberArray(data.x);

  // Consider year as categorical variable not numeric continuous variable
  // Also year is not considered a date variable as it is represented as a point
  // in time and brings additional complexity of handling timezone and locale
  // formatting given the current design of the charting library
  const isXYear = isYearArray(data.x);
  const isXMonth = isMonthArray(data.x);
  const isYString = isStringArray(data.y);
  if ((isXDate || isXNumber || isXMonth) && !isXYear && !isYString) {
    return false;
  }

  return true;
};
