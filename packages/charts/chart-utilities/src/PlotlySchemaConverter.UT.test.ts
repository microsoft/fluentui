import {
  getValidSchema,
  mapFluentChart,
  isNumber,
  isDate,
  isMonth,
  isArrayOfType,
  isDateArray,
  isNumberArray,
  isMonthArray,
  isYearArray,
  isStringArray,
  validate2Dseries,
  isInvalidValue,
  sanitizeJson,
  isTypedArray,
  isArrayOrTypedArray,
} from './PlotlySchemaConverter';

describe('getValidSchema UTs', () => {
  test('Null input', () => {
    try {
      getValidSchema(null);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe('Invalid plotly schema: Error: Plotly input is null or undefined');
    }
  });

  test('undefined input', () => {
    try {
      getValidSchema(undefined);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe('Invalid plotly schema: Error: Plotly input is null or undefined');
    }
  });

  test('string input', () => {
    try {
      getValidSchema('Test string input');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input is not an object. Input type: string',
      );
    }
  });

  test('number input', () => {
    try {
      getValidSchema(1234);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input is not an object. Input type: number',
      );
    }
  });

  test('Empty input object', () => {
    try {
      getValidSchema({});
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input data is not a valid array or typed array',
      );
    }
  });

  test('input data number type', () => {
    try {
      getValidSchema({ data: 1234 });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input data is not a valid array or typed array',
      );
    }
  });

  test('input data string type', () => {
    try {
      getValidSchema({ data: 'Test string' });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input data is not a valid array or typed array',
      );
    }
  });

  test('input data empty object', () => {
    try {
      getValidSchema({ data: {} });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input data is not a valid array or typed array',
      );
    }
  });

  test('input data is null', () => {
    try {
      getValidSchema({ data: null });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input data is not a valid array or typed array',
      );
    }
  });

  test('input data empty array', () => {
    try {
      getValidSchema({ data: [] });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe('Invalid plotly schema: Error: Plotly input data is empty');
    }
  });

  test('input is an object with extra properties', () => {
    const validatedSchema = getValidSchema({ data: [1, 2], layout: { title: 'Test' } });
    expect(validatedSchema).toBeDefined();
    expect(validatedSchema.data).toEqual([1, 2]);
    expect(validatedSchema.layout).toEqual({ title: 'Test' });
  });

  test('input is an array, not an object', () => {
    try {
      getValidSchema([1, 2, 3]);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input data is not a valid array or typed array',
      );
    }
  });

  test('input is a function', () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getValidSchema(() => {});
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe(
        'Invalid plotly schema: Error: Plotly input is not an object. Input type: function',
      );
    }
  });

  test('input data non empty array', () => {
    const validatedSchema = getValidSchema({ data: [123, 456] });
    expect(validatedSchema).toBeDefined();
    expect(validatedSchema).toBeInstanceOf(Object);
    expect(validatedSchema).toHaveProperty('data');
    expect(validatedSchema.data).toBeInstanceOf(Array);
    expect(validatedSchema.data.length).toBe(2);
    expect(validatedSchema.data[0]).toBe(123);
    expect(validatedSchema.data[1]).toBe(456);
  });

  test('input data is a valid typed array', () => {
    const floatArr = new Float32Array([1.1, 2.2]);
    const validatedSchema = getValidSchema({ data: floatArr });
    expect(validatedSchema).toBeDefined();
    expect(validatedSchema.data).toBeInstanceOf(Float32Array);
    expect(validatedSchema.data.length).toBe(2);
    expect(validatedSchema.data[0]).toBeCloseTo(1.1);
    expect(validatedSchema.data[1]).toBeCloseTo(2.2);
  });
});

describe('isNumber tests', () => {
  test('valid numbers', () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-5)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber('42')).toBe(true);
    expect(isNumber('3.14')).toBe(true);
    expect(isNumber('-5')).toBe(true);
  });

  test('invalid numbers', () => {
    expect(isNumber('abc')).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(-Infinity)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
  });
});

