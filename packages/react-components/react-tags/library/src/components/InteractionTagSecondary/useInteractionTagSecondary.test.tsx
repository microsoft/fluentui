import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { InteractionTagContextProvider } from '../../contexts/interactionTagContext';
import {
  useInteractionTagSecondary_unstable,
  useInteractionTagSecondaryBase_unstable,
} from './useInteractionTagSecondary';

const baseContext = {
  appearance: 'filled' as const,
  disabled: false,
  handleTagDismiss: () => ({}),
  interactionTagPrimaryId: 'fui-InteractionTagPrimary-_test_',
  selected: false,
  selectedValues: [],
  shape: 'rounded' as const,
  size: 'medium' as const,
  value: 'test',
};

const wrap = (
  overrides: Partial<Parameters<typeof InteractionTagContextProvider>[0]['value']> = {},
): React.FC<{ children?: React.ReactNode }> => {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <InteractionTagContextProvider value={{ ...baseContext, ...overrides }}>{children}</InteractionTagContextProvider>
  );
  return Wrapper;
};

describe('useInteractionTagSecondary_unstable', () => {
  it('should inject DismissRegular as default root children', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondary_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.children).toBeDefined();
  });

  it('should preserve user-provided children instead of the default DismissRegular', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondary_unstable({ children: 'X' }, ref), {
      wrapper: wrap(),
    });
    expect(result.current.root.children).toBe('X');
  });

  it('should inherit appearance/shape/size from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondary_unstable({}, ref), {
      wrapper: wrap({ appearance: 'outline', shape: 'circular', size: 'small' }),
    });
    expect(result.current.appearance).toBe('outline');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('small');
  });
});

describe('useInteractionTagSecondaryBase_unstable', () => {
  it('should render root with type="button"', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondaryBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.type).toBe('button');
  });

  it('should NOT inject DismissRegular children by default (icon injection lives in the styled hook)', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondaryBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.children).toBeUndefined();
  });

  it('should attach onClick and onKeyDown handlers', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondaryBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.onClick).toBeDefined();
    expect(result.current.root.onKeyDown).toBeDefined();
  });

  it('should build aria-labelledby from interactionTagPrimaryId and own id', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondaryBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root['aria-labelledby']).toEqual(
      expect.stringMatching(/^fui-InteractionTagPrimary-_test_ fui-InteractionTagSecondary-/),
    );
  });

  it('should NOT expose design-only fields (appearance/shape/size)', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondaryBase_unstable({}, ref), { wrapper: wrap() });
    expect((result.current as unknown as { appearance?: unknown }).appearance).toBeUndefined();
    expect((result.current as unknown as { shape?: unknown }).shape).toBeUndefined();
    expect((result.current as unknown as { size?: unknown }).size).toBeUndefined();
  });

  it('should call handleTagDismiss on Delete/Backspace keyDown via context', () => {
    const handleTagDismiss = jest.fn();
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagSecondaryBase_unstable({}, ref), {
      wrapper: wrap({ handleTagDismiss, value: 'val' }),
    });

    const event = { key: 'Delete', defaultPrevented: false } as unknown as React.KeyboardEvent<HTMLButtonElement>;
    result.current.root.onKeyDown?.(event);

    expect(handleTagDismiss).toHaveBeenCalledWith(event, { value: 'val' });
  });
});
