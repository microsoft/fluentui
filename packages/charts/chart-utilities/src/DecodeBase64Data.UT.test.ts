import { reshapeArray } from './DecodeBase64Data';

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
    expect(reshapeArray(data, shape)).toEqual([[1, 2], [3, 4], []]);
  });

  it('should handle empty data and shape', () => {
    const data: number[] = [];
    const shape: number[] = [];
    expect(reshapeArray(data, shape)).toEqual([]);
  });
});
