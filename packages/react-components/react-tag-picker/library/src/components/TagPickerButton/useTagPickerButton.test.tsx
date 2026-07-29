import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { TagPickerContextProvider } from '../../contexts/TagPickerContext';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import { useTagPickerButton_unstable } from './useTagPickerButton';

const baseContext: TagPickerContextValue = {
  triggerRef: React.createRef<HTMLButtonElement>(),
  popoverRef: React.createRef<HTMLDivElement>(),
  targetRef: React.createRef<HTMLDivElement>(),
  tagPickerGroupRef: React.createRef<HTMLDivElement>(),
  secondaryActionRef: React.createRef<HTMLSpanElement>(),
  open: false,
  clearSelection: () => null,
  getOptionById: () => undefined,
  selectedOptions: [],
  selectOption: () => null,
  setHasFocus: () => null,
  setOpen: () => null,
  setValue: () => null,
  value: undefined,
  popoverId: 'button-popover-id',
  size: 'medium',
  appearance: 'outline',
  disabled: false,
};

const wrap = (overrides: Partial<TagPickerContextValue> = {}): React.FC<{ children?: React.ReactNode }> => {
  const value: TagPickerContextValue = { ...baseContext, ...overrides };
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TagPickerContextProvider value={value}>{children}</TagPickerContextProvider>
  );
  return Wrapper;
};

describe('useTagPickerButton_unstable', () => {
  it('defaults the button type to "button"', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useTagPickerButton_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.type).toBe('button');
  });

  it('inherits size from picker context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useTagPickerButton_unstable({}, ref), { wrapper: wrap({ size: 'large' }) });
    expect(result.current.size).toBe('large');
  });

  it('derives hasSelectedOption from picker selectedOptions length', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const empty = renderHook(() => useTagPickerButton_unstable({}, ref), {
      wrapper: wrap({ selectedOptions: [] }),
    });
    const oneSelected = renderHook(() => useTagPickerButton_unstable({}, ref), {
      wrapper: wrap({ selectedOptions: ['apple'] }),
    });

    expect(empty.result.current.hasSelectedOption).toBe(false);
    expect(oneSelected.result.current.hasSelectedOption).toBe(true);
  });

  it('binds aria-controls to popoverId only when open', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const closed = renderHook(() => useTagPickerButton_unstable({}, ref), {
      wrapper: wrap({ open: false, popoverId: 'pop-1' }),
    });
    const opened = renderHook(() => useTagPickerButton_unstable({}, ref), {
      wrapper: wrap({ open: true, popoverId: 'pop-1' }),
    });

    expect(closed.result.current.root['aria-controls']).toBeUndefined();
    expect(opened.result.current.root['aria-controls']).toBe('pop-1');
  });

  it('renders the picker value as button children, falling back to placeholder', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const withValue = renderHook(() => useTagPickerButton_unstable({}, ref), {
      wrapper: wrap({ value: 'Selected fruit' }),
    });
    const withPlaceholder = renderHook(
      () => useTagPickerButton_unstable({ placeholder: 'Pick a fruit' } as never, ref),
      { wrapper: wrap({ value: undefined }) },
    );

    expect(withValue.result.current.root.children).toBe('Selected fruit');
    expect(withPlaceholder.result.current.root.children).toBe('Pick a fruit');
  });
});
