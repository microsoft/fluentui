import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useEventCallback } from './useEventCallback';

describe('useEventCallback', () => {
  it('should not invalidate after rerender on unstable props', () => {
    // Arrange
    let unstableProp = [1, 1];
    const callback = () => unstableProp.reduce((acc, item) => acc + item, 0);

    // Act
    const { result, rerender } = renderHook(() => useEventCallback(callback));
    const firstRender = result.current;
    const firstRenderResult = firstRender();
    unstableProp = [1, 1, 1];
    rerender();
    const secondRender = result.current;
    const secondRenderResult = secondRender();

    // Assert
    expect(firstRender).toBe(secondRender);
    expect(firstRenderResult).toBe(2);
    expect(secondRenderResult).toBe(3);
  });

  it('should not invalidate after rerender on unstable callback', () => {
    // Arrange
    const prop = [1, 1];
    let unstableCallback = () => prop.reduce((acc, item) => acc + item, 0);

    // Act
    const { result, rerender } = renderHook(() => useEventCallback(unstableCallback));
    const firstRender = result.current;
    const firstRenderResult = firstRender();
    unstableCallback = () => prop.reduce((acc, item) => (acc + item) * 0, 0);
    rerender();
    const secondRender = result.current;
    const secondRenderResult = secondRender();

    // Assert
    expect(firstRender).toBe(secondRender);
    expect(firstRenderResult).toBe(2);
    expect(secondRenderResult).toBe(0);
  });

  it('should run before other layout effects', () => {
    // Arrange
    const useTestHook = () => {
      const callback = useEventCallback(jest.fn());
      // eslint-disable-next-line no-restricted-properties
      React.useLayoutEffect(() => callback(), [callback]);
    };

    // Act
    const { result } = renderHook(() => useTestHook());

    // Assert
    expect(result.error).toBeUndefined();
  });
});
