import * as React from 'react';
import { render as testingRender, fireEvent } from '@testing-library/react';
import { CalendarDay } from './CalendarDay';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { calendarDayClassNames } from './useCalendarDayStyles.styles';
import { calendarDayGridCellClassNames } from '../CalendarDayGridCell/useCalendarDayGridCellStyles.styles';
import { calendarDayGridRowClassNames } from '../CalendarDayGridRow/useCalendarDayGridRowStyles.styles';
import { calendarDayGridHeaderCellClassNames } from '../CalendarDayGridHeaderCell/useCalendarDayGridHeaderCellStyles.styles';
import { formatDateTime as defaultFormatDateTime, formatLabel as defaultFormatLabel } from '../../utils';
import type { CalendarDateLabelData, FormatCalendarLabel, FormatDateTime } from '../../utils';
import type { CalendarContextValue } from '../../contexts/calendarContext';
import type { CalendarDayHandle, CalendarDayProps } from './CalendarDay.types';

const defaultProps: CalendarDayProps = {
  navigatedDate: new Date(2020, 8, 18),
  onNavigateDate: jest.fn(),
};

const render = (element: React.ReactElement, contextValue: Partial<CalendarContextValue> = {}) =>
  testingRender(element, {
    wrapper: ({ children }) => (
      <CalendarProvider
        value={{
          ...calendarContextDefaultValue,
          firstWeekOfYear: 'firstFullWeek',
          value: new Date(2020, 8, 18),
          ...contextValue,
        }}
      >
        {children}
      </CalendarProvider>
    ),
  });

/**
 * Finds a day cell (`<td>`) in the grid by its date's aria-label.
 * The aria-label on the button inside the cell follows the default en-US date format.
 */
function findDayCellByLabel(container: HTMLElement, day: number, month: string, year: number): HTMLElement {
  const button = container.querySelector(`button[aria-label="${month} ${day}, ${year}"]`);
  return button?.closest('td') as HTMLElement;
}

