import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ButtonContextProvider } from '../../contexts/ButtonContext';
import type { ButtonContextValue } from '../../contexts/ButtonContext';
import { useCompoundButton_unstable } from './useCompoundButton';

const wrap = (contextValue: ButtonContextValue = {}): React.ComponentType<{ children?: React.ReactNode }> => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <ButtonContextProvider value={contextValue}>{children}</ButtonContextProvider>
  );

  return wrapper;
};

describe('useCompoundButton_unstable', () => {
  it('sets iconOnly true when an icon has no primary or secondary content', () => {
    const { result } = renderHook(() => useCompoundButton_unstable({ icon: <span /> }, React.createRef()));

    expect(result.current.iconOnly).toBe(true);
  });

  it('sets iconOnly false when primary children exist', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable({ icon: <span />, children: 'Primary' }, React.createRef()),
    );

    expect(result.current.iconOnly).toBe(false);
  });

  it('sets iconOnly false when secondary content has children but primary children do not', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable({ icon: <span />, secondaryContent: { children: 'Secondary' } }, React.createRef()),
    );

    expect(result.current.iconOnly).toBe(false);
  });

  it('keeps iconOnly true for an icon with an empty secondary content slot', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable({ icon: <span />, secondaryContent: {} }, React.createRef()),
    );

    expect(result.current.secondaryContent).toBeDefined();
    expect(result.current.secondaryContent?.children).toBeUndefined();
    expect(result.current.iconOnly).toBe(true);
  });

  it('applies default styled values inherited from Button', () => {
    const { result } = renderHook(() => useCompoundButton_unstable({}, React.createRef()));

    expect(result.current.appearance).toBe('secondary');
    expect(result.current.shape).toBe('rounded');
    expect(result.current.size).toBe('medium');
  });

  it('honors explicit styled values and icon position', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable(
        { appearance: 'primary', shape: 'circular', size: 'large', iconPosition: 'after' },
        React.createRef(),
      ),
    );

    expect(result.current.appearance).toBe('primary');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('large');
    expect(result.current.iconPosition).toBe('after');
  });

  it('inherits size from ButtonContext when no size prop is supplied', () => {
    const { result } = renderHook(() => useCompoundButton_unstable({}, React.createRef()), {
      wrapper: wrap({ size: 'small' }),
    });

    expect(result.current.size).toBe('small');
  });

  it('allows explicit size to override ButtonContext', () => {
    const { result } = renderHook(() => useCompoundButton_unstable({ size: 'large' }, React.createRef()), {
      wrapper: wrap({ size: 'small' }),
    });

    expect(result.current.size).toBe('large');
  });
});
