import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { TagGroupContextProvider } from '../../contexts/tagGroupContext';
import type { TagGroupContextValue } from '../../contexts/tagGroupContext';
import { useTag_unstable, useTagBase_unstable } from './useTag';

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

describe('useTag_unstable', () => {
  it.each([true, false])('should %s attach click event handler for tag when dismissible:$dismissible', dismissible => {
    // onClick handler should be added only when dismissible is true.
    // This is because Voice Over + Safari and NVDA + Chrome will announce 'clickable' if a click handler is attached.
    // We don't want 'clickable' announcement when Tag is a simple span and not dismissible.

    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTag_unstable({ dismissible }, ref), { wrapper: wrap() });
    if (dismissible) {
      expect(result.current.root.onClick).toEqual(expect.any(Function));
    } else {
      expect(result.current.root).not.toHaveProperty('onClick');
    }
  });

  it('should add design-only fields (appearance, shape, size, avatar*) on top of the base state', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(
      () => useTag_unstable({ appearance: 'outline', shape: 'circular', size: 'small' }, ref),
      {
        wrapper: wrap(),
      },
    );

    expect(result.current.appearance).toBe('outline');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('small');
    expect(result.current.avatarShape).toBe('circular');
    expect(result.current.avatarSize).toBe(20);
  });

  it('should inject DismissRegular as default dismissIcon children when dismissible', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTag_unstable({ dismissible: true }, ref), { wrapper: wrap() });

    expect(result.current.dismissIcon).toBeDefined();
    expect(React.isValidElement(result.current.dismissIcon?.children)).toBe(true);
  });

  it('should inherit appearance and size from TagGroupContext when not set on props', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTag_unstable({}, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'extra-small', appearance: 'brand' }),
    });

    expect(result.current.appearance).toBe('brand');
    expect(result.current.size).toBe('extra-small');
  });
});

describe('useTagBase_unstable', () => {
  it('should NOT attach onClick/onKeyDown handlers when not dismissible', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTagBase_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root).not.toHaveProperty('onClick');
    expect(result.current.root).not.toHaveProperty('onKeyDown');
  });

  it('should attach onClick/onKeyDown handlers when dismissible', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTagBase_unstable({ dismissible: true }, ref), { wrapper: wrap() });
    const root = result.current.root as React.ButtonHTMLAttributes<HTMLButtonElement>;
    expect(root.onClick).toEqual(expect.any(Function));
    expect(root.onKeyDown).toEqual(expect.any(Function));
    expect(root.type).toBe('button');
  });

  it('should set aria-selected when TagGroupContext role is listbox', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTagBase_unstable({ selected: true }, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'medium', role: 'listbox' }),
    });
    expect(result.current.root['aria-selected']).toBe(true);
    expect(result.current.root.role).toBe('option');
  });

  it('should use aria-pressed when selected is a boolean and TagGroupContext role is not listbox', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTagBase_unstable({ selected: true }, ref), { wrapper: wrap() });
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('should force disabled when TagGroupContext.disabled is true regardless of props', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTagBase_unstable({ disabled: false, dismissible: true }, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'medium', disabled: true }),
    });
    expect(result.current.disabled).toBe(true);
    const root = result.current.root as React.ButtonHTMLAttributes<HTMLButtonElement>;
    expect(root.disabled).toBe(true);
  });

  it('should inherit dismissible from TagGroupContext when not set on props', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTagBase_unstable({}, ref), {
      wrapper: wrap({ handleTagDismiss: () => ({}), size: 'medium', dismissible: true }),
    });
    expect(result.current.dismissible).toBe(true);
    const root = result.current.root as React.ButtonHTMLAttributes<HTMLButtonElement>;
    expect(root.type).toBe('button');
  });
});
