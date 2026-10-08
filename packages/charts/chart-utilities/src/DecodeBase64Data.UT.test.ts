import { decodeBase64Fields, reshapeArray } from './DecodeBase64Data';
import type { PlotlySchema } from './PlotlySchema';

describe('reshapeArray', () => {
  it('should return the same array for 1D shape', () => {
    const data = [1, 2, 3, 4];
    const shape = [4];
    expect(reshapeArray(data, shape)).toEqual([1, 2, 3, 4]);
  });

  it('should reshape a flat array into 2D array', () => {
    const data = [1, 2, 3, 4, 5, 6];
    const shape = [2, 3];
    expect(reshapeArray(data, shape)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('should reshape a flat array into 3D array', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    const shape = [2, 2, 2];
    expect(reshapeArray(data, shape)).toEqual([
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ]);
  });

  it('should throw an error if data cannot be reshaped into the given shape', () => {
    const data = [1, 2, 3, 4];
    const shape = [3, 2];
    expect(() => reshapeArray(data, shape)).toThrow(
      'Invalid typed-array shape: dimensions do not match decoded element count',
    );
  });

  it.each([
    [[-1], 'dimensions must be non-negative safe integers'],
    [[1.5], 'dimensions must be non-negative safe integers'],
    [[Number.POSITIVE_INFINITY], 'dimensions must be non-negative safe integers'],
    [[Number.NaN], 'dimensions must be non-negative safe integers'],
    [[Number.MAX_SAFE_INTEGER + 1], 'dimensions must be non-negative safe integers'],
    [[], 'rank must be between 1 and 3'],
    [[1, 1, 1, 1], 'rank must be between 1 and 3'],
  ])('should reject invalid shape %p', (shape, errorMessage) => {
    expect(() => reshapeArray([], shape as number[])).toThrow(errorMessage as string);
  });

  it('should reject shapes that exceed the element limit', () => {
    expect(() => reshapeArray([], [1_000_001])).toThrow('element count exceeds 1000000');
  });

  it('should reject shapes that exceed the nested array limit', () => {
    expect(() => reshapeArray(new Array(100_001).fill(0), [100_001, 1])).toThrow('nested array count exceeds 100000');
  });

  it('should allow zero dimensions only when they match empty data', () => {
    expect(reshapeArray([], [0, 1])).toEqual([]);
    expect(() => reshapeArray([1], [0, 1])).toThrow(
      'Invalid typed-array shape: dimensions do not match decoded element count',
    );
  });
});

describe('decodeBase64Fields', () => {
  it('should reject an oversized shape before reshaping decoded data', () => {
    const schema = {
      data: [{ type: 'scatter', x: { bdata: 'AQ==', dtype: 'i1', shape: '5000000,1' }, y: [1] }],
    } as unknown as PlotlySchema;

    expect(() => decodeBase64Fields(schema)).toThrow('element count exceeds 1000000');
  });

  it.each(['2,2', '[2,2]'])('should decode and reshape a valid string shape %s', shape => {
    const schema = {
      data: [{ x: { bdata: 'AQIDBA==', dtype: 'i1', shape } }],
    } as unknown as PlotlySchema;

    expect(decodeBase64Fields(schema)).toEqual({
      data: [
        {
          x: [
            [1, 2],
            [3, 4],
          ],
        },
      ],
    });
  });
});
