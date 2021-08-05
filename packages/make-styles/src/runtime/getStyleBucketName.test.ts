import { getStyleBucketName } from './getStyleBucketName';

describe('getStyleBucketName', () => {
  it('returns bucketName based on mapping', () => {
    expect(getStyleBucketName(' :link', '', '')).toBe('l');
    expect(getStyleBucketName(' :hover ', '', '')).toBe('h');

    expect(getStyleBucketName(':link', '', '')).toBe('l');
    expect(getStyleBucketName(':visited', '', '')).toBe('v');
    expect(getStyleBucketName(':focus-within', '', '')).toBe('w');
    expect(getStyleBucketName(':focus', '', '')).toBe('f');
    expect(getStyleBucketName(':focus-visible', '', '')).toBe('i');
    expect(getStyleBucketName(':hover', '', '')).toBe('h');
    expect(getStyleBucketName(':active', '', '')).toBe('a');

    expect(getStyleBucketName(':active', '(max-width: 100px)', '')).toBe('t');
    expect(getStyleBucketName(':active', '', '(display: table-cell)')).toBe('t');
  });
});
