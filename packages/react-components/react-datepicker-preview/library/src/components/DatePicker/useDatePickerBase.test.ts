import { act, renderHook } from '@testing-library/react-hooks';
import { useDatePickerBase_unstable } from './useDatePickerBase';
import type { DatePickerBaseProps } from './DatePicker.types';

describe('useDatePickerBase_unstable', () => {
  const today = new Date(2030, 0, 15);

  it('starts empty and closed without emitting events', () => {
    const onOpenChange = jest.fn();
    const onDateChange = jest.fn();
    const { result } = renderHook(() => useDatePickerBase_unstable({ today, onOpenChange, onDateChange }));
    expect(result.current.value).toBeNull();
    expect(result.current.text).toBe('');
    expect(result.current.open).toBe(false);
    expect(result.current.today).toBe(today);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(onDateChange).not.toHaveBeenCalled();
  });

  it('supports uncontrolled visibility and event/data requests', () => {
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePickerBase_unstable({ onOpenChange }));
    const event = new Event('keydown');
    act(() => result.current.requestOpen(event, true, 'keyboard'));
    expect(result.current.open).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(event, { event, type: 'keydown', open: true, reason: 'keyboard' });
    act(() => result.current.requestOpen(new Event('click'), false, 'dismiss'));
    expect(result.current.open).toBe(false);
  });

  it('reports controlled requests without changing controlled visibility', () => {
    const onOpenChange = jest.fn();
    const { result, rerender } = renderHook((props: DatePickerBaseProps) => useDatePickerBase_unstable(props), {
      initialProps: { open: false, onOpenChange },
    });
    act(() => result.current.requestOpen(new Event('click'), true, 'icon'));
    expect(result.current.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    rerender({ open: true, onOpenChange });
    expect(result.current.open).toBe(true);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('deduplicates visibility requests for one originating event', () => {
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePickerBase_unstable({ open: true, onOpenChange }));
    const event = new Event('click');
    act(() => {
      result.current.requestOpen(event, false, 'selection');
      result.current.requestOpen(event, false, 'dismiss');
    });
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('suppresses controlled open and user changes while disabled', () => {
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePickerBase_unstable({ disabled: true, open: true, onOpenChange }));
    expect(result.current.open).toBe(false);
    act(() => result.current.requestOpen(new Event('click'), true, 'input'));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('checks inclusive local date boundaries without clamping supplied selection', () => {
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerBase_unstable({
        allowTextInput: true,
        defaultValue: today,
        minDate: new Date(2030, 0, 15, 23),
        maxDate: new Date(2030, 0, 15, 1),
        onValidationResult,
      }),
    );
    act(() => result.current.validate(new Event('blur')));
    expect(result.current.value).toBe(today);
    expect(onValidationResult.mock.calls[0][1].error).toBeUndefined();
    act(() => result.current.setText('January 16, 2030'));
    act(() => result.current.validate(new Event('blur')));
    expect(result.current.value).toBe(today);
    expect(onValidationResult.mock.calls[1][1].error).toBe('out-of-bounds');
  });

  it('rejects text and selection on restricted local dates', () => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerBase_unstable({
        allowTextInput: true,
        calendar: { restrictedDates: [new Date(2030, 0, 15, 23)] },
        onDateChange,
        onValidationResult,
      }),
    );
    act(() => result.current.setText('January 15, 2030'));
    act(() => result.current.validate(new Event('blur')));
    act(() => result.current.selectDate(new Event('click'), today, [today]));
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).toHaveBeenCalledTimes(2);
    expect(onValidationResult.mock.calls.every(([, data]) => data.error === 'out-of-bounds')).toBe(true);
  });

  it.each([
    [2032, 1, 29],
    [2030, 11, 31],
    [2031, 0, 1],
    [2030, 2, 10],
    [2030, 10, 3],
    [2030, 2, 31],
    [2030, 9, 27],
  ])('compares local day boundaries across calendar transitions: %i-%i-%i', (year, month, day) => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const date = new Date(year, month, day, 12);
    const { result } = renderHook(() =>
      useDatePickerBase_unstable({
        minDate: new Date(year, month, day, 23, 59),
        maxDate: new Date(year, month, day, 0, 1),
        onDateChange,
        onValidationResult,
      }),
    );
    act(() => result.current.selectDate(new Event('click'), date, [date]));
    expect(result.current.value).toBe(date);
    expect(onDateChange).toHaveBeenCalledTimes(1);
    for (const offset of [-1, 1]) {
      const unavailable = new Date(year, month, day + offset, 12);
      act(() => result.current.selectDate(new Event('click'), unavailable, [unavailable]));
      expect(result.current.value).toBe(date);
      expect(onValidationResult).toHaveBeenLastCalledWith(
        expect.any(Event),
        expect.objectContaining({ error: 'out-of-bounds' }),
      );
    }
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });
});
