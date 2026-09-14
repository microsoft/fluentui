import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { TagGroupContextProvider } from '../../contexts/tagGroupContext';
import type { TagGroupContextValue } from '../../contexts/tagGroupContext';
import { useInteractionTag_unstable, useInteractionTagBase_unstable } from './useInteractionTag';

const wrap = (
  contextOverrides: TagGroupContextValue = {
    handleTagDismiss: () => ({}),
    size: 'medium',
  },
): React.FC<{ children?: React.ReactNode }> => {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TagGroupContextProvider value={contextOverrides}>{children}</TagGroupContextProvider>
  );
  return Wrapper;
};

describe('useInteractionTag_unstable', () => {
  it('should add design-only fields (appearance, shape, size) on top of the base state', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(
      () => useInteractionTag_unstable({ appearance: 'outline', shape: 'circular', size: 'small' }, ref),
      {
        wrapper: wrap(),
      },
    );

    expect(result.current.appearance).toBe('outline');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('small');
  });

  it('should default appearance to filled and shape to rounded', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useInteractionTag_unstable({}, ref), { wrapper: wrap() });

    expect(result.current.appearance).toBe('filled');
    expect(result.current.shape).toBe('rounded');
  });

  it('should inherit appearance and size from TagGroupContext when not set on props', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useInteractionTag_unstable({}, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'extra-small', appearance: 'brand' }),
    });

    expect(result.current.appearance).toBe('brand');
    expect(result.current.size).toBe('extra-small');
  });
});

describe('useInteractionTagBase_unstable', () => {
  it('should force disabled when TagGroupContext.disabled is true regardless of props', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useInteractionTagBase_unstable({ disabled: false }, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'medium', disabled: true }),
    });
    expect(result.current.disabled).toBe(true);
  });

  it('should derive selected from props OR context.selectedValues containing the tag value', () => {
    const ref = React.createRef<HTMLDivElement>();

    const propSelected = renderHook(() => useInteractionTagBase_unstable({ selected: true, value: 'a' }, ref), {
      wrapper: wrap(),
    });
    expect(propSelected.result.current.selected).toBe(true);

    const contextSelected = renderHook(() => useInteractionTagBase_unstable({ value: 'a' }, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'medium', selectedValues: ['a'] }),
    });
    expect(contextSelected.result.current.selected).toBe(true);

    const notSelected = renderHook(() => useInteractionTagBase_unstable({ value: 'b' }, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'medium', selectedValues: ['a'] }),
    });
    expect(notSelected.result.current.selected).toBe(false);
  });

  it('should generate interactionTagPrimaryId for use by aria-labelledby', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useInteractionTagBase_unstable({}, ref), { wrapper: wrap() });

    expect(result.current.interactionTagPrimaryId).toEqual(expect.stringMatching(/^fui-InteractionTagPrimary-/));
  });
});
