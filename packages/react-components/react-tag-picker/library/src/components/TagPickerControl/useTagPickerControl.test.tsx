import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';

import { TagPickerContextProvider } from '../../contexts/TagPickerContext';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import { useTagPickerControlBase_unstable } from './useTagPickerControlBase';
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

describe('useTagPickerControlBase_unstable', () => {
  it('does not create an expandIcon or aside by default', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControlBase_unstable({}, ref), { wrapper: wrap() });

    expect(result.current.expandIcon).toBeUndefined();
    expect(result.current.aside).toBeUndefined();
  });

  it('creates an expandIcon and aside when explicitly provided', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControlBase_unstable({ expandIcon: {} }, ref), {
      wrapper: wrap({ open: true }),
    });

    expect(result.current.expandIcon).toBeDefined();
    expect(result.current.expandIcon?.children).toBeUndefined();
    expect(result.current.expandIcon?.['aria-expanded']).toBe(true);
    expect(result.current.expandIcon?.role).toBe('button');
    expect(result.current.aside).toBeDefined();
  });
});

describe('useTagPickerControl_unstable', () => {
  it('renders the default expandIcon and aside when a popover exists', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useTagPickerControl_unstable({}, ref), { wrapper: wrap() });
    const defaultIcon = result.current.expandIcon?.children;

    expect(React.isValidElement(defaultIcon) && defaultIcon.type).toBe(ChevronDownRegular);
    expect(result.current.aside).toBeDefined();
  });

  it('does not render a default expandIcon or aside when noPopover is set', () => {
    const ref = React.createRef<HTMLDivElement>();
    const noPopover = renderHook(() => useTagPickerControl_unstable({}, ref), {
      wrapper: wrap({ noPopover: true }),
    });

    expect(noPopover.result.current.expandIcon).toBeUndefined();
    expect(noPopover.result.current.aside).toBeUndefined();
  });

  it('preserves a consumer-provided expandIcon', () => {
    const ref = React.createRef<HTMLDivElement>();
    const customIcon = <span data-testid="custom-icon" />;
    const { result } = renderHook(() => useTagPickerControl_unstable({ expandIcon: customIcon }, ref), {
      wrapper: wrap(),
    });

    expect(result.current.expandIcon?.children).toBe(customIcon);
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
