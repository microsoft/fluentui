import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ToolbarContext } from '../Toolbar/ToolbarContext';
import { useToolbarRadioButton_unstable } from './useToolbarRadioButton';
import type { ToolbarContextValue } from '../Toolbar/Toolbar.types';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';

const propsMock: ToolbarRadioButtonProps = {
  name: 'test-radio',
  value: 'test-value',
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

describe('useToolbarRadioButton_unstable', () => {
  let ref: React.RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLButtonElement>();
  });

  it('should return state with default props', () => {
    const { result } = renderHook(() => useToolbarRadioButton_unstable(propsMock, ref));

    expect(result.current).toMatchObject({
      appearance: 'subtle',
      checked: false,
      name: 'test-radio',
      value: 'test-value',
      size: 'medium',
      root: expect.objectContaining({
        role: 'radio',
        'aria-checked': false,
      }),
    });
    expect(result.current.root['aria-pressed']).toBeUndefined();
  });

  it('should reflect custom props and toolbar context in state', () => {
    const { result } = renderHook(
      () => useToolbarRadioButton_unstable({ ...propsMock, appearance: 'primary', size: 'small' }, ref),
      {
        wrapper: renderWithToolbarContext({ checkedValues: { 'test-radio': ['test-value'] }, size: 'large' }),
      },
    );

    expect(result.current).toMatchObject({
      appearance: 'primary',
      checked: true,
      name: 'test-radio',
      value: 'test-value',
      size: 'small',
      root: expect.objectContaining({
        role: 'radio',
        'aria-checked': true,
      }),
    });
  });

  it('should call onClick and toolbar radio handlers', () => {
    const handleRadio = jest.fn();
    const onClick = jest.fn();
    const { result } = renderHook(() => useToolbarRadioButton_unstable({ ...propsMock, onClick }, ref), {
      wrapper: renderWithToolbarContext({ handleRadio }),
    });
    const event = {} as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>;

    act(() => {
      result.current.root.onClick?.(event);
    });

    expect(handleRadio).toHaveBeenCalledWith(event, 'test-radio', 'test-value', false);
    expect(onClick).toHaveBeenCalledWith(event);
  });
});
