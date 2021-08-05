import { renderHook } from '@testing-library/react-hooks';
import { resetIdsForTests, useId } from './useId';

describe('useId', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('uses prefix', () => {
    const { result } = renderHook(() => useId('foo'));

    expect(result.current).toBeDefined();
    expect(result.current).toMatch(/^foo/);
  });

  it('uses the same ID without prefix', () => {
    const { result, rerender } = renderHook(() => useId());
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('uses the same ID with prefix', () => {
    const { result, rerender } = renderHook(() => useId('foo'));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});