describe('isDate UTs', () => {
  test('valid dates', () => {
    expect(isDate('2023-01-01')).toBe(true);
    expect(isDate('January 1, 2023')).toBe(true);
    expect(isDate('2023/01/01')).toBe(true);
    expect(isDate('01-01-2023')).toBe(true);
    expect(isDate('Dec 25, 2022')).toBe(true);
  });

  test('invalid dates', () => {
    expect(isDate('not a date')).toBe(false);
    expect(isDate('')).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(42)).toBe(false); // Numbers are not considered dates
    expect(isDate(123456789)).toBe(false); // Even valid timestamps
  });

  test('edge cases', () => {
    expect(isDate('13/01/2023')).toBe(false); // Invalid month
    expect(isDate('2023-13-01')).toBe(false); // Invalid month
    expect(isDate('2023-01-32')).toBe(false); // Invalid day
  });
});

describe('isMonth UTs', () => {
  test('valid month names', () => {
    expect(isMonth('January')).toBe(true);
    expect(isMonth('Jan')).toBe(true);
    expect(isMonth('February')).toBe(true);
    expect(isMonth('Feb')).toBe(true);
    expect(isMonth('December')).toBe(true);
    expect(isMonth('Dec')).toBe(true);
  });

  test('case insensitive', () => {
    expect(isMonth('january')).toBe(true);
    expect(isMonth('JANUARY')).toBe(true);
    expect(isMonth('jan')).toBe(true);
    expect(isMonth('JAN')).toBe(true);
  });

  test('invalid months', () => {
    expect(isMonth('not a month')).toBe(false);
    expect(isMonth('')).toBe(false);
    expect(isMonth(null)).toBe(false);
    expect(isMonth(undefined)).toBe(false);
    expect(isMonth(1)).toBe(false); // Numbers are not month strings
    expect(isMonth('13th')).toBe(false);
  });
});

describe('isArrayOfType UTs', () => {
  test('valid 1D arrays', () => {
    expect(isArrayOfType([1, 2, 3], isNumber)).toBe(true);
    expect(isArrayOfType(['a', 'b', 'c'], (x: unknown) => typeof x === 'string')).toBe(true);
  });

  test('valid 2D arrays', () => {
    expect(
      isArrayOfType(
        [
          [1, 2],
          [3, 4],
        ],
        isNumber,
      ),
    ).toBe(true);
    expect(
      isArrayOfType(
        [
          ['a', 'b'],
          ['c', 'd'],
        ],
        (x: unknown) => typeof x === 'string',
      ),
    ).toBe(true);
  });

  test('arrays with null values', () => {
    expect(isArrayOfType([1, null, 3], (x: unknown) => isNumber(x) || x === null)).toBe(true);
    expect(isArrayOfType(['a', null, 'c'], (x: unknown) => typeof x === 'string' || x === null)).toBe(true);
  });

  test('invalid arrays', () => {
    expect(isArrayOfType([1, 'a', 3], isNumber)).toBe(false);
    expect(isArrayOfType(null, isNumber)).toBe(false);
    expect(isArrayOfType(undefined, isNumber)).toBe(false);
    expect(isArrayOfType([], isNumber)).toBe(false); // Empty arrays return false
  });

  test('typed arrays', () => {
    const float32Arr = new Float32Array([1.1, 2.2, 3.3]);
    expect(isArrayOfType(float32Arr, isNumber)).toBe(true);
  });
});

describe('isNumberArray UTs', () => {
  test('valid number arrays', () => {
    expect(isNumber([1, 2, 3])).toBe(false);
    expect(isNumberArray([1, 2, 3])).toBe(true);
    expect(isNumberArray(['1', '2', '3'])).toBe(true);
    expect(isNumberArray([1.5, 2.7, 3.9])).toBe(true);
    expect(isNumberArray([1, null, 3])).toBe(true);
  });

  test('invalid number arrays', () => {
    expect(isNumberArray([1, 'a', 3])).toBe(false);
    expect(isNumberArray(['a', 'b', 'c'])).toBe(false);
    expect(isNumberArray([])).toBe(false);
    expect(isNumberArray(null)).toBe(false);
  });
});

