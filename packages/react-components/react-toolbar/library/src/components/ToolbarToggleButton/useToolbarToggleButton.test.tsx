import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ToolbarContext } from '../Toolbar/ToolbarContext';
import { useToolbarToggleButton_unstable } from './useToolbarToggleButton';
import type { ToolbarContextValue } from '../Toolbar/Toolbar.types';
import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';

const propsMock: ToolbarToggleButtonProps = {
  name: 'text',
  value: 'bold',
};

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

describe('useToolbarToggleButton_unstable', () => {
  let ref: React.RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLButtonElement>();
  });

  it('should return state with default props', () => {
    const { result } = renderHook(() => useToolbarToggleButton_unstable(propsMock, ref));

    expect(result.current).toMatchObject({
      appearance: 'secondary',
      checked: false,
      name: 'text',
      size: 'medium',
      shape: 'rounded',
      value: 'bold',
    });
  });

  it('should reflect custom props and toolbar context in state', () => {
    const { result } = renderHook(
      () => useToolbarToggleButton_unstable({ ...propsMock, appearance: 'primary', size: 'small' }, ref),
      {
        wrapper: renderWithToolbarContext({ checkedValues: { text: ['bold'] } }),
      },
    );

    expect(result.current).toMatchObject({
      appearance: 'secondary',
      checked: true,
      name: 'text',
      size: 'small',
      shape: 'rounded',
      value: 'bold',
    });
  });

  it('should call onClick and toolbar toggle handlers', () => {
    const handleToggleButton = jest.fn();
    const onClick = jest.fn();
    const { result } = renderHook(() => useToolbarToggleButton_unstable({ ...propsMock, onClick }, ref), {
      wrapper: renderWithToolbarContext({ handleToggleButton }),
    });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>;

    act(() => {
      result.current.root.onClick?.(event);
    });

    expect(handleToggleButton).toHaveBeenCalledWith(event, 'text', 'bold', false);
    expect(onClick).toHaveBeenCalledWith(event);
  });
});
