import type { Datum, TypedArray, PlotData, PlotlySchema } from './PlotlySchema';

export type ValidChartOutput = {
  isValid: true;
  type: string;
  chartSchema: { plotlySchema: PlotlySchema };
};
export type InvalidChartOutput = {
  isValid: false;
  errorMessage: string;
};
export type OutputChartType = ValidChartOutput | InvalidChartOutput;

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

export const mapFluentChart = (input: any): OutputChartType => {
  try {
    sanitizeJson(input);
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid JSON: ${error}` };
  }

  try {
    const validSchema: PlotlySchema = getValidSchema(input);

    let errorMessage: string | undefined;
    const validData = validSchema.data.filter((trace, index) => {
      try {
        if (trace.type === 'histogram') {
          validateSeriesData(trace, false);
        }
        if (trace.type === 'contour') {
          throw new Error(`Unsupported chart - type :${trace.type}`);
        }
        if (trace.type === 'bar') {
          if (trace.orientation === 'h' && trace.base !== undefined) {
            throw new Error('Unsupported chart type: Gantt');
          } else if (trace.orientation === 'h' && isNumberArray(trace.x)) {
            validateSeriesData(trace, false);
          } else {
            validateSeriesData(trace, true);
          }
        }
        if (trace.type === 'scatter' || isLineData(trace as Partial<PlotData>)) {
          const scatterTrace = trace as Partial<PlotData>;
          if (scatterTrace.mode?.includes('markers') && !isNumberArray(scatterTrace.y)) {
            throw new Error(
              `Unsupported chart - type :${scatterTrace.type}, mode: ${scatterTrace.mode}, xAxisType: String or Date`,
            );
          } else {
            validateSeriesData(scatterTrace, true);
          }
        }

        return true;
      } catch (error) {
        errorMessage = `data[${index}]: ${error}`;
        return false;
      }
    });
    if (validData.length === 0) {
      return { isValid: false, errorMessage: errorMessage! };
    }

    const chartSchema = { plotlySchema: { ...validSchema, data: validData } };

    const firstTrace = validData[0];
    if (firstTrace.type === 'pie') {
      return { isValid: true, type: 'donut', chartSchema };
    }
    if (firstTrace.type === 'heatmap') {
      return { isValid: true, type: 'heatmap', chartSchema };
    }
    if (firstTrace.type === 'sankey') {
      return { isValid: true, type: 'sankey', chartSchema };
    }
    if ((firstTrace.type === 'indicator' && firstTrace.mode?.includes('gauge')) || firstTrace.type === 'gauge') {
      return { isValid: true, type: 'gauge', chartSchema };
    }
    if (firstTrace.type === 'histogram') {
      return { isValid: true, type: 'verticalbar', chartSchema };
    }

    const containsBars = validData.some(d => d.type === 'bar');
    const containsLines = validData.some(d => d.type === 'scatter' || isLineData(d as Partial<PlotData>));
    if (containsBars && containsLines) {
      return { isValid: true, type: 'verticalstackedbar', chartSchema };
    }
    if (containsBars) {
      const barTrace = firstTrace as Partial<PlotData>;
      if (barTrace.orientation === 'h' && isNumberArray(barTrace.x)) {
        return { isValid: true, type: 'horizontalbar', chartSchema };
      } else {
        if (['group', 'overlay'].includes(validSchema?.layout?.barmode!)) {
          return { isValid: true, type: 'groupedverticalbar', chartSchema };
        }
        return { isValid: true, type: 'verticalstackedbar', chartSchema };
      }
    }
    if (containsLines) {
      const scatterTrace = firstTrace as Partial<PlotData>;
      const isAreaChart = validData.some((series: PlotData) => series.fill === 'tonexty' || series.fill === 'tozeroy');
      const isXDate = isDateArray(scatterTrace.x);
      const isXNumber = isNumberArray(scatterTrace.x);
      if (isXDate || isXNumber) {
        return { isValid: true, type: isAreaChart ? 'area' : 'line', chartSchema };
      }
      return { isValid: true, type: 'fallback', chartSchema };
    }

    return { isValid: false, errorMessage: `Unsupported chart - type :${firstTrace.type}}` };
  } catch (error) {
    return { isValid: false, errorMessage: `Invalid plotly schema: ${error}` };
  }
};
