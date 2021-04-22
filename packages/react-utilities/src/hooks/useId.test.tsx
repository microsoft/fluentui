import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import { SSRProvider } from '../ssr/index';
import { useId } from './useId';

// Wrapping with SSRProvider allows to reset IDs between tests
const options: RenderHookOptions<{}> = { wrapper: SSRProvider };

describe('useId', () => {
  it('uses prefix', () => {
    const { result } = renderHook(() => useId('foo'), options);

    expect(result.current).toBeDefined();
    expect(result.current).toMatch(/^foo/);
  });

  it('uses the same ID without prefix', () => {
    const { result, rerender } = renderHook(() => useId(), options);
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('uses the same ID with prefix', () => {
    const { result, rerender } = renderHook(() => useId('foo'), options);
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});
