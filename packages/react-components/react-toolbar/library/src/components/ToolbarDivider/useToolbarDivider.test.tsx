import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { ToolbarContext } from '../Toolbar/ToolbarContext';
import { useToolbarDivider_unstable } from './useToolbarDivider';
import type { ToolbarContextValue } from '../Toolbar/Toolbar.types';

const renderWithToolbarContext = (contextValue: Partial<ToolbarContextValue>) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ToolbarContext.Provider
      value={{
        size: 'medium',
        vertical: false,
        checkedValues: {},
        handleToggleButton: () => null,
        handleRadio: () => null,
        ...contextValue,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );

  return wrapper;
};

describe('useToolbarDivider_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('should return state with default props', () => {
    const { result } = renderHook(() => useToolbarDivider_unstable({}, ref));

    expect(result.current).toMatchObject({
      appearance: 'default',
      alignContent: 'center',
      inset: false,
      vertical: true,
    });
  });

  it('should reflect custom props and toolbar context in state', () => {
    const { result } = renderHook(() => useToolbarDivider_unstable({}, ref), {
      wrapper: renderWithToolbarContext({ vertical: true }),
    });

    expect(result.current).toMatchObject({
      appearance: 'default',
      alignContent: 'center',
      inset: false,
      vertical: false,
    });
  });
});
