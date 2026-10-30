// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTable_unstable } from './useTable';

describe('useTable_unstable', () => {
  it('renders a native table by default', () => {
    const { result } = renderHook(() => useTable_unstable({}, React.createRef()));

    expect(result.current.components.root).toBe('table');
    expect(result.current.root.role).toBeUndefined();
    expect(result.current.size).toBe('medium');
    expect(result.current.noNativeElements).toBe(false);
    expect(result.current.sortable).toBe(false);
  });

  it('renders a div with the table role when `noNativeElements` is set', () => {
    const { result } = renderHook(() => useTable_unstable({ noNativeElements: true }, React.createRef()));

    expect(result.current.components.root).toBe('div');
    expect(result.current.root.role).toBe('table');
    expect(result.current.noNativeElements).toBe(true);
  });

  it('prefers an explicit `as` over the native element', () => {
    const { result } = renderHook(() => useTable_unstable({ as: 'div' }, React.createRef()));

    expect(result.current.components.root).toBe('div');
    expect(result.current.root.role).toBe('table');
  });

  it('forwards size and sortable', () => {
    const { result } = renderHook(() => useTable_unstable({ size: 'small', sortable: true }, React.createRef()));

    expect(result.current.size).toBe('small');
    expect(result.current.sortable).toBe(true);
  });

  it('lets a consumer role override the default role', () => {
    const { result } = renderHook(() => useTable_unstable({ noNativeElements: true, role: 'grid' }, React.createRef()));

    expect(result.current.root.role).toBe('grid');
  });

  it('assigns the ref to the root slot', () => {
    const ref = React.createRef<HTMLElement>();
    const { result } = renderHook(() => useTable_unstable({}, ref));

    expect(result.current.root.ref).toBe(ref);
  });
});
