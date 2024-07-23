/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { renderHook } from '@testing-library/react-hooks';
import { useAnimateAtoms } from './useAnimateAtoms';

describe('useAnimateAtoms (node)', () => {
  it('handles node/server environments', () => {
    const { result } = renderHook(() => useAnimateAtoms());

    expect(result.current).toBeInstanceOf(Function);
  });
});

export {};
