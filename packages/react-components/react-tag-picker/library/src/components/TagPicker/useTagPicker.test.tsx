import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useTagPicker_unstable } from './useTagPicker';
import type { TagPickerProps } from './TagPicker.types';

const trigger = <div />;
const popover = <div />;

const renderRoot = (props: Partial<TagPickerProps> = {}) =>
  renderHook(() => useTagPicker_unstable({ children: [trigger, popover], ...props } as TagPickerProps));

describe('useTagPicker_unstable', () => {
  it('defaults size to "medium", inline to false, and noPopover to false', () => {
    const { result } = renderRoot();
    expect(result.current.size).toBe('medium');
    expect(result.current.inline).toBe(false);
    expect(result.current.noPopover).toBe(false);
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
});
