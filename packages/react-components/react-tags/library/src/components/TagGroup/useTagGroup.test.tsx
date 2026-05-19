import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';

import { useTagGroup_unstable, useTagGroupBase_unstable } from './useTagGroup';

// Slot props are a discriminated union that doesn't expose `data-*` index access at
// the type level; cast to a plain record for the data-attribute assertions below.
type RootRecord = Record<string, unknown>;

describe('useTagGroup_unstable', () => {
  it('should default size to medium and appearance to filled', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroup_unstable({}, ref));

    expect(result.current.size).toBe('medium');
    expect(result.current.appearance).toBe('filled');
  });

  it('should spread Tabster arrow-navigation attributes onto root (via UseTagGroupBaseOptions)', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroup_unstable({}, ref));

    // useTagGroup_unstable wires up useArrowNavigationGroup via the base hook's
    // arrowNavigationProps option; Tabster's contract is a data-tabster attribute.
    expect((result.current.root as RootRecord)['data-tabster']).toBeDefined();
  });

  it('should default role to toolbar', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroup_unstable({}, ref));
    expect(result.current.role).toBe('toolbar');
    expect(result.current.root.role).toBe('toolbar');
  });
});

describe('useTagGroupBase_unstable', () => {
  it('should NOT include arrow-navigation props when options omitted (true headless mode)', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({}, ref));
    expect((result.current.root as RootRecord)['data-tabster']).toBeUndefined();
  });

  it('should spread arrowNavigationProps option onto root when supplied', () => {
    const ref = React.createRef<HTMLDivElement>();
    const arrowNavigationProps: TabsterDOMAttribute = { 'data-tabster': '{"mock":"value"}' };
    const { result } = renderHook(() => useTagGroupBase_unstable({}, ref, { arrowNavigationProps }));

    expect((result.current.root as RootRecord)['data-tabster']).toBe('{"mock":"value"}');
  });

  it('should call onAfterTagDismiss with the group container after a tag is dismissed', () => {
    const onAfterTagDismiss = jest.fn();
    const onDismiss = jest.fn();
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({ onDismiss }, ref, { onAfterTagDismiss }));

    const event = {} as React.MouseEvent;
    result.current.handleTagDismiss(event, { value: 'v1' });

    expect(onDismiss).toHaveBeenCalledWith(event, { value: 'v1' });
    // innerRef hasn't been attached to a DOM node in the renderHook environment,
    // so the container argument is null - we still expect the callback to be invoked.
    expect(onAfterTagDismiss).toHaveBeenCalledWith(null);
  });

  it('should NOT throw when onDismiss/onAfterTagDismiss are omitted (true headless mode)', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({}, ref));

    expect(() => result.current.handleTagDismiss({} as React.MouseEvent, { value: 'v1' })).not.toThrow();
  });

  it('should set aria-disabled on the root when disabled', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({ disabled: true }, ref));
    expect(result.current.root['aria-disabled']).toBe(true);
  });

  it('should NOT expose design-only fields (size, appearance) on base state', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({}, ref));
    expect((result.current as unknown as { size?: unknown }).size).toBeUndefined();
    expect((result.current as unknown as { appearance?: unknown }).appearance).toBeUndefined();
  });

  it('should provide handleTagSelect only when onTagSelect is supplied', () => {
    const ref = React.createRef<HTMLDivElement>();
    const without = renderHook(() => useTagGroupBase_unstable({}, ref));
    expect(without.result.current.handleTagSelect).toBeUndefined();

    const onTagSelect = jest.fn();
    const withSelect = renderHook(() => useTagGroupBase_unstable({ onTagSelect }, ref));
    expect(withSelect.result.current.handleTagSelect).toBeDefined();
  });
});
