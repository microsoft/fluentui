import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ButtonContextProvider } from '../../contexts/ButtonContext';
import type { ButtonContextValue } from '../../contexts/ButtonContext';
import { useCompoundButton_unstable } from './useCompoundButton';

const wrap = (contextValue: ButtonContextValue = {}): React.ComponentType<{ children?: React.ReactNode }> => {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <ButtonContextProvider value={contextValue}>{children}</ButtonContextProvider>;
  }

  return Wrapper;
};

describe('useCompoundButton_unstable', () => {
  it('returns the resolved CompoundButton components shape', () => {
    const { result } = renderHook(() => useCompoundButton_unstable({}, React.createRef()));

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({
      root: 'button',
      icon: 'span',
      contentContainer: 'span',
      secondaryContent: 'span',
    });
  });

  it('uses the default root element and icon position and normalizes content slots', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable({ children: 'Primary', secondaryContent: 'Secondary' }, React.createRef()),
    );

    expect(result.current.root.type).toBe('button');
    expect(result.current.iconPosition).toBe('before');
    expect(result.current.contentContainer).toBeDefined();
    expect(result.current.contentContainer.children).toBeUndefined();
    expect(result.current.secondaryContent).toMatchObject({ children: 'Secondary' });
  });

  it('normalizes secondaryContent string shorthand', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable({ secondaryContent: 'Secondary' }, React.createRef()),
    );

    expect(result.current.secondaryContent).toMatchObject({ children: 'Secondary' });
  });

  it('normalizes secondaryContent React element shorthand', () => {
    const secondaryContent = <strong>Secondary</strong>;
    const { result } = renderHook(() => useCompoundButton_unstable({ secondaryContent }, React.createRef()));

    expect(result.current.secondaryContent).toMatchObject({ children: secondaryContent });
  });

  it('normalizes secondaryContent slot-object shorthand', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable(
        { secondaryContent: { children: 'Secondary', className: 'custom-secondary' } },
        React.createRef(),
      ),
    );

    expect(result.current.secondaryContent).toMatchObject({
      children: 'Secondary',
      className: 'custom-secondary',
    });
  });

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

  it('returns disabled and disabledFocusable state', () => {
    const { result } = renderHook(() =>
      useCompoundButton_unstable({ disabled: true, disabledFocusable: true }, React.createRef()),
    );

    expect(result.current.disabled).toBe(true);
    expect(result.current.disabledFocusable).toBe(true);
  });

  it('places the provided ref on the resolved root slot', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useCompoundButton_unstable({}, ref));

    expect(result.current.root.ref).toBe(ref);
  });
});
