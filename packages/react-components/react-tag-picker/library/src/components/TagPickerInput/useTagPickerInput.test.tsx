import { renderHook, act } from '@testing-library/react-hooks';
import { ArrowLeft, Backspace, Enter, Space } from '@fluentui/keyboard-keys';
import * as React from 'react';

import { TagPickerContextProvider } from '../../contexts/TagPickerContext';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import { useTagPickerInput_unstable } from './useTagPickerInput';

const findLastFocusable = jest.fn();
jest.mock('@fluentui/react-tabster', () => ({
  ...jest.requireActual('@fluentui/react-tabster'),
  useFocusFinders: () => ({ findLastFocusable }),
}));

const makeContext = (overrides: Partial<TagPickerContextValue> = {}): TagPickerContextValue => ({
  triggerRef: React.createRef<HTMLInputElement>(),
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
  popoverId: 'input-popover-id',
  size: 'medium',
  appearance: 'outline',
  disabled: false,
  ...overrides,
});

const wrap = (overrides: Partial<TagPickerContextValue> = {}): React.FC<{ children?: React.ReactNode }> => {
  const value = makeContext(overrides);
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TagPickerContextProvider value={value}>{children}</TagPickerContextProvider>
  );
  return Wrapper;
};

describe('useTagPickerInput_unstable', () => {
  it('renders the input with type="text"', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useTagPickerInput_unstable({}, ref), { wrapper: wrap() });
    expect(result.current.root.type).toBe('text');
  });

  it('inherits size and disabled from picker context when not overridden by props', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ size: 'large', disabled: true }),
    });

    expect(result.current.size).toBe('large');
    expect(result.current.disabled).toBe(true);
  });

  it('binds aria-controls to popoverId only when open and a popover exists', () => {
    const ref = React.createRef<HTMLInputElement>();
    const closed = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ open: false, popoverId: 'pop-1' }),
    });
    const opened = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ open: true, popoverId: 'pop-1' }),
    });
    const openedNoPopover = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ open: true, popoverId: 'pop-1', noPopover: true }),
    });

    expect(closed.result.current.root['aria-controls']).toBeUndefined();
    expect(opened.result.current.root['aria-controls']).toBe('pop-1');
    expect(openedNoPopover.result.current.root['aria-controls']).toBeUndefined();
  });

  it('closes the popover when Space is pressed while open', () => {
    const setOpen = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ open: true, setOpen }),
    });

    const event = {
      key: Space,
      code: Space,
      currentTarget: { selectionStart: 0, selectionEnd: 0 },
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;
    act(() => {
      result.current.root.onKeyDown?.(event);
    });

    expect(setOpen).toHaveBeenCalledWith(event, false);
  });

  it('opens the popover when Enter is pressed while closed', () => {
    const setOpen = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ open: false, setOpen }),
    });

    const event = {
      key: Enter,
      code: Enter,
      currentTarget: { selectionStart: 0, selectionEnd: 0 },
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;
    act(() => {
      result.current.root.onKeyDown?.(event);
    });

    expect(setOpen).toHaveBeenCalledWith(event, true);
  });

  it.each([
    ['ArrowLeft', ArrowLeft],
    ['Backspace', Backspace],
  ])('looks for the last focusable inside the group when %s is pressed at the start of the input', (_label, key) => {
    findLastFocusable.mockReset();
    const group = document.createElement('div');
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useTagPickerInput_unstable({}, ref), {
      wrapper: wrap({ tagPickerGroupRef: { current: group } }),
    });

    const event = {
      key,
      code: key,
      currentTarget: { selectionStart: 0, selectionEnd: 0 },
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;
    act(() => {
      result.current.root.onKeyDown?.(event);
    });

    expect(findLastFocusable).toHaveBeenCalledWith(group);
  });

  it('forwards keydown events to the user-supplied onKeyDown', () => {
    const userKeyDown = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useTagPickerInput_unstable({ onKeyDown: userKeyDown }, ref), {
      wrapper: wrap({ open: false }),
    });

    const event = {
      key: 'a',
      code: 'KeyA',
      currentTarget: { selectionStart: 1, selectionEnd: 1 },
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;
    act(() => {
      result.current.root.onKeyDown?.(event);
    });

    expect(userKeyDown).toHaveBeenCalledWith(event);
  });
});
