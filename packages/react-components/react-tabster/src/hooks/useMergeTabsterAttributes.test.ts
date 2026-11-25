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

  describe('dynamic attributes at runtime', () => {
    it('should recompute when an attribute value changes', () => {
      const { result, rerender } = renderHook(
        ({ value }: { value: string }) => useMergedTabsterAttributes_unstable({ 'data-tabster': value }),
        { initialProps: { value: '{"a":"1"}' } },
      );
      expect(result.current).toEqual({ 'data-tabster': '{"a":"1"}' });

      rerender({ value: '{"a":"2"}' });
      expect(result.current).toEqual({ 'data-tabster': '{"a":"2"}' });
    });

    it('should recompute when the number of attributes grows', () => {
      const { result, rerender } = renderHook(
        ({ attrs }: { attrs: Array<{ 'data-tabster': string } | null> }) =>
          useMergedTabsterAttributes_unstable(...attrs),
        { initialProps: { attrs: [{ 'data-tabster': '{"a":"1"}' }] as Array<{ 'data-tabster': string } | null> } },
      );
      expect(result.current).toEqual({ 'data-tabster': '{"a":"1"}' });

      rerender({ attrs: [{ 'data-tabster': '{"a":"1"}' }, { 'data-tabster': '{"b":"2"}' }] });
      expect(result.current).toEqual({ 'data-tabster': '{"a":"1","b":"2"}' });
    });

    it('should recompute when the number of attributes shrinks', () => {
      const { result, rerender } = renderHook(
        ({ attrs }: { attrs: Array<{ 'data-tabster': string } | null> }) =>
          useMergedTabsterAttributes_unstable(...attrs),
        {
          initialProps: {
            attrs: [{ 'data-tabster': '{"a":"1"}' }, { 'data-tabster': '{"b":"2"}' }] as Array<{
              'data-tabster': string;
            } | null>,
          },
        },
      );
      expect(result.current).toEqual({ 'data-tabster': '{"a":"1","b":"2"}' });

      rerender({ attrs: [{ 'data-tabster': '{"a":"1"}' }, null] });
      expect(result.current).toEqual({ 'data-tabster': '{"a":"1"}' });
    });

    it('should return a stable reference when attributes do not change', () => {
      const { result, rerender } = renderHook(
        ({ value }: { value: string }) => useMergedTabsterAttributes_unstable({ 'data-tabster': value }),
        { initialProps: { value: '{"a":"1"}' } },
      );
      const first = result.current;

      rerender({ value: '{"a":"1"}' });
      expect(result.current).toBe(first);
    });
  });
});
