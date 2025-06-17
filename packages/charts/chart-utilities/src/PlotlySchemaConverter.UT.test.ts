import { getValidSchema } from './PlotlySchemaConverter';

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
