import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createContext } from './createContext';
import { useHasParentContext } from './useHasParentContext';

const TestContext = createContext<number>(1);

describe('useHasParentContext', () => {
  it('should return true if wrapped with context', () => {
    // Arrange
    const wrapper: React.FC = ({ children }) => <TestContext.Provider value={1}>{children}</TestContext.Provider>;
    const { result } = renderHook(() => useHasParentContext(TestContext), { wrapper });

    // Assert
    expect(result.current).toBe(true);
  });

  it('should return true if not wrapped with context', () => {
    // Arrange
    const { result } = renderHook(() => useHasParentContext(TestContext));

    // Assert
    expect(result.current).toBe(false);
  });
});