describe('isDateArray UTs', () => {
  test('valid date arrays', () => {
    expect(isDateArray(['2023-01-01', '2023-01-02', '2023-01-03'])).toBe(true);
    expect(isDateArray(['Jan 1, 2023', 'Jan 2, 2023'])).toBe(true);
    expect(isDateArray(['2023-01-01', null, '2023-01-03'])).toBe(true);
  });

  test('invalid date arrays', () => {
    expect(isDateArray(['2023-01-01', 'not a date', '2023-01-03'])).toBe(false);
    expect(isDateArray([1, 2, 3])).toBe(false);
    expect(isDateArray([])).toBe(false);
    expect(isDateArray(null)).toBe(false);
  });
});

describe('isMonthArray UTs', () => {
  test('valid month arrays', () => {
    expect(isMonthArray(['January', 'February', 'March'])).toBe(true);
    expect(isMonthArray(['Jan', 'Feb', 'Mar'])).toBe(true);
    expect(isMonthArray(['January', null, 'March'])).toBe(true);
  });

  test('invalid month arrays', () => {
    expect(isMonthArray(['January', 'NotAMonth', 'March'])).toBe(false);
    expect(isMonthArray([1, 2, 3])).toBe(false);
    expect(isMonthArray([])).toBe(false);
    expect(isMonthArray(null)).toBe(false);
  });
});

describe('isYearArray UTs', () => {
  test('valid year arrays', () => {
    expect(isYearArray([2020, 2021, 2022])).toBe(true);
    expect(isYearArray(['2020', '2021', '2022'])).toBe(true);
    expect(isYearArray([2020, null, 2022])).toBe(true);
  });

  test('invalid year arrays', () => {
    expect(isYearArray([1800, 2021, 2022])).toBe(false); // Year too old
    expect(isYearArray([2020, 2200, 2022])).toBe(false); // Year too far in future
    expect(isYearArray([2020.5, 2021, 2022])).toBe(false); // Not integer
    expect(isYearArray([])).toBe(false);
    expect(isYearArray(null)).toBe(false);
  });
});

describe('isStringArray UTs', () => {
  test('valid string arrays', () => {
    expect(isStringArray(['a', 'b', 'c'])).toBe(true);
    expect(isStringArray(['hello', 'world'])).toBe(true);
    expect(isStringArray(['a', null, 'c'])).toBe(true);
  });

  test('invalid string arrays', () => {
    expect(isStringArray([1, 2, 3])).toBe(false);
    expect(isStringArray(['a', 1, 'c'])).toBe(false);
    expect(isStringArray([])).toBe(false);
    expect(isStringArray(null)).toBe(false);
  });
});

describe('validate2Dseries UTs', () => {
  test('valid 2D series', () => {
    expect(validate2Dseries({ x: [1, 2, 3], y: [4, 5, 6] })).toBe(true);
    expect(validate2Dseries({ x: ['a', 'b', 'c'], y: [1, 2, 3] })).toBe(true);
    expect(validate2Dseries({ y: [1, 2, 3] })).toBe(true); // x can be missing
    expect(validate2Dseries({ x: [1, 2, 3] })).toBe(true); // y can be missing
  });

  test('invalid 2D series with nested arrays', () => {
    expect(
      validate2Dseries({
        x: [
          [1, 2],
          [3, 4],
        ],
        y: [4, 5],
      }),
    ).toBe(false);
    expect(
      validate2Dseries({
        x: [1, 2, 3],
        y: [
          [4, 5],
          [6, 7],
        ],
      }),
    ).toBe(false);
  });

  test('empty series', () => {
    expect(validate2Dseries({})).toBe(true);
    expect(validate2Dseries({ x: [], y: [] })).toBe(true);
  });
});

