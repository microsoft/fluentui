import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { TagPickerContextProvider } from '../../contexts/TagPickerContext';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import { useTagPickerControl_unstable } from './useTagPickerControl';

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
  popoverId: 'control-popover-id',
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

describe('useTagPickerControl_unstable', () => {
  it('always renders the internal aside slot', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControl_unstable({}, ref), { wrapper: wrap() });

    expect(result.current.aside).toBeDefined();
  });

  it('renders an expandIcon by default and hides it when noPopover is set', () => {
    const ref = React.createRef<HTMLDivElement>();
    const withPopover = renderHook(() => useTagPickerControl_unstable({}, ref), { wrapper: wrap() });
    const noPopover = renderHook(() => useTagPickerControl_unstable({}, ref), {
      wrapper: wrap({ noPopover: true }),
    });

    expect(withPopover.result.current.expandIcon).toBeDefined();
    expect(noPopover.result.current.expandIcon).toBeUndefined();
  });

  it('binds aria-expanded on expandIcon to picker open state', () => {
    const ref = React.createRef<HTMLDivElement>();
    const closed = renderHook(() => useTagPickerControl_unstable({}, ref), { wrapper: wrap({ open: false }) });
    const opened = renderHook(() => useTagPickerControl_unstable({}, ref), { wrapper: wrap({ open: true }) });

    expect(closed.result.current.expandIcon?.['aria-expanded']).toBe(false);
    expect(opened.result.current.expandIcon?.['aria-expanded']).toBe(true);
  });

  it('sets aria-owns on root only when open and a popover exists', () => {
    const ref = React.createRef<HTMLDivElement>();
    const opened = renderHook(() => useTagPickerControl_unstable({}, ref), {
      wrapper: wrap({ open: true, popoverId: 'pop-1' }),
    });
    const openedNoPopover = renderHook(() => useTagPickerControl_unstable({}, ref), {
      wrapper: wrap({ open: true, popoverId: 'pop-1', noPopover: true }),
    });

    expect(opened.result.current.root['aria-owns']).toBe('pop-1');
    expect(openedNoPopover.result.current.root['aria-owns']).toBeUndefined();
  });

  it('inherits size, appearance and disabled from picker context', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControl_unstable({}, ref), {
      wrapper: wrap({ size: 'large', appearance: 'filled-darker', disabled: true }),
    });

    expect(result.current.size).toBe('large');
    expect(result.current.appearance).toBe('filled-darker');
    expect(result.current.disabled).toBe(true);
  });

  it('renders the secondaryAction slot when provided', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControl_unstable({ secondaryAction: 'Open advanced' }, ref), {
      wrapper: wrap(),
    });

    expect(result.current.secondaryAction?.children).toBe('Open advanced');
  });

  it('does not toggle open when mousedown target is unrelated to the control internals', () => {
    const setOpen = jest.fn();
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControl_unstable({}, ref), {
      wrapper: wrap({ open: false, setOpen }),
    });

    // The handler only fires setOpen when the mousedown target matches one of the internal refs
    // (expand icon, inner root, group ref, aside). An unrelated target must short-circuit.
    result.current.root.onMouseDown?.({
      isDefaultPrevented: () => false,
      preventDefault: jest.fn(),
      target: document.createElement('span'),
    } as unknown as React.MouseEvent<HTMLDivElement>);

    expect(setOpen).not.toHaveBeenCalled();
  });
});
