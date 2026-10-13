import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Calendar } from './Calendar';
import { useCalendarBase_unstable } from './useCalendar';
import { useCalendarContextValues_unstable } from './useCalendarContextValues';
import { renderCalendar_unstable } from './renderCalendar';
import { useCalendarDay_unstable } from '../CalendarDay/useCalendarDay';
import { useCalendarDayContextValues_unstable } from '../CalendarDay/useCalendarDayContextValues';
import { renderCalendarDay_unstable } from '../CalendarDay/renderCalendarDay';
import { useCalendarMonth_unstable } from '../CalendarMonth/useCalendarMonth';
import { useCalendarMonthContextValues_unstable } from '../CalendarMonth/useCalendarMonthContextValues';
import { renderCalendarMonth_unstable } from '../CalendarMonth/renderCalendarMonth';
import type { CalendarProps } from './Calendar.types';
import type { CalendarDay } from '../CalendarDay/CalendarDay';
import type { CalendarDayHandle, CalendarDayProps } from '../CalendarDay/CalendarDay.types';
import type { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import type { CalendarMonthHandle, CalendarMonthProps } from '../CalendarMonth/CalendarMonth.types';

const ClasslessCalendarDay: typeof CalendarDay = React.forwardRef<CalendarDayHandle, CalendarDayProps>((props, ref) => {
  const state = useCalendarDay_unstable(props, ref);
  return renderCalendarDay_unstable(state, useCalendarDayContextValues_unstable(state));
});

const ClasslessCalendarMonth: typeof CalendarMonth = React.forwardRef<CalendarMonthHandle, CalendarMonthProps>(
  (props, ref) => {
    const state = useCalendarMonth_unstable(props, ref);
    return renderCalendarMonth_unstable(state, useCalendarMonthContextValues_unstable(state));
  },
);

const ClasslessCalendar: ForwardRefComponent<CalendarProps> = React.forwardRef((props, ref) => {
  const state = useCalendarBase_unstable(props, ref);
  state.dayPicker = slot.optional(props.dayPicker, {
    renderByDefault: true,
    defaultProps: state.dayPicker,
    elementType: ClasslessCalendarDay,
  });
  state.monthPicker = slot.optional(props.monthPicker, {
    renderByDefault: true,
    defaultProps: state.monthPicker,
    elementType: ClasslessCalendarMonth,
  });
  const dayPickerRef = useMergedRefs(state.dayPickerRef, state.dayPicker?.ref);
  const monthPickerRef = useMergedRefs(state.monthPickerRef, state.monthPicker?.ref);
  if (state.dayPicker) {
    state.dayPicker.ref = dayPickerRef;
  }
  if (state.monthPicker) {
    state.monthPicker.ref = monthPickerRef;
  }

  return renderCalendar_unstable(
    {
      ...state,
      components: {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        ...state.components,
        dayPicker: ClasslessCalendarDay,
        monthPicker: ClasslessCalendarMonth,
      },
    },
    useCalendarContextValues_unstable(state),
  );
});

const today = new Date(2020, 8, 18);

function mockResponsiveLayout(container: HTMLElement) {
  const targetWindow = container.ownerDocument.defaultView!;
  const descriptor = Object.getOwnPropertyDescriptor(targetWindow, 'matchMedia');
  const mediaQuery = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  Object.defineProperty(targetWindow, 'matchMedia', {
    configurable: true,
    value: jest.fn((query: string) =>
      query === '(max-width: 440px)'
        ? mediaQuery
        : { matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() },
    ),
  });

  return {
    narrow() {
      mediaQuery.matches = true;
      const [, onChange] = mediaQuery.addEventListener.mock.calls[0];
      act(() => onChange());
    },
    restore() {
      if (descriptor) {
        Object.defineProperty(targetWindow, 'matchMedia', descriptor);
      } else {
        Reflect.deleteProperty(targetWindow, 'matchMedia');
      }
    },
  };
}

describe.each([
  { name: 'styled Calendar', Component: Calendar },
  { name: 'classless base composition', Component: ClasslessCalendar },
])('$name focus ownership', ({ name, Component }) => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('reserves behavioral picker markers while preserving consumer classes', () => {
    const dayPicker = { 'data-fui-calendar-picker': 'month', className: 'custom-day' };
    const monthPicker = { 'data-fui-calendar-picker': 'day', className: 'custom-month' };
    const { getByRole } = render(
      <Component
        defaultValue={today}
        today={today}
        layout="sideBySide"
        dayPicker={dayPicker}
        monthPicker={monthPicker}
      />,
    );

    const dayRoot = getByRole('button', { name: 'September 18, 2020' }).closest('[data-fui-calendar-picker]');
    const monthRoot = getByRole('gridcell', { name: 'March' }).closest('[data-fui-calendar-picker]');
    expect(dayRoot).toHaveAttribute('data-fui-calendar-picker', 'day');
    expect(monthRoot).toHaveAttribute('data-fui-calendar-picker', 'month');
    expect(dayRoot).toHaveClass('custom-day');
    expect(monthRoot).toHaveClass('custom-month');
  });

  it.each(['month', 'year'] as const)(
    'restores day focus when responsive overlay hides the focused %s picker and preserves consumer handlers',
    picker => {
      const onFocusCapture = jest.fn();
      const onDayFocusCapture = jest.fn();
      const onMonthFocusCapture = jest.fn();
      const { container, getByRole, queryByRole, rerender, unmount } = render(<></>);
      const media = mockResponsiveLayout(container);

      try {
        rerender(
          <Component
            defaultValue={today}
            today={today}
            layout="auto"
            onFocusCapture={onFocusCapture}
            dayPicker={{ onFocusCapture: onDayFocusCapture }}
            monthPicker={{ onFocusCapture: onMonthFocusCapture }}
          />,
        );
        if (name === 'classless base composition') {
          expect(container.querySelector('.fui-Calendar, .fui-CalendarDay, .fui-CalendarMonth')).toBeNull();
        }

        if (picker === 'year') {
          fireEvent.click(getByRole('button', { name: '2020, change year' }));
        }
        const focusedCell = getByRole('gridcell', { name: picker === 'month' ? 'March' : '2020' });
        act(() => focusedCell.focus());
        expect(focusedCell).toHaveFocus();
        expect(onFocusCapture).toHaveBeenCalledTimes(1);
        expect(onMonthFocusCapture).toHaveBeenCalledTimes(1);

        media.narrow();
        act(() => jest.advanceTimersToNextFrame());

        expect(queryByRole('gridcell', { name: picker === 'month' ? 'March' : '2020' })).toBeNull();
        expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus();
        expect(onFocusCapture).toHaveBeenCalledTimes(2);
        expect(onDayFocusCapture).toHaveBeenCalledTimes(1);
        expect(onMonthFocusCapture).toHaveBeenCalledTimes(1);
      } finally {
        unmount();
        media.restore();
      }
    },
  );

  it.each(['day', 'month'] as const)('restores focus when a controlled view hides the focused %s picker', view => {
    const { getByRole, rerender } = render(
      <Component defaultValue={today} today={today} layout="overlay" view={view} />,
    );
    const focusedCell =
      view === 'day'
        ? getByRole('button', { name: 'September 18, 2020' }).closest('td')!
        : getByRole('gridcell', { name: 'March' });
    act(() => focusedCell.focus());

    rerender(<Component defaultValue={today} today={today} layout="overlay" view={view === 'day' ? 'month' : 'day'} />);
    act(() => jest.advanceTimersToNextFrame());

    const restoredCell =
      view === 'day'
        ? getByRole('gridcell', { name: 'September' })
        : getByRole('button', { name: 'September 18, 2020' }).closest('td');
    expect(restoredCell).toHaveFocus();
  });

  it('does not reclaim outside focus when responsive overlay hides the previously focused month picker', () => {
    const onBlurCapture = jest.fn();
    const { container, getByRole, rerender, unmount } = render(<></>);
    const media = mockResponsiveLayout(container);

    try {
      rerender(
        <>
          <Component defaultValue={today} today={today} layout="auto" onBlurCapture={onBlurCapture} />
          <button type="button">Outside action</button>
        </>,
      );
      act(() => getByRole('gridcell', { name: 'March' }).focus());
      const outside = getByRole('button', { name: 'Outside action' });
      act(() => outside.focus());
      expect(onBlurCapture).toHaveBeenCalledTimes(1);

      media.narrow();
      act(() => jest.advanceTimersToNextFrame());

      expect(outside).toHaveFocus();
    } finally {
      unmount();
      media.restore();
    }
  });

  it('does not classify an enclosing picker as part of this Calendar', () => {
    const { container, getByTestId, rerender, unmount } = render(<></>);
    const media = mockResponsiveLayout(container);

    try {
      rerender(
        <div data-fui-calendar-picker="month">
          <Component defaultValue={today} today={today} layout="auto" tabIndex={0} data-testid="calendar" />
        </div>,
      );
      const root = getByTestId('calendar');
      act(() => root.focus());

      media.narrow();
      act(() => jest.advanceTimersToNextFrame());

      expect(root).toHaveFocus();
    } finally {
      unmount();
      media.restore();
    }
  });

  it('cancels pending restoration when focus moves outside after the focused picker is removed', () => {
    const { getByRole, rerender } = render(
      <>
        <Component defaultValue={today} today={today} layout="overlay" view="month" />
        <button type="button">Outside action</button>
      </>,
    );
    act(() => getByRole('gridcell', { name: 'March' }).focus());
    rerender(
      <>
        <Component defaultValue={today} today={today} layout="overlay" view="day" />
        <button type="button">Outside action</button>
      </>,
    );
    const outside = getByRole('button', { name: 'Outside action' });
    act(() => outside.focus());
    act(() => jest.advanceTimersToNextFrame());

    expect(outside).toHaveFocus();
  });
});