describe('isInvalidValue UTs', () => {
  test('invalid values', () => {
    expect(isInvalidValue(undefined)).toBe(true);
    expect(isInvalidValue(null)).toBe(true);
    expect(isInvalidValue(NaN)).toBe(true);
    expect(isInvalidValue(Infinity)).toBe(true);
    expect(isInvalidValue(-Infinity)).toBe(true);
  });

  test('valid values', () => {
    expect(isInvalidValue(0)).toBe(false);
    expect(isInvalidValue(42)).toBe(false);
    expect(isInvalidValue('')).toBe(false);
    expect(isInvalidValue('hello')).toBe(false);
    expect(isInvalidValue([])).toBe(false);
    expect(isInvalidValue({})).toBe(false);
    expect(isInvalidValue(false)).toBe(false);
  });
});

describe('sanitizeJson UTs', () => {
  test('sanitize HTML characters', () => {
    const input = { text: '<script>alert("xss")</script>' };
    const result = sanitizeJson(input);
    expect(result.text).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
  });

  test('nested objects', () => {
    const input = { outer: { inner: '<div>content</div>' } };
    const result = sanitizeJson(input);
    expect(result.outer.inner).toBe('&lt;div&gt;content&lt;/div&gt;');
  });

  test('arrays with objects', () => {
    const input = { items: [{ text: '<span>item</span>' }] };
    const result = sanitizeJson(input);
    expect(result.items[0].text).toBe('&lt;span&gt;item&lt;/span&gt;');
  });

  test('maximum depth exceeded', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deepObject: any = {};
    let current = deepObject;
    for (let i = 0; i < 20; i++) {
      current.next = {};
      current = current.next;
    }

    expect(() => sanitizeJson(deepObject)).toThrow('Maximum json depth exceeded');
  });

  test('non-string values unchanged', () => {
    const input = { numValue: 42, boolValue: true, array: [1, 2, 3] };
    const result = sanitizeJson(input);
    expect(result.numValue).toBe(42);
    expect(result.boolValue).toBe(true);
    expect(result.array).toEqual([1, 2, 3]);
  });
});

describe('isTypedArray UTs', () => {
  test('typed arrays', () => {
    expect(isTypedArray(new Float32Array([1, 2, 3]))).toBe(true);
    expect(isTypedArray(new Int32Array([1, 2, 3]))).toBe(true);
    expect(isTypedArray(new Uint8Array([1, 2, 3]))).toBe(true);
  });

  test('non-typed arrays', () => {
    expect(isTypedArray([1, 2, 3])).toBe(false);
    expect(isTypedArray(new DataView(new ArrayBuffer(8)))).toBe(false);
    expect(isTypedArray({})).toBe(false);
    expect(isTypedArray(null)).toBe(false);
  });
});

describe('isArrayOrTypedArray UTs', () => {
  test('regular arrays', () => {
    expect(isArrayOrTypedArray([1, 2, 3])).toBe(true);
    expect(isArrayOrTypedArray([])).toBe(true);
  });

  test('typed arrays', () => {
    expect(isArrayOrTypedArray(new Float32Array([1, 2, 3]))).toBe(true);
    expect(isArrayOrTypedArray(new Int32Array([1, 2, 3]))).toBe(true);
  });

  test('non-arrays', () => {
    expect(isArrayOrTypedArray({})).toBe(false);
    expect(isArrayOrTypedArray(null)).toBe(false);
    expect(isArrayOrTypedArray('string')).toBe(false);
    expect(isArrayOrTypedArray(42)).toBe(false);
  });
});

