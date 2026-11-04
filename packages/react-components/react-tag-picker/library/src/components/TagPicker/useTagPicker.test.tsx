import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useTagPicker_unstable } from './useTagPicker';
import type { TagPickerProps } from './TagPicker.types';

const trigger = <div />;
const popover = <div />;
const createSelectionEvent = (target: HTMLElement = document.createElement('button')) =>
  ({ type: 'click', target } as unknown as React.MouseEvent<HTMLElement>);

const dismissOption = (
  result: { current: ReturnType<typeof useTagPicker_unstable> },
  event: React.MouseEvent<HTMLElement>,
  value: string,
) => {
  const tagPickerGroup = document.createElement('div');
  tagPickerGroup.append(event.target as Node);
  Object.defineProperty(result.current.tagPickerGroupRef, 'current', { value: tagPickerGroup });

  result.current.selectOption(event, { id: 'dismissed-option', text: value, value });
};

const renderRoot = (props: Partial<TagPickerProps> = {}) =>
  renderHook(() => useTagPicker_unstable({ children: [trigger, popover], ...props } as TagPickerProps));

describe('useTagPicker_unstable', () => {
  it('defaults size to "medium", inline to false, noPopover to false, and selectionMode to "multiselect"', () => {
    const { result } = renderRoot();
    expect(result.current.size).toBe('medium');
    expect(result.current.inline).toBe(false);
    expect(result.current.noPopover).toBe(false);
    expect(result.current.selectionMode).toBe('multiselect');
  });

  it('defaults appearance to "outline"', () => {
    const { result } = renderRoot();
    expect(result.current.appearance).toBe('outline');
  });

  it('honors explicit size and inline props', () => {
    const { result } = renderRoot({ size: 'large', inline: true });
    expect(result.current.size).toBe('large');
    expect(result.current.inline).toBe(true);
  });

  it('honors an explicit appearance prop', () => {
    const { result } = renderRoot({ appearance: 'filled-darker' });
    expect(result.current.appearance).toBe('filled-darker');
  });

  it('honors an explicit selectionMode prop', () => {
    const { result } = renderRoot({ selectionMode: 'single' });
    expect(result.current.selectionMode).toBe('single');
  });

  it('generates a non-empty popoverId', () => {
    const { result } = renderRoot();
    expect(result.current.popoverId.length).toBeGreaterThan(0);
  });

  it('hides the popover when closed and unfocused', () => {
    const { result } = renderRoot({ defaultOpen: false });
    expect(result.current.open).toBe(false);
    expect(result.current.popover).toBeUndefined();
  });

  it('renders the popover when defaultOpen is true', () => {
    const { result } = renderRoot({ defaultOpen: true });
    expect(result.current.open).toBe(true);
    expect(result.current.popover).toBeDefined();
  });

  it('reflects controlled selectedOptions on state', () => {
    const { result } = renderRoot({ selectedOptions: ['apple', 'banana'] });
    expect(result.current.selectedOptions).toEqual(['apple', 'banana']);
  });

  it('preserves multiselect clear behavior when no options are selected', () => {
    const onOptionSelect = jest.fn();
    const event = createSelectionEvent();
    const { result } = renderRoot({ onOptionSelect });

    act(() => result.current.clearSelection(event));

    expect(onOptionSelect).toHaveBeenCalledWith(
      event,
      expect.objectContaining({ selectedOptions: [], value: undefined }),
    );
  });

  it('does not report the first selected value when clearing multiple options', () => {
    const onOptionSelect = jest.fn();
    const event = createSelectionEvent();
    const { result } = renderRoot({ defaultSelectedOptions: ['apple', 'banana'], onOptionSelect });

    act(() => result.current.clearSelection(event));

    expect(onOptionSelect).toHaveBeenCalledWith(
      event,
      expect.objectContaining({ selectedOptions: [], value: undefined }),
    );
  });

  it('clears the selected option when removing in single-select mode', () => {
    const onOptionSelect = jest.fn();
    const event = createSelectionEvent();
    const { result } = renderRoot({
      defaultSelectedOptions: ['apple'],
      onOptionSelect,
      selectionMode: 'single',
    });

    act(() => dismissOption(result, event, 'apple'));

    expect(onOptionSelect).toHaveBeenCalledWith(
      event,
      expect.objectContaining({ selectedOptions: [], value: 'apple' }),
    );
  });

  it('removes only the requested option in multiselect mode', () => {
    const onOptionSelect = jest.fn();
    const event = createSelectionEvent();
    const { result } = renderRoot({ defaultSelectedOptions: ['apple', 'banana'], onOptionSelect });

    act(() => dismissOption(result, event, 'banana'));

    expect(onOptionSelect).toHaveBeenCalledWith(
      event,
      expect.objectContaining({ selectedOptions: ['apple'], value: 'banana' }),
    );
  });
});
