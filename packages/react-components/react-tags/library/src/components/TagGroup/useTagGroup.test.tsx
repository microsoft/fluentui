import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';

import { useTagGroup_unstable, useTagGroupBase_unstable } from './useTagGroup';
import type { TagGroupBaseProps } from './TagGroup.types';

describe('useTagGroup_unstable', () => {
  it('should default size to medium and appearance to filled', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroup_unstable({}, ref));

    expect(result.current.size).toBe('medium');
    expect(result.current.appearance).toBe('filled');
  });

  it('should spread Tabster arrow-navigation attributes onto root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroup_unstable({}, ref));

    expect(result.current.root).toHaveProperty('data-tabster', expect.any(String));
  });

  it('should default role to toolbar', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroup_unstable({}, ref));
    expect(result.current.role).toBe('toolbar');
    expect(result.current.root.role).toBe('toolbar');
  });
});

describe('useTagGroupBase_unstable', () => {
  it('should NOT include arrow-navigation props by default (true headless mode)', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({}, ref));
    expect(result.current.root).not.toHaveProperty('data-tabster');
  });

  it('should spread arrow-navigation attributes onto root when passed via props', () => {
    const ref = React.createRef<HTMLDivElement>();
    const arrowNavigationProps: TabsterDOMAttribute = { 'data-tabster': '{"mock":"value"}' };
    const { result } = renderHook(() =>
      useTagGroupBase_unstable({ ...arrowNavigationProps } as TagGroupBaseProps, ref),
    );

    expect(result.current.root).toHaveProperty('data-tabster', '{"mock":"value"}');
  });

  it('should call onDismiss when a tag is dismissed', () => {
    const onDismiss = jest.fn();
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({ onDismiss }, ref));

    const event = {} as React.MouseEvent;
    result.current.handleTagDismiss(event, { value: 'v1' });

    expect(onDismiss).toHaveBeenCalledWith(event, { value: 'v1' });
  });

  it('should set aria-disabled on the root when disabled', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagGroupBase_unstable({ disabled: true }, ref));
    expect(result.current.root['aria-disabled']).toBe(true);
  });

  it('should provide handleTagSelect only when onTagSelect is supplied', () => {
    const ref = React.createRef<HTMLDivElement>();
    const without = renderHook(() => useTagGroupBase_unstable({}, ref));
    expect(without.result.current.handleTagSelect).toBe(undefined);

    const onTagSelect = jest.fn();
    const withSelect = renderHook(() => useTagGroupBase_unstable({ onTagSelect }, ref));
    expect(withSelect.result.current.handleTagSelect).toEqual(expect.any(Function));
  });
});
