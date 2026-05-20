import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { InteractionTagContextProvider } from '../../contexts/interactionTagContext';
import type { InteractionTagContextValue } from '../../contexts/interactionTagContext';
import { useInteractionTagPrimary_unstable, useInteractionTagPrimaryBase_unstable } from './useInteractionTagPrimary';

const baseContext: InteractionTagContextValue = {
  appearance: 'filled',
  disabled: false,
  handleTagDismiss: () => ({}),
  interactionTagPrimaryId: 'fui-InteractionTagPrimary-_test_',
  selected: false,
  selectedValues: [],
  shape: 'rounded',
  size: 'medium',
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

describe('useInteractionTagPrimary_unstable', () => {
  it('should add design-only fields (appearance, shape, size, avatar*) on top of the base state', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagPrimary_unstable({}, ref), {
      wrapper: wrap({ appearance: 'brand', shape: 'circular', size: 'small' }),
    });

    expect(result.current.appearance).toBe('brand');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('small');
    expect(result.current.avatarShape).toBe('circular');
    expect(result.current.avatarSize).toBe(20);
  });
});

describe('useInteractionTagPrimaryBase_unstable', () => {
  it('should render root with the interactionTagPrimaryId from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagPrimaryBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.id).toBe('fui-InteractionTagPrimary-_test_');
  });

  it('should NOT expose design-only fields (appearance/shape/size/avatar*) on base state', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagPrimaryBase_unstable({}, ref), { wrapper: wrap() });

    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current).not.toHaveProperty('shape');
    expect(result.current).not.toHaveProperty('size');
    expect(result.current).not.toHaveProperty('avatarShape');
    expect(result.current).not.toHaveProperty('avatarSize');
  });

  it('should set aria-pressed when context has handleTagSelect (selectable group)', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagPrimaryBase_unstable({}, ref), {
      wrapper: wrap({ selected: true, handleTagSelect: () => ({}) }),
    });
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('should NOT set aria-pressed when context has no handleTagSelect', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagPrimaryBase_unstable({}, ref), {
      wrapper: wrap({ selected: true, handleTagSelect: undefined }),
    });
    expect(result.current.root).not.toHaveProperty('aria-pressed');
  });

  it('should default hasSecondaryAction to false', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useInteractionTagPrimaryBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.hasSecondaryAction).toBe(false);
  });
});
