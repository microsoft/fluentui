import * as React from 'react';
import { fireEvent, render as testingRender } from '@testing-library/react';
import { CalendarMonth } from './CalendarMonth';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { formatDateTime as defaultFormatDateTime, formatLabel as defaultFormatLabel } from '../../utils';
import type { CalendarDateLabelData, FormatCalendarLabel, FormatDateTime } from '../../utils';
import type { CalendarContextValue } from '../../contexts/calendarContext';
import type { CalendarMonthProps } from './CalendarMonth.types';

const defaultProps: CalendarMonthProps = {
  navigatedDate: new Date(2025, 0, 15),
  onNavigateDate: jest.fn(),
};

const render = (element: React.ReactElement, contextValue: Partial<CalendarContextValue> = {}) =>
  testingRender(element, {
    wrapper: ({ children }) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, value: new Date(2025, 0, 15), ...contextValue }}>
        {children}
      </CalendarProvider>
    ),
  });

describe('CalendarMonth', () => {
  it('should render without crashing', () => {
    expect(() => render(<CalendarMonth {...defaultProps} />)).not.toThrow();
  });

  it('uses localized strings for the header and year navigation buttons', () => {
    const formatDateTime: FormatDateTime = (date, format) => `Localized ${defaultFormatDateTime(date, format)}`;
    const formatLabel = ((label: string, data: CalendarDateLabelData) => {
      switch (label) {
        case 'monthPickerHeader':
          return `Change the displayed year: ${data.formattedDate}`;
        case 'previousYear':
          return `Go to prior year ${data.formattedDate}`;
        case 'nextYear':
          return `Go to following year ${data.formattedDate}`;
        default:
          return defaultFormatLabel(label as 'selectedDate', data);
      }
    }) as FormatCalendarLabel;
    const { getByRole } = render(<CalendarMonth {...defaultProps} yearPickerHidden />, { formatDateTime, formatLabel });

    expect(getByRole('button', { name: 'Change the displayed year: Localized 2025' })).toBeTruthy();
    expect(getByRole('button', { name: 'Go to prior year Localized 2024' })).toHaveAttribute(
      'title',
      'Go to prior year Localized 2024',
    );
    expect(getByRole('button', { name: 'Go to following year Localized 2026' })).toHaveAttribute(
      'title',
      'Go to following year Localized 2026',
    );
    expect(getByRole('gridcell', { name: 'Localized January' })).toHaveTextContent('Localized Jan');
  });

  it('passes localized range strings to the year picker', () => {
    const formatLabel = ((label: string, data: { formattedDate?: string; formattedRange?: string }) => {
      if (label === 'monthPickerHeader') {
        return `Change the displayed year: ${data.formattedDate}`;
      }
      if (label === 'yearRangePickerHeader') {
        return `Change the displayed year: ${data.formattedRange}`;
      }
      if (label === 'previousYearRange') {
        return `Earlier years ${data.formattedRange}`;
      }
      if (label === 'nextYearRange') {
        return `Later years ${data.formattedRange}`;
      }
      return '';
    }) as FormatCalendarLabel;
    const { getAllByRole, getByRole } = render(<CalendarMonth {...defaultProps} />, { formatLabel });

    fireEvent.click(getByRole('button', { name: 'Change the displayed year: 2025' }));

    const buttons = getAllByRole('button');
    expect(getByRole('button', { name: 'Change the displayed year: 2025 - 2036' })).toBeTruthy();
    expect(buttons[1]).toHaveAttribute('title', 'Earlier years 2013 - 2024');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Later years 2037 - 2048');
  });

  describe('motion wrappers preserve grid structure', () => {
    it('renders all month rows under the grid with role="row"', () => {
      const { getByRole, getAllByRole } = render(<CalendarMonth {...defaultProps} />);
      const grid = getByRole('grid');
      const rows = getAllByRole('row');
      // 12 months laid out 4 per row → 3 rows
      expect(rows.length).toBe(3);
      rows.forEach(row => {
        expect(grid.contains(row)).toBe(true);
      });
    });

    it('renders month buttons as gridcells inside rows', () => {
      const { getAllByRole } = render(<CalendarMonth {...defaultProps} />);
      const cells = getAllByRole('gridcell');
      expect(cells.length).toBe(12);
      cells.forEach(cell => {
        expect(cell.parentElement?.getAttribute('role')).toBe('row');
      });
    });
  });
});
