import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Calendar } from './Calendar';
import type { CalendarDayHandle } from './CalendarDay';
import type { CalendarMonthHandle } from './CalendarMonth';
import type { CalendarYearHandle } from './CalendarYear';
import type { CalendarProps } from './Calendar.types';
import { useCalendar } from './useCalendar';
import { renderCalendar, useCalendarContextValues } from '../../calendar';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: ['consistent-callback-args'],
  });

  it('renders the day grid and the month picker', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(2);
  });

  it('drives roving focus with focusgroup rather than Tabster', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const dayGrid = container.querySelector('table[role="grid"]')!;
    expect(dayGrid.getAttribute('focusgroup')).toBe('toolbar inline');

    const monthGrid = container.querySelector('div[role="grid"]')!;
    expect(monthGrid.getAttribute('focusgroup')).toBe('toolbar inline');
  });

  it('emits no Griffel styles of its own', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    // Griffel atomic classes are the actual CSS payload. The headless layer must carry none.
    container.querySelectorAll('[class]').forEach(el => {
      expect(el.className).not.toMatch(/___/);
    });
  });

  it('emits no styled class names at all', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    // Week-corner rounding is expressed as `data-corner-*` state rather than `fui-*` marker
    // classes, so the headless output carries no styled vocabulary.
    const leaked = new Set<string>();
    container.querySelectorAll('[class]').forEach(el => {
      el.className
        .split(/\s+/)
        .filter(name => name.startsWith('fui-'))
        .forEach(name => leaked.add(name));
    });

    expect([...leaked]).toEqual([]);
  });

  it('exposes week-corner rounding through data attributes', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const corners = container.querySelectorAll(
      'td[data-corner-top-left], td[data-corner-top-right], td[data-corner-bottom-left], td[data-corner-bottom-right]',
    );

    expect(corners.length).toBeGreaterThan(0);
  });

  it('exposes day state through data attributes', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} today={new Date(2020, 8, 18)} />);

    expect(container.querySelector('td[data-selected]')).not.toBeNull();
    expect(container.querySelector('td[data-today]')).not.toBeNull();
    expect(container.querySelector('td[data-outside-month]')).not.toBeNull();
  });

  it('renders the pickers through slots, so they can be customized', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} showWeekNumbers />);

    expect(container.querySelector('th[scope="row"]')).not.toBeNull();
    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(2);
  });

  it('supports custom Calendar composition through the public hooks and renderer', () => {
    const CustomCalendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
      const state = useCalendar(props, ref);
      const contextValues = useCalendarContextValues(state);
      return renderCalendar(state, contextValues);
    });
    const { getAllByRole } = render(<CustomCalendar value={new Date(2020, 8, 18)} showWeekNumbers />);

    expect(getAllByRole('grid')).toHaveLength(2);
    expect(getAllByRole('rowheader').length).toBeGreaterThan(0);
  });

  it.each(['dayPicker', 'monthPicker'] as const)('preserves a null %s slot', picker => {
    const props: CalendarProps = picker === 'dayPicker' ? { dayPicker: null } : { monthPicker: null };
    const Probe = () => {
      const state = useCalendar(props, null);
      return <div data-testid="picker-state" data-slot-undefined={state[picker] === undefined} />;
    };
    const { getByTestId } = render(<Probe />);

    expect(getByTestId('picker-state')).toHaveAttribute('data-slot-undefined', 'true');
  });

  it('selects months without rendering or switching to a day picker', () => {
    const onSelectDate = jest.fn();
    const onViewChange = jest.fn();
    const { container, getByRole, getAllByRole } = render(
      <Calendar
        dayPicker={null}
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 18)}
        dateRangeType="month"
        layout="overlay"
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
      />,
    );

    fireEvent.click(getByRole('gridcell', { name: 'October' }));

    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][1].date).toEqual(new Date(2020, 9, 18));
    expect(onViewChange).not.toHaveBeenCalled();
    expect(container.querySelector('table[role="grid"]')).toBeNull();
    expect(getAllByRole('grid')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'October' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders only the day grid when the month picker is null', () => {
    const { getAllByRole, queryByRole } = render(
      <Calendar monthPicker={null} value={new Date(2020, 8, 18)} layout="overlay" />,
    );

    expect(getAllByRole('grid')).toHaveLength(1);
    expect(queryByRole('gridcell', { name: 'September' })).toBeNull();
    expect(queryByRole('button', { name: /change month/ })).toBeNull();
  });

  it('preserves day focus restoration with a consumer picker ref', async () => {
    const dayRef = React.createRef<CalendarDayHandle>();
    const { getByRole } = render(
      <Calendar
        today={new Date(2020, 8, 18)}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        dayPicker={{ ref: dayRef }}
      />,
    );

    expect(dayRef.current?.focus).toBeInstanceOf(Function);
    fireEvent.click(getByRole('button', { name: 'Go to today' }));

    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());
  });

  it('preserves month focus restoration with a consumer picker ref', async () => {
    const monthRef = React.createRef<CalendarMonthHandle>();
    const { getByRole } = render(
      <Calendar value={new Date(2020, 8, 18)} layout="overlay" monthPicker={{ ref: monthRef }} />,
    );

    fireEvent.click(getByRole('button', { name: /September 2020, change month/ }));

    expect(monthRef.current?.focus).toBeInstanceOf(Function);
    await waitFor(() => expect(getByRole('gridcell', { name: 'September' })).toHaveFocus());
  });

  it('preserves picker focus handles with consumer callback refs', async () => {
    let dayHandle: CalendarDayHandle | null = null;
    let monthHandle: CalendarMonthHandle | null = null;
    let yearHandle: CalendarYearHandle | null = null;
    const dayRef = (handle: CalendarDayHandle | null) => {
      dayHandle = handle;
    };
    const monthRef = (handle: CalendarMonthHandle | null) => {
      monthHandle = handle;
    };
    const yearRef = (handle: CalendarYearHandle | null) => {
      yearHandle = handle;
    };
    const { getByRole } = render(
      <Calendar
        today={new Date(2020, 8, 18)}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        dayPicker={{ ref: dayRef }}
        monthPicker={{ ref: monthRef, yearPicker: { ref: yearRef } }}
      />,
    );
    const handles = () => ({ day: dayHandle, month: monthHandle, year: yearHandle });

    expect(handles().day?.focus).toBeInstanceOf(Function);
    expect(handles().month?.focus).toBeInstanceOf(Function);
    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());

    fireEvent.click(getByRole('button', { name: '2020, change year' }));
    expect(handles().year?.focus).toBeInstanceOf(Function);
    await waitFor(() => expect(getByRole('gridcell', { name: '2020' })).toHaveFocus());

    fireEvent.click(getByRole('button', { name: '2020 - 2031, change year' }));
    expect(handles().year).toBeNull();
    await waitFor(() => expect(getByRole('gridcell', { name: 'September' })).toHaveFocus());
  });

  it('restores focus when responsive overlay mode hides the focused month picker', async () => {
    const targetWindow = render(<div />).container.ownerDocument.defaultView!;
    const descriptor = Object.getOwnPropertyDescriptor(targetWindow, 'matchMedia');
    let onMediaChange: (() => void) | undefined;
    const mediaQuery = {
      matches: false,
      addEventListener: (_type: string, listener: () => void) => {
        onMediaChange = listener;
      },
      removeEventListener: jest.fn(),
    };
    Object.defineProperty(targetWindow, 'matchMedia', {
      configurable: true,
      value: jest.fn(() => mediaQuery),
    });

    try {
      const { getByRole, queryByRole } = render(<Calendar value={new Date(2020, 8, 18)} layout="auto" />);

      getByRole('gridcell', { name: 'March' }).focus();
      mediaQuery.matches = true;
      act(() => onMediaChange?.());

      expect(queryByRole('gridcell', { name: 'March' })).toBeNull();
      await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());
    } finally {
      if (descriptor) {
        Object.defineProperty(targetWindow, 'matchMedia', descriptor);
      } else {
        Reflect.deleteProperty(targetWindow, 'matchMedia');
      }
    }
  });
});
