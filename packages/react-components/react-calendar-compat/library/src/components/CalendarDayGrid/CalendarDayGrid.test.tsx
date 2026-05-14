import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CalendarDayGrid } from './CalendarDayGrid';
import { isConformant } from '../../testing/isConformant';
import { DEFAULT_CALENDAR_STRINGS, DayOfWeek, DateRangeType, FirstWeekOfYear } from '../../utils';
import type { CalendarDayGridProps } from './CalendarDayGrid.types';

const defaultProps: CalendarDayGridProps = {
  strings: DEFAULT_CALENDAR_STRINGS,
  selectedDate: new Date(2020, 8, 18),
  navigatedDate: new Date(2020, 8, 18),
  dateRangeType: DateRangeType.Day,
  firstDayOfWeek: DayOfWeek.Sunday,
  firstWeekOfYear: FirstWeekOfYear.FirstFullWeek,
  onNavigateDate: jest.fn(),
  dateTimeFormatter: {
    formatMonthDayYear: () => 'm/d/y',
    formatMonthYear: () => 'm/y',
    formatDay: () => 'd',
    formatMonth: () => 'm',
    formatYear: () => 'y',
  },
};

/**
 * Finds a day cell (`<td>`) in the grid by its date's aria-label.
 * The aria-label on the button inside the cell follows the format: "day, month, year"
 */
function findDayCellByLabel(container: HTMLElement, day: number, month: string, year: number): HTMLElement {
  const button = container.querySelector(`button[aria-label="${day}, ${month}, ${year}"]`);
  return button?.closest('td') as HTMLElement;
}

describe('CalendarDayGrid', () => {
  isConformant({
    Component: CalendarDayGrid,
    displayName: 'CalendarDayGrid',
    requiredProps: defaultProps,
    disabledTests: [
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
      // This component is not currently intended to handle a ref
      'component-handles-ref',
      'component-has-root-ref',
      // This test doesn't apply for compat components that are closer to their v8 counterpart
      'consistent-callback-args',
      // Some classnames are applied conditionally
      'component-has-static-classnames-object',
    ],
  });

  describe('arrow key navigation', () => {
    it('should not call onNavigateDate when arrowing right within the current month view', () => {
      // September 18, 2020 is a Friday — arrowing right goes to Saturday the 19th (same row, same month)
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDayGrid {...defaultProps} onNavigateDate={onNavigateDate} />);

      const dayCell = findDayCellByLabel(container, 18, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowRight' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing right from the end of a row to the next row', () => {
      // September 5, 2020 is a Saturday (end of row). Arrowing right should wrap to Sunday the 6th
      // (beginning of next row).
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 5);
      const { container } = render(
        <CalendarDayGrid {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 5, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowRight' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing left from the beginning of a row to the previous row', () => {
      // September 6, 2020 is a Sunday (beginning of row). Arrowing left should wrap to Saturday the 5th
      // (end of previous row).
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 6);
      const { container } = render(
        <CalendarDayGrid {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 6, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowLeft' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing left within the current month view', () => {
      // September 18, 2020 is a Friday — arrowing left goes to Thursday the 17th (same row, same month)
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDayGrid {...defaultProps} onNavigateDate={onNavigateDate} />);

      const dayCell = findDayCellByLabel(container, 18, 'September', 2020);
      fireEvent.keyDown(dayCell, { key: 'ArrowLeft' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when arrowing down within the current month view', () => {
      // September 18 → September 25 (same column, next row, same month)
      const onNavigateDate = jest.fn();
      const { container } = render(<CalendarDayGrid {...defaultProps} onNavigateDate={onNavigateDate} />);

      const dayCell = findDayCellByLabel(container, 18, 'September', 2020);
      fireEvent.keyDown(dayCell, { key: 'ArrowDown' });
      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should call onNavigateDate when arrowing up past the beginning of the month view', () => {
      // September 1, 2020 is in the first visible row. Arrowing up goes to August 25 (transition row).
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 1);
      const { container } = render(
        <CalendarDayGrid {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 1, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowUp' });
      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      // Should navigate to August 25, 2020
      const navigatedTo = onNavigateDate.mock.calls[0][0] as Date;
      expect(navigatedTo.getMonth()).toBe(7); // August (0-indexed)
      expect(navigatedTo.getDate()).toBe(25);
    });

    it('should call onNavigateDate when arrowing down past the end of the month view', () => {
      // September 30, 2020 is in the last visible row. Arrowing down goes to October 7 (transition row).
      const onNavigateDate = jest.fn();
      const navigatedDate = new Date(2020, 8, 30);
      const { container } = render(
        <CalendarDayGrid {...defaultProps} navigatedDate={navigatedDate} onNavigateDate={onNavigateDate} />,
      );

      const dayCell = findDayCellByLabel(container, 30, 'September', 2020);
      expect(dayCell).toBeTruthy();

      fireEvent.keyDown(dayCell, { key: 'ArrowDown' });
      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      const navigatedTo = onNavigateDate.mock.calls[0][0] as Date;
      expect(navigatedTo.getMonth()).toBe(9); // October (0-indexed)
      expect(navigatedTo.getDate()).toBe(7);
    });
  });
});
