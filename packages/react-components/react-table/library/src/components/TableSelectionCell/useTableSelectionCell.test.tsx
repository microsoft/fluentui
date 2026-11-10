// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';
import { useTableSelectionCell_unstable } from './useTableSelectionCell';

describe('useTableSelectionCell_unstable', () => {
  it('defaults to an unchecked checkbox selector', () => {
    const { result } = renderHook(() => useTableSelectionCell_unstable({}, React.createRef()));

    expect(result.current.type).toBe('checkbox');
    expect(result.current.checked).toBe(false);
    expect(result.current.subtle).toBe(false);
    expect(result.current.hidden).toBe(false);
    expect(result.current.components.checkboxIndicator).toBe(Checkbox);
    expect(result.current.components.radioIndicator).toBe(Radio);
    expect(result.current.checkboxIndicator).toBeDefined();
    expect(result.current.radioIndicator).toBeUndefined();
  });

  it('renders the radio indicator for type radio', () => {
    const { result } = renderHook(() =>
      useTableSelectionCell_unstable({ type: 'radio', checked: true }, React.createRef()),
    );

    expect(result.current.checkboxIndicator).toBeUndefined();
    expect(result.current.radioIndicator).toBeDefined();
    expect(result.current.radioIndicator?.checked).toBe(true);
    expect(result.current.radioIndicator?.input).toEqual(
      expect.objectContaining({ name: expect.stringContaining('table-selection-radio') }),
    );
  });

  it('passes checked to the checkbox indicator, including the mixed state', () => {
    const { result } = renderHook(() => useTableSelectionCell_unstable({ checked: 'mixed' }, React.createRef()));

    expect(result.current.checked).toBe('mixed');
    expect(result.current.checkboxIndicator?.checked).toBe('mixed');
  });

  it('does not render the radio indicator when invisible, and marks the cell hidden', () => {
    const { result } = renderHook(() =>
      useTableSelectionCell_unstable({ type: 'radio', invisible: true }, React.createRef()),
    );

    expect(result.current.radioIndicator).toBeUndefined();
    expect(result.current.hidden).toBe(true);
  });

  it('marks the cell hidden for the deprecated `hidden` prop', () => {
    const { result } = renderHook(() => useTableSelectionCell_unstable({ hidden: true }, React.createRef()));

    expect(result.current.hidden).toBe(true);
  });

  it('forwards subtle', () => {
    const { result } = renderHook(() => useTableSelectionCell_unstable({ subtle: true }, React.createRef()));

    expect(result.current.subtle).toBe(true);
  });
});
