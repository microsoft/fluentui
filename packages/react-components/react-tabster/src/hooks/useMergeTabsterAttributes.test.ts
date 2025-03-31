import { renderHook } from '@testing-library/react-hooks';
import { useMergedTabsterAttributes_unstable } from './useMergeTabsterAttributes';

describe('useMergedTabsterAttributes', () => {
  it('should merge tabster attributes', () => {
    const { result } = renderHook(() =>
      useMergedTabsterAttributes_unstable(
        { 'data-tabster': '{"a":"1"}' },
        { 'data-tabster': '{"b":"2"}' },
        { 'data-tabster': '{"c":"3"}' },
      ),
    );
    expect(result.current).toEqual({ 'data-tabster': '{"a":"1","b":"2","c":"3"}' });
  });
  it('should merge tabster attributes, the order of attributes matters, the latter has priority', () => {
    const { result } = renderHook(() =>
      useMergedTabsterAttributes_unstable(
        { 'data-tabster': '{"a":"1"}' },
        { 'data-tabster': '{"a":"2"}' },
        { 'data-tabster': '{"a":"3"}' },
      ),
    );
    expect(result.current).toEqual({ 'data-tabster': '{"a":"3"}' });
  });
  it('should return an object with an empty tabster attribute if no attribute is provided', () => {
    const { result } = renderHook(() => useMergedTabsterAttributes_unstable());
    expect(result.current).toEqual({ 'data-tabster': undefined });
  });

  it('should ignore undefined/null values', () => {
    const { result } = renderHook(() =>
      useMergedTabsterAttributes_unstable(
        { 'data-tabster': '{"a":"1"}' },
        null,
        { 'data-tabster': '{"b":"2"}' },
        undefined,
        { 'data-tabster': '{"c":"3"}' },
      ),
    );
    expect(result.current).toEqual({ 'data-tabster': '{"a":"1","b":"2","c":"3"}' });
  });
});
