import { act, renderHook } from '@testing-library/react-hooks';
import { useDatePickerDateState } from './useDatePickerDateState';
import type { DatePickerDateStateOptions } from './useDatePickerDateState';

describe('useDatePickerDateState', () => {
  const selectedDate = new Date(2030, 0, 15);
  const nextDate = new Date(2030, 0, 20);
  const event = new Event('blur');

  it('starts empty without formatting or parsing a value', () => {
    const formatDate = jest.fn();
    const parseDate = jest.fn();
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({ formatDate, parseDate, onDateChange, onValidationResult }),
    );
    expect(result.current.value).toBeNull();
    expect(result.current.text).toBe('');
    expect(formatDate).not.toHaveBeenCalled();
    expect(parseDate).not.toHaveBeenCalled();
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).not.toHaveBeenCalled();
  });

  it('initializes uncontrolled selection without reacting to subsequent default changes', () => {
    const { result, rerender } = renderHook((options: DatePickerDateStateOptions) => useDatePickerDateState(options), {
      initialProps: { defaultValue: selectedDate },
    });
    rerender({ defaultValue: nextDate });
    expect(result.current.value).toBe(selectedDate);
    expect(result.current.text).toBe(selectedDate.toDateString());
  });

  it('keeps editable draft text separate from selection and preserves it across rerenders', () => {
    const onDateChange = jest.fn();
    const parseDate = jest.fn();
    const { result, rerender } = renderHook(() =>
      useDatePickerDateState({ allowTextInput: true, defaultValue: selectedDate, onDateChange, parseDate }),
    );
    act(() => result.current.setText('unfinished'));
    rerender();
    expect(result.current.text).toBe('unfinished');
    expect(result.current.value).toBe(selectedDate);
    expect(onDateChange).not.toHaveBeenCalled();
    expect(parseDate).not.toHaveBeenCalled();
  });

  it('commits a parsed value, normalizes text, and preserves the originating event', () => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({
        allowTextInput: true,
        parseDate: () => nextDate,
        onDateChange,
        onValidationResult,
      }),
    );
    act(() => result.current.setText('January 20'));
    act(() => result.current.validate(event));
    expect(result.current.value).toBe(nextDate);
    expect(result.current.text).toBe(nextDate.toDateString());
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      value: nextDate,
      selectedDateRange: [nextDate],
      reason: 'input',
    });
    expect(onValidationResult).toHaveBeenCalledWith(event, { type: 'blur', event, error: undefined });
    act(() => result.current.validate(new Event('keydown')));
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });

  it('accepts the Unix epoch using the default parser', () => {
    const { result } = renderHook(() => useDatePickerDateState({ allowTextInput: true }));
    act(() => result.current.setText('1970-01-01T00:00:00.000Z'));
    act(() => result.current.validate(event));
    expect(result.current.value?.getTime()).toBe(0);
  });

  it.each([null, new Date(NaN)])('restores committed text for parser failure %s', parsedDate => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({
        allowTextInput: true,
        defaultValue: selectedDate,
        parseDate: () => parsedDate,
        onDateChange,
        onValidationResult,
      }),
    );
    act(() => result.current.setText('not a date'));
    act(() => result.current.validate(event));
    expect(result.current.value).toBe(selectedDate);
    expect(result.current.text).toBe(selectedDate.toDateString());
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: 'invalid-input',
    });
  });

  it('restores empty text when parsing fails without an existing selection', () => {
    const { result } = renderHook(() => useDatePickerDateState({ allowTextInput: true }));
    act(() => result.current.setText('not a date'));
    act(() => result.current.validate(event));
    expect(result.current.value).toBeNull();
    expect(result.current.text).toBe('');
  });

  it.each([false, true])('clears selection when required is %s', required => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const parseDate = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({
        defaultValue: selectedDate,
        allowTextInput: true,
        required,
        parseDate,
        onDateChange,
        onValidationResult,
      }),
    );
    act(() => result.current.setText(''));
    act(() => result.current.validate(event));
    expect(result.current.value).toBeNull();
    expect(result.current.text).toBe('');
    expect(parseDate).not.toHaveBeenCalled();
    expect(onDateChange).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      value: null,
      selectedDateRange: [],
      reason: 'clear',
    });
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: required ? 'required-input' : undefined,
    });
    act(() => result.current.validate(event));
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });

  it('does not parse unchanged ambiguous formatted text', () => {
    const parseDate = jest.fn();
    const formatDate = () => 'A special occasion';
    const { result } = renderHook(() =>
      useDatePickerDateState({ defaultValue: selectedDate, allowTextInput: true, formatDate, parseDate }),
    );
    act(() => result.current.validate(event));
    act(() => result.current.setText('A special occasion'));
    act(() => result.current.validate(event));
    expect(parseDate).not.toHaveBeenCalled();
    expect(result.current.value).toBe(selectedDate);
  });

  it('keeps an unavailable draft visible without changing selection', () => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({
        defaultValue: selectedDate,
        allowTextInput: true,
        parseDate: () => nextDate,
        isDateUnavailable: date => date === nextDate,
        onDateChange,
        onValidationResult,
      }),
    );
    act(() => result.current.setText('January 20'));
    act(() => result.current.validate(event));
    expect(result.current.value).toBe(selectedDate);
    expect(result.current.text).toBe('January 20');
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: 'out-of-bounds',
    });
  });

  it('validates availability of unchanged selection without parsing or clamping it', () => {
    const parseDate = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({
        value: selectedDate,
        allowTextInput: true,
        isDateUnavailable: () => true,
        parseDate,
        onValidationResult,
      }),
    );
    act(() => result.current.validate(event));
    expect(parseDate).not.toHaveBeenCalled();
    expect(result.current.value).toBe(selectedDate);
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: 'out-of-bounds',
    });
  });

  it('uses the latest availability policy on validation', () => {
    const onValidationResult = jest.fn();
    const initialProps: DatePickerDateStateOptions = {
      value: selectedDate,
      onValidationResult,
      isDateUnavailable: () => false,
    };
    const { result, rerender } = renderHook((options: DatePickerDateStateOptions) => useDatePickerDateState(options), {
      initialProps,
    });
    rerender({ value: selectedDate, onValidationResult, isDateUnavailable: () => true });
    act(() => result.current.validate(event));
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: 'out-of-bounds',
    });
  });

  it('preserves Calendar ranges without generating a second range', () => {
    const onDateChange = jest.fn();
    const range = [selectedDate, nextDate];
    const click = new Event('click');
    const { result } = renderHook(() => useDatePickerDateState({ onDateChange }));
    act(() => result.current.selectDate(click, nextDate, range));
    expect(result.current.value).toBe(nextDate);
    expect(result.current.text).toBe(nextDate.toDateString());
    expect(onDateChange).toHaveBeenCalledWith(click, {
      type: 'click',
      event: click,
      value: nextDate,
      selectedDateRange: range,
      reason: 'calendar',
    });
  });

  it.each(['invalid-input', 'out-of-bounds'])('rejects an %s Calendar selection explicitly', error => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({ onDateChange, onValidationResult, isDateUnavailable: () => true }),
    );
    const date = error === 'invalid-input' ? new Date(NaN) : nextDate;
    act(() => result.current.selectDate(event, date, [date]));
    expect(result.current.value).toBeNull();
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).toHaveBeenCalledWith(event, { type: 'blur', event, error });
  });

  it('keeps a controlled owner authoritative when a selection request is rejected', () => {
    const onDateChange = jest.fn();
    const { result } = renderHook(() => useDatePickerDateState({ value: selectedDate, onDateChange }));
    act(() => result.current.selectDate(event, nextDate, [nextDate]));
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(result.current.value).toBe(selectedDate);
    expect(result.current.text).toBe(selectedDate.toDateString());
  });

  it('keeps a controlled owner authoritative when a typed commit is rejected', () => {
    const { result } = renderHook(() =>
      useDatePickerDateState({ value: selectedDate, allowTextInput: true, parseDate: () => nextDate }),
    );
    act(() => result.current.setText('January 20'));
    act(() => result.current.validate(event));
    expect(result.current.value).toBe(selectedDate);
    expect(result.current.text).toBe(selectedDate.toDateString());
  });

  it('reflects controlled updates and clearing without interaction callbacks', () => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const initialProps: DatePickerDateStateOptions = {
      value: selectedDate,
      allowTextInput: true,
      onDateChange,
      onValidationResult,
    };
    const { result, rerender } = renderHook((options: DatePickerDateStateOptions) => useDatePickerDateState(options), {
      initialProps,
    });
    act(() => result.current.setText('unfinished'));
    rerender({ value: nextDate, allowTextInput: true, onDateChange, onValidationResult });
    expect(result.current.text).toBe(nextDate.toDateString());
    rerender({ value: null, allowTextInput: true, onDateChange, onValidationResult });
    expect(result.current.text).toBe('');
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).not.toHaveBeenCalled();
  });

  it('reflects formatter changes without changing selection', () => {
    const { result, rerender } = renderHook((options: DatePickerDateStateOptions) => useDatePickerDateState(options), {
      initialProps: { defaultValue: selectedDate, formatDate: () => 'first format' },
    });
    rerender({ defaultValue: selectedDate, formatDate: () => 'second format' });
    expect(result.current.text).toBe('second format');
    expect(result.current.value).toBe(selectedDate);
  });

  it('reports a supplied invalid Date instead of sending it to the formatter', () => {
    const formatDate = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({ value: new Date(NaN), formatDate, onValidationResult }),
    );
    act(() => result.current.validate(event));
    expect(formatDate).not.toHaveBeenCalled();
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: 'invalid-input',
    });
  });

  it('does not edit selection-only input and reports required validation', () => {
    const onValidationResult = jest.fn();
    const { result } = renderHook(() => useDatePickerDateState({ required: true, onValidationResult }));
    act(() => result.current.setText('January 20'));
    expect(result.current.text).toBe('');
    act(() => result.current.validate(event));
    expect(onValidationResult).toHaveBeenCalledWith(event, {
      type: 'blur',
      event,
      error: 'required-input',
    });
  });

  it('does not edit, select, or validate when disabled', () => {
    const onDateChange = jest.fn();
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({ allowTextInput: true, disabled: true, onDateChange, onValidationResult }),
    );
    act(() => {
      result.current.setText('January 20');
      result.current.selectDate(event, nextDate, [nextDate]);
      result.current.validate(event);
    });
    expect(result.current.text).toBe('');
    expect(result.current.value).toBeNull();
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationResult).not.toHaveBeenCalled();
  });

  it('does not swallow a consumer parser exception', () => {
    const failure = new Error('Parser failed');
    const onValidationResult = jest.fn();
    const { result } = renderHook(() =>
      useDatePickerDateState({
        allowTextInput: true,
        parseDate: () => {
          throw failure;
        },
        onValidationResult,
      }),
    );
    act(() => result.current.setText('January 20'));
    expect(() => act(() => result.current.validate(event))).toThrow(failure);
    expect(onValidationResult).not.toHaveBeenCalled();
  });
});
