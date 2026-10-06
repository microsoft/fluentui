import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Calendar } from './Calendar';
import { calendarFormatters } from '../../utils';

const today = new Date(2020, 8, 18);
const dayLabel = (date: Date) => calendarFormatters.dateTime({ date, format: 'dayMonthYear' });

describe('Calendar interaction sequences', () => {
  it.each([
    { key: 'PageUp', shiftKey: false, targetDate: new Date(2020, 7, 25) },
    { key: 'PageDown', shiftKey: false, targetDate: new Date(2020, 9, 25) },
    { key: 'PageUp', shiftKey: true, targetDate: new Date(2019, 8, 25) },
    { key: 'PageDown', shiftKey: true, targetDate: new Date(2021, 8, 25) },
  ])('pages from the arrow-focused date with $key and shiftKey=$shiftKey', async ({ key, shiftKey, targetDate }) => {
    const onDisplayedDateChange = jest.fn();
    const onSelectDate = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        onDisplayedDateChange={onDisplayedDateChange}
        onSelectDate={onSelectDate}
      />,
    );
    const originalDay = getByRole('button', { name: dayLabel(today) }).closest('td')!;
    originalDay.focus();
    fireEvent.keyDown(originalDay, { key: 'ArrowDown' });
    const focusedDay = getByRole('button', { name: 'September 25, 2020' }).closest('td')!;
    expect(focusedDay).toHaveFocus();

    fireEvent.keyDown(focusedDay, { key, shiftKey });

    expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(targetDate);
    expect(onSelectDate).not.toHaveBeenCalled();
    await waitFor(() => expect(getByRole('button', { name: dayLabel(targetDate) }).closest('td')).toHaveFocus());
  });

  it.each([
    { anchorDate: new Date(2021, 0, 18), focusedDate: new Date(2021, 0, 31), shiftKey: false },
    { anchorDate: new Date(2020, 1, 18), focusedDate: new Date(2020, 1, 29), shiftKey: true },
  ])('clamps a focused month-end or leap day when paging', async ({ anchorDate, focusedDate, shiftKey }) => {
    const onDisplayedDateChange = jest.fn();
    const targetDate = new Date(2021, 1, 28);
    const { getByRole } = render(
      <Calendar defaultValue={anchorDate} today={today} onDisplayedDateChange={onDisplayedDateChange} />,
    );
    const focusedDay = getByRole('button', { name: dayLabel(focusedDate) }).closest('td')!;
    focusedDay.focus();

    fireEvent.keyDown(focusedDay, { key: 'PageDown', shiftKey });

    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(targetDate);
    await waitFor(() => expect(getByRole('button', { name: dayLabel(targetDate) }).closest('td')).toHaveFocus());
  });

  it('preserves controlled navigation and consumer cancellation after moving focus', () => {
    const onDisplayedDateChange = jest.fn();
    const onKeyDown = jest.fn((event: React.KeyboardEvent) => {
      if (event.key === 'PageDown') {
        event.preventDefault();
      }
    });
    const { getByRole, rerender } = render(
      <Calendar value={today} displayedDate={today} onDisplayedDateChange={onDisplayedDateChange} />,
    );
    const focusedDay = getByRole('button', { name: 'September 25, 2020' }).closest('td')!;
    focusedDay.focus();
    fireEvent.keyDown(focusedDay, { key: 'PageDown' });
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(new Date(2020, 9, 25));
    expect(getByRole('button', { name: 'September 25, 2020' })).toBeTruthy();

    onDisplayedDateChange.mockClear();
    rerender(
      <Calendar
        value={today}
        displayedDate={today}
        onKeyDown={onKeyDown}
        onDisplayedDateChange={onDisplayedDateChange}
      />,
    );
    fireEvent.keyDown(focusedDay, { key: 'PageDown' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
    expect(focusedDay).toHaveFocus();
  });

  it.each([false, true])('only owns Escape when onDismiss is provided: %s', ownsDismissal => {
    const onDismiss = jest.fn();
    const onParentKeyDown = jest.fn();
    const { getByRole } = render(
      <div onKeyDown={onParentKeyDown}>
        <Calendar defaultValue={today} today={today} onDismiss={ownsDismissal ? onDismiss : undefined} />
      </div>,
    );
    fireEvent.keyDown(getByRole('button', { name: dayLabel(today) }).closest('td')!, { key: 'Escape' });
    expect(onDismiss).toHaveBeenCalledTimes(ownsDismissal ? 1 : 0);
    expect(onParentKeyDown).toHaveBeenCalledTimes(ownsDismissal ? 0 : 1);
  });

  it.each(['Backspace', 'Enter', 'PageUp', 'PageDown'])('preserves %s in editable header content', key => {
    const onDisplayedDateChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        layout="sideBySide"
        onDisplayedDateChange={onDisplayedDateChange}
        dayPicker={{ heading: { children: <input aria-label="Custom header" defaultValue="2020" /> } }}
      />,
    );
    const input = getByRole('textbox', { name: 'Custom header' });
    input.focus();
    expect(fireEvent.keyDown(input, { key })).toBe(true);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
  });

  it('preserves paging keys in nested contenteditable content', () => {
    const onDisplayedDateChange = jest.fn();
    const { getByText } = render(
      <Calendar
        defaultValue={today}
        today={today}
        layout="sideBySide"
        onDisplayedDateChange={onDisplayedDateChange}
        dayPicker={{
          heading: {
            children: (
              <div contentEditable suppressContentEditableWarning>
                <span>Editable year</span>
              </div>
            ),
          },
        }}
      />,
    );
    expect(fireEvent.keyDown(getByText('Editable year'), { key: 'PageDown' })).toBe(true);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
  });

  it('does not cancel native Enter activation for custom header buttons', () => {
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        layout="sideBySide"
        dayPicker={{ heading: { children: <button type="button">Custom action</button> } }}
      />,
    );
    expect(fireEvent.keyDown(getByRole('button', { name: 'Custom action' }), { key: 'Enter' })).toBe(true);
  });

  it('keeps an unavailable go-to-today action focusable but inactive with allFocusable', () => {
    const onDisplayedDateChange = jest.fn();
    const onViewChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        allFocusable
        onDisplayedDateChange={onDisplayedDateChange}
        onViewChange={onViewChange}
      />,
    );
    const button = getByRole('button', { name: 'Go to today' });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
    expect(onViewChange).not.toHaveBeenCalled();
    expect(button).toHaveFocus();
  });

  it.each([1, 2, 3, 4])('navigates to today within the same month in a %s-week day grid', async weeksToShow => {
    const onSelectDate = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 1)}
        today={today}
        monthPicker={null}
        dayPicker={{ weeksToShow }}
        onSelectDate={onSelectDate}
      />,
    );
    const button = getByRole('button', { name: 'Go to today' });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'false');
    fireEvent.click(button);
    await waitFor(() => expect(getByRole('button', { name: dayLabel(today) }).closest('td')).toHaveFocus());
    expect(button).toBeDisabled();
    expect(onSelectDate).not.toHaveBeenCalled();
  });

  it('clamps go-to-today within a shortened grid to the maximum date', async () => {
    const maxDate = new Date(2020, 8, 10);
    const { getByRole } = render(
      <Calendar
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 1)}
        today={today}
        maxDate={maxDate}
        monthPicker={null}
        dayPicker={{ weeksToShow: 1 }}
      />,
    );
    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    await waitFor(() => expect(getByRole('button', { name: dayLabel(maxDate) }).closest('td')).toHaveFocus());
    expect(getByRole('button', { name: 'Go to today' })).toBeDisabled();
  });

  describe('focus ownership across picker visibility changes', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
      act(() => jest.runOnlyPendingTimers());
      jest.useRealTimers();
    });

    it.each(['day', 'month'] as const)('does not reclaim outside focus when controlled view hides %s', view => {
      const onBlurCapture = jest.fn();
      const { getByRole, rerender } = render(
        <>
          <Calendar defaultValue={today} today={today} layout="overlay" view={view} onBlurCapture={onBlurCapture} />
          <button type="button">Outside action</button>
        </>,
      );
      const pickerCell =
        view === 'day'
          ? getByRole('button', { name: dayLabel(today) }).closest('td')!
          : getByRole('gridcell', { name: 'September' });
      pickerCell.focus();
      const outside = getByRole('button', { name: 'Outside action' });
      outside.focus();
      expect(onBlurCapture).toHaveBeenCalledTimes(1);
      rerender(
        <>
          <Calendar
            defaultValue={today}
            today={today}
            layout="overlay"
            view={view === 'day' ? 'month' : 'day'}
            onBlurCapture={onBlurCapture}
          />
          <button type="button">Outside action</button>
        </>,
      );
      act(() => jest.advanceTimersToNextFrame());
      expect(outside).toHaveFocus();
    });

    it('does not reclaim outside focus when responsive layout hides the previously focused month picker', () => {
      const descriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
      let onMediaChange: (() => void) | undefined;
      const mediaQuery = {
        matches: false,
        addEventListener: (_type: string, listener: () => void) => {
          onMediaChange = listener;
        },
        removeEventListener: jest.fn(),
      };
      Object.defineProperty(window, 'matchMedia', { configurable: true, value: jest.fn(() => mediaQuery) });
      try {
        const { getByRole, queryByRole } = render(
          <>
            <Calendar defaultValue={today} today={today} layout="auto" />
            <button type="button">Outside action</button>
          </>,
        );
        getByRole('gridcell', { name: 'September' }).focus();
        const outside = getByRole('button', { name: 'Outside action' });
        outside.focus();
        mediaQuery.matches = true;
        act(() => onMediaChange?.());
        act(() => jest.advanceTimersToNextFrame());
        expect(queryByRole('gridcell', { name: 'September' })).toBeNull();
        expect(outside).toHaveFocus();
      } finally {
        if (descriptor) {
          Object.defineProperty(window, 'matchMedia', descriptor);
        } else {
          delete (window as Partial<Window>).matchMedia;
        }
      }
    });
  });
});