describe('mapFluentChart UTs', () => {
  test('invalid JSON input', () => {
    const input = {
      data: [
        {
          type: 'scatter',
          mode: 'lines',
          x: [1, 2, 3],
          y: [4, 5, 6],
          text: '<script>alert("test")</script>',
        },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true); // sanitizeJson should handle this
  });

  test('null input', () => {
    const result = mapFluentChart(null);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Invalid plotly schema');
  });

  test('empty data array', () => {
    const result = mapFluentChart({ data: [] });
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Plotly input data is empty');
  });

  test('pie chart mapping', () => {
    const input = {
      data: [{ type: 'pie', values: [1, 2, 3], labels: ['A', 'B', 'C'] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('donut');
    expect(result.validTracesInfo).toHaveLength(1);
    expect(result.validTracesInfo![0].type).toBe('donut');
  });

  test('bar chart mapping - vertical', () => {
    const input = {
      data: [{ type: 'bar', x: ['A', 'B', 'C'], y: [1, 2, 3] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('verticalstackedbar');
  });

  test('bar chart mapping - horizontal', () => {
    const input = {
      data: [{ type: 'bar', orientation: 'h', x: [1, 2, 3], y: ['A', 'B', 'C'] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('horizontalbar');
  });

  test('bar chart mapping - grouped', () => {
    const input = {
      data: [{ type: 'bar', x: ['A', 'B', 'C'], y: [1, 2, 3] }],
      layout: { barmode: 'group' },
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('groupedverticalbar');
  });

  test('scatter chart mapping - markers', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'markers', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('scatter');
  });

  test('scatter chart mapping - lines', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - area', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', fill: 'tozeroy', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('area');
  });

  test('scatter chart mapping - text+markers', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'text+markers', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('scatter');
  });

  test('scatter chart mapping - markers+text', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'markers+text', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('scatter');
  });

  test('scatter chart mapping - lines+markers', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines+markers', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - markers+lines', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'markers+lines', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - text+lines+markers', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'text+lines+markers', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - text+lines', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'text+lines', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - lines+text', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines+text', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - lines+markers+text', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines+markers+text', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter chart mapping - text', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'text', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('scatter');
  });

  test('histogram chart mapping', () => {
    const input = {
      data: [{ type: 'histogram', x: [1, 2, 3, 4, 5] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('verticalbar');
  });

  test('heatmap chart mapping', () => {
    const input = {
      data: [
        {
          type: 'heatmap',
          z: [
            [1, 2],
            [3, 4],
          ],
        },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('heatmap');
  });

  test('sankey chart mapping', () => {
    const input = {
      data: [
        {
          type: 'sankey',
          node: { label: ['A', 'B', 'C'] },
          link: { source: [0, 1], target: [1, 2], value: [10, 20] },
        },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('sankey');
  });

  test('gauge chart mapping', () => {
    const input = {
      data: [{ type: 'indicator', mode: 'gauge+number', value: 75 }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('gauge');
  });

  test('scatterpolar chart mapping', () => {
    const input = {
      data: [{ type: 'scatterpolar', theta: [0, 45, 90], r: [1, 2, 3] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('scatterpolar');
  });

  test('table chart mapping', () => {
    const input = {
      data: [
        {
          type: 'table',
          header: { values: ['Col1', 'Col2'] },
          cells: {
            values: [
              ['A', 'B'],
              [1, 2],
            ],
          },
        },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('table');
  });

  test('unsupported chart type', () => {
    const input = {
      data: [{ type: 'unsupported', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Unsupported chart - type : unsupported');
  });

  test('log axis type validation', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', x: [1, 2, 3], y: [4, 5, 6] }],
      layout: { xaxis: { type: 'log' } },
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
  });

  test('unsupported log axis type', () => {
    const input = {
      data: [{ type: 'bar', x: [1, 2, 3], y: [4, 5, 6] }],
      layout: { xaxis: { type: 'log' } },
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('log axis type not supported');
  });

  test('composite chart with multiple types', () => {
    const input = {
      data: [
        { type: 'scatter', mode: 'lines', x: [1, 2, 3], y: [4, 5, 6] },
        { type: 'bar', x: ['A', 'B', 'C'], y: [1, 2, 3] },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('fallback'); // Contains both bars and lines
  });

  test('composite chart with different compatible types', () => {
    const input = {
      data: [
        { type: 'pie', values: [1, 2, 3], labels: ['A', 'B', 'C'] },
        {
          type: 'heatmap',
          z: [
            [1, 2],
            [3, 4],
          ],
        },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('composite');
  });

  test('invalid scatter mode', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'invalid_mode', x: [1, 2, 3], y: [4, 5, 6] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Unsupported mode');
  });

  test('gantt chart mapping', () => {
    const input = {
      data: [{ type: 'bar', orientation: 'h', base: [4, 5, 6], x: [1, 2, 3], y: ['A', 'B', 'C'] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('gantt');
  });

  test('invalid histogram data', () => {
    const input = {
      data: [
        {
          type: 'histogram',
          x: [
            [1, 2],
            [3, 4],
          ],
        },
      ], // Invalid 2D array
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Invalid 2D series');
  });

  test('invalid scatterpolar data - non-numeric theta', () => {
    const input = {
      data: [{ type: 'scatterpolar', theta: ['a', 'b', 'c'], r: [1, 2, 3] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
  });

  test('invalid scatterpolar data - non-numeric r', () => {
    const input = {
      data: [{ type: 'scatterpolar', theta: [0, 45, 90], r: ['a', 'b', 'c'] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Non numeric r values');
  });

  test('sankey with cycles', () => {
    const input = {
      data: [
        {
          type: 'sankey',
          node: { label: ['A', 'B', 'C'] },
          link: { source: [0, 1, 2], target: [1, 2, 0], value: [10, 20, 30] }, // Creates a cycle
        },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Cycles in Sankey chart not supported');
  });

  test('indicator without gauge mode', () => {
    const input = {
      data: [{ type: 'indicator', mode: 'number', value: 75 }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Unsupported chart - type : indicator');
  });

  test('scatter with date x-axis', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', x: ['2023-01-01', '2023-01-02', '2023-01-03'], y: [1, 2, 3] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('line');
  });

  test('scatter with year x-axis fallback', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', x: [2020, 2021, 2022], y: [1, 2, 3] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('fallback'); // Years are treated as categorical
  });

  test('scatter with string y-axis fallback', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', x: [1, 2, 3], y: ['A', 'B', 'C'] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('fallback');
  });

  test('area chart with string y-axis should fail', () => {
    const input = {
      data: [{ type: 'scatter', mode: 'lines', fill: 'tozeroy', x: [1, 2, 3], y: ['A', 'B', 'C'] }],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Fallback to VerticalStackedBarChart is not allowed for Area Charts');
  });

  test('grouped bar chart with string y-axis should fail', () => {
    const input = {
      data: [{ type: 'bar', x: ['A', 'B', 'C'], y: ['X', 'Y', 'Z'] }],
      layout: { barmode: 'group' },
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('GVBC does not support string y-axis');
  });

  test('multiple traces with some invalid', () => {
    const input = {
      data: [
        { type: 'pie', values: [1, 2, 3], labels: ['A', 'B', 'C'] }, // Valid
        { type: 'scatter', mode: 'invalid_mode', x: [1, 2, 3], y: [4, 5, 6] }, // Invalid
        { type: 'bar', x: ['A', 'B', 'C'], y: [1, 2, 3] }, // Valid
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(true); // Should be valid with 2 valid traces
    expect(result.validTracesInfo).toHaveLength(2);
  });

  test('all traces invalid', () => {
    const input = {
      data: [
        { type: 'scatter', mode: 'invalid_mode', x: [1, 2, 3], y: [4, 5, 6] },
        { type: 'indicator', mode: 'number', value: 75 },
      ],
    };
    const result = mapFluentChart(input);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Unsupported');
  });
});
