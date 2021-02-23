import { renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useEffectAfterMount } from './useEffectAfterMount';

function useMountTest(valueOverride: unknown) {
  const [value, setValue] = useState<unknown>(undefined);

  useEffectAfterMount(() => {
    setValue(valueOverride);
  }, [valueOverride]);

  return value;
}

describe('useEffectAfterMount', () => {
  it('should run only after mount', () => {
    const { result, rerender } = renderHook(({ value }) => useMountTest(value), {
      initialProps: { value: 'ignored value' },
    });
    expect(result.current).toBe(undefined);
    rerender({ value: 'value' });
    expect(result.current).toBe('value');
  });
});