describe('CalendarDay', () => {
  describe('header', () => {
    it('renders the header, title, navigation and the day grid', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);

      expect(container.querySelector(`.${calendarDayClassNames.root}`)).not.toBeNull();
      expect(container.querySelector(`.${calendarDayClassNames.header}`)).not.toBeNull();
      expect(container.querySelector(`.${calendarDayClassNames.heading}`)).not.toBeNull();
      expect(container.querySelector(`.${calendarDayClassNames.navigation}`)).not.toBeNull();
      expect(container.querySelector(`table[role="grid"].${calendarDayClassNames.grid}`)).not.toBeNull();
    });

    it('renders the title as a div when the header is not selectable', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);

      expect(container.querySelector(`.${calendarDayClassNames.heading}`)!.tagName).toBe('DIV');
    });

    it('renders the title as a button that fires onHeaderSelect when selectable', () => {
      const onHeaderSelect = jest.fn();
      const { container } = render(<CalendarDay {...defaultProps} onHeaderSelect={onHeaderSelect} />);

      const title = container.querySelector<HTMLButtonElement>(`.${calendarDayClassNames.heading}`)!;
      expect(title.tagName).toBe('BUTTON');

      title.click();
      expect(onHeaderSelect).toHaveBeenCalledTimes(1);
    });

    it('renders default navigation icons', () => {
      const { container } = render(<CalendarDay {...defaultProps} closeButton={{}} />);

      const [prev, next, close] = Array.from(container.querySelectorAll<HTMLButtonElement>('button[title]'));

      expect(prev.querySelector('svg')).not.toBeNull();
      expect(next.querySelector('svg')).not.toBeNull();
      expect(close.querySelector('svg')).not.toBeNull();
    });

    it('lets the navigation button slots replace the default icons', () => {
      const { container } = render(
        <CalendarDay
          {...defaultProps}
          previousMonthButton={{ children: <span data-custom-prev /> }}
          nextMonthButton={{ children: <span data-custom-next /> }}
        />,
      );

      const [prev, next] = Array.from(container.querySelectorAll<HTMLButtonElement>('button[title]'));

      expect(prev.querySelector('[data-custom-prev]')).not.toBeNull();
      expect(prev.querySelector('svg')).toBeNull();
      expect(next.querySelector('[data-custom-next]')).not.toBeNull();
      expect(next.querySelector('svg')).toBeNull();
    });

    it('navigates a month back and forward', () => {
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDay {...defaultProps} onNavigateDate={onNavigateDate} />);

      const [prev, next] = Array.from(container.querySelectorAll<HTMLButtonElement>('button[title]'));

      prev.click();
      expect(onNavigateDate.mock.calls[0][1].date.getMonth()).toBe(7);

      next.click();
      expect(onNavigateDate.mock.calls[1][1].date.getMonth()).toBe(9);
    });

    it('marks navigation buttons as disabled when out of bounds', () => {
      const { container } = render(<CalendarDay {...defaultProps} />, {
        minDate: new Date(2020, 8, 1),
        maxDate: new Date(2020, 8, 30),
      });

      const [prev, next] = Array.from(container.querySelectorAll<HTMLButtonElement>('button[title]'));
      expect(prev.getAttribute('aria-disabled')).toBe('true');
      expect(next.getAttribute('aria-disabled')).toBe('true');
    });

    it('only renders the close button when its slot is provided', () => {
      const { container, rerender } = render(<CalendarDay {...defaultProps} />);
      expect(container.querySelectorAll('button[title]')).toHaveLength(2);

      rerender(<CalendarDay {...defaultProps} closeButton={{}} />);
      expect(container.querySelectorAll('button[title]')).toHaveLength(3);
    });

    it('lets the grid slot override the accessible label', () => {
      const { container } = render(<CalendarDay {...defaultProps} grid={{ 'aria-label': 'calendar' }} />);

      expect(container.querySelector('table[role="grid"]')).toHaveAttribute('aria-label', 'calendar');
    });

    it('uses localized strings for the header and navigation buttons', () => {
      const formatDateTime: FormatDateTime = (date, format) => `Localized ${defaultFormatDateTime(date, format)}`;
      const formatLabel = ((label: string, data: CalendarDateLabelData) => {
        switch (label) {
          case 'previousMonth':
            return `Go backward ${data.formattedDate}`;
          case 'nextMonth':
            return `Go forward ${data.formattedDate}`;
          case 'yearPickerHeader':
            return `Change the displayed month: ${data.formattedDate}`;
          default:
            return defaultFormatLabel(label as 'selectedDate', data);
        }
      }) as FormatCalendarLabel;
      const { getByRole } = render(
        <CalendarDay {...defaultProps} onHeaderSelect={jest.fn()} closeButton={{ title: 'Dismiss calendar' }} />,
        { formatDateTime, formatLabel },
      );

      expect(getByRole('button', { name: 'Change the displayed month: Localized September 2020' })).toBeTruthy();
      expect(getByRole('button', { name: 'Go backward Localized August' })).toHaveAttribute(
        'title',
        'Go backward Localized August',
      );
      expect(getByRole('button', { name: 'Go forward Localized October' })).toHaveAttribute(
        'title',
        'Go forward Localized October',
      );
      expect(getByRole('button', { name: 'Dismiss calendar' })).toHaveAttribute('title', 'Dismiss calendar');
    });

    it('passes the formatted month and year to the header label formatter', () => {
      const formatLabel = jest.fn(defaultFormatLabel) as unknown as FormatCalendarLabel;
      const { getByRole } = render(<CalendarDay {...defaultProps} onHeaderSelect={jest.fn()} />, { formatLabel });

      expect(getByRole('button', { name: 'September 2020, change month' })).toBeTruthy();
      expect(formatLabel).toHaveBeenCalledWith('yearPickerHeader', {
        date: new Date(2020, 8, 18),
        formattedDate: 'September 2020',
      });
    });
  });

  it('focuses the navigated day through the forwarded ref', () => {
    const ref = React.createRef<CalendarDayHandle>();
    const { container } = render(<CalendarDay {...defaultProps} ref={ref} />);

    ref.current!.focus();

    const navigatedCell = container.querySelector('button[aria-label="September 18, 2020"]')!.closest('td');
    expect(navigatedCell).not.toBeNull();
    expect(navigatedCell!.getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(navigatedCell);
  });

  it('shows the requested number of weeks', () => {
    const { container } = render(<CalendarDay {...defaultProps} weeksToShow={6} />);

    // Weekday header row, six week rows and the two hidden transition rows.
    expect(container.querySelectorAll('tbody > tr')).toHaveLength(9);
  });

  describe('arrow key navigation', () => {
    it('should not call onNavigateDate when arrowing right within the current month view', () => {
      // September 18, 2020 is a Friday — arrowing right goes to Saturday the 19th (same row, same month)
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDay {...defaultProps} onNavigateDate={onNavigateDate} />);

      const dayCell = findDayCellByLabel(container, 18, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowRight' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing right from the end of a row to the next row', () => {
      /*
       * September 5, 2020 is a Saturday (end of row). Arrowing right should wrap to Sunday the 6th
       * (beginning of next row).
       */
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 5);
      const { container } = render(
        <CalendarDay {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 5, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowRight' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing left from the beginning of a row to the previous row', () => {
      /*
       * September 6, 2020 is a Sunday (beginning of row). Arrowing left should wrap to Saturday the 5th
       * (end of previous row).
       */
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 6);
      const { container } = render(
        <CalendarDay {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 6, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowLeft' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing left within the current month view', () => {
      // September 18, 2020 is a Friday — arrowing left goes to Thursday the 17th (same row, same month)
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDay {...defaultProps} onNavigateDate={onNavigateDate} />);

      const dayCell = findDayCellByLabel(container, 18, 'September', 2020);
      fireEvent.keyDown(dayCell, { key: 'ArrowLeft' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing down within the current month view', () => {
      // September 18 → September 25 (same column, next row, same month)
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDay {...defaultProps} onNavigateDate={onNavigateDate} />);

      const dayCell = findDayCellByLabel(container, 18, 'September', 2020);
      fireEvent.keyDown(dayCell, { key: 'ArrowDown' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should call onNavigateDate when arrowing up past the beginning of the month view', () => {
      // September 1, 2020 is in the first visible row. Arrowing up goes to August 25 (transition row).
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 1);
      const { container } = render(
        <CalendarDay {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 1, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowUp' });
      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      // Should navigate to August 25, 2020
      const navigatedTo = onNavigateDate.mock.calls[0][1].date as Date;
      expect(navigatedTo.getMonth()).toBe(7); // August (0-indexed)
      expect(navigatedTo.getDate()).toBe(25);
    });

    it('should call onNavigateDate when arrowing down past the end of the month view', () => {
      // September 30, 2020 is in the last visible row. Arrowing down goes to October 7 (transition row).
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 30);
      const { container } = render(
        <CalendarDay {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 30, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowDown' });
      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      const navigatedTo = onNavigateDate.mock.calls[0][1].date as Date;
      expect(navigatedTo.getMonth()).toBe(9); // October (0-indexed)
      expect(navigatedTo.getDate()).toBe(7);
    });
  });

  describe('week-row DOM element identity across month navigation', () => {
    it('reuses the same <tr> DOM elements when navigating between months', () => {
      /*
       * Regression test: a `key` on the <tr> inside CalendarDayGridRow that encoded the week's
       * first-day date string caused React to unmount+remount the <tr> on every navigation.
       * This detached the element from the Web Animations API handle held by Slide.In,
       * making slide-in replay silently target a stale disconnected node.
       *
       * Without that key, React reuses the same <tr> DOM element across navigations —
       * animations remain connected and can be replayed.
       */
      const { container, rerender } = render(<CalendarDay {...defaultProps} />);
      const tbody = container.querySelector('tbody')!;

      /*
       * Only the persistent week rows must keep their DOM identity — they are what `Slide.In`
       * replays against on navigation. The first/last transition (filler) rows are intentionally
       * remounted when they start or stop animating (their `DirectionalSlideOut` wrapper mounts
       * only for the matching navigation direction), so they are excluded here.
       */
      const getWeekRows = () => Array.from(tbody.querySelectorAll(`tr.${calendarDayGridRowClassNames.root}`));
      const rowsBefore = getWeekRows();
      expect(rowsBefore.length).toBeGreaterThan(0);

      // Navigate to October 2020.
      rerender(<CalendarDay {...defaultProps} navigatedDate={new Date(2020, 9, 1)} />);

      const rowsAfter = getWeekRows();

      // Every week row present in both months must be the same DOM node — not a new element.
      const sharedCount = Math.min(rowsBefore.length, rowsAfter.length);
      for (let i = 0; i < sharedCount; i++) {
        expect(rowsAfter[i]).toBe(rowsBefore[i]);
      }
    });
  });

  /*
   * Motion-component wrappers (DirectionalSlide, Fade.In) must remain transparent —
   * table semantics require <tr> to be a direct child of <tbody> and <th>/<td>
   * to be direct children of <tr>. Any wrapper element would break a11y and CSS.
   */
  describe('motion wrappers preserve table structure', () => {
    it('renders week rows as direct children of <tbody>', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);
      const tbody = container.querySelector('tbody');
      expect(tbody).not.toBeNull();
      Array.from(tbody!.children).forEach(child => {
        expect(child.tagName).toBe('TR');
      });
    });

    it('renders weekday label cells as direct children of the header <tr>', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);
      // The header row contains the weekday label <th> cells (Sun, Mon, …)
      const headerCells = container.querySelectorAll('th[scope="col"]');
      expect(headerCells.length).toBeGreaterThan(0);
      headerCells.forEach(cell => {
        expect(cell.parentElement?.tagName).toBe('TR');
      });
    });

    /*
     * The transition rows are hidden filler that only exists so the styled layer has something to
     * slide out. They are `position: absolute; opacity: 0` at rest, so anything rendering them
     * without that CSS shows two bogus weeks.
     */
    it('renders the transition rows when the styled motion is present', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);

      expect(container.querySelectorAll('tr[aria-hidden="true"]')).toHaveLength(2);
    });
  });

  // Rows and cells own their own styles hooks, so the day picker only has to render them.
  describe('styling reaches the rows and cells', () => {
    it('applies the day cell and day button class names', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);

      const dayCell = container.querySelector('td[role="gridcell"]');
      expect(dayCell).not.toBeNull();
      expect(dayCell!.className).toContain(calendarDayGridCellClassNames.root);
      expect(dayCell!.querySelector('button')!.className).toContain(calendarDayGridCellClassNames.button);
    });

    it('applies the weekday label and week row class names', () => {
      const { container } = render(<CalendarDay {...defaultProps} />);

      expect(container.querySelector('th[scope="col"]')!.className).toContain(calendarDayGridHeaderCellClassNames.root);
      expect(container.querySelector(`.${calendarDayGridRowClassNames.root}`)).not.toBeNull();
    });

    it('applies the week number cell class name when week numbers are shown', () => {
      const { container } = render(<CalendarDay {...defaultProps} />, { showWeekNumbers: true });

      expect(container.querySelector('th[scope="row"]')!.className).toContain(
        calendarDayGridRowClassNames.weekNumberCell,
      );
    });
  });
});
