import * as React from 'react';
import { fireEvent, render as testingRender } from '@testing-library/react';
import { CalendarMonth } from './CalendarMonth';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { calendarFormatters } from '../../utils';
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

type FormatDateTime = typeof calendarFormatters.dateTime;

describe('CalendarMonth', () => {
  it('should render without crashing', () => {
    expect(() => render(<CalendarMonth {...defaultProps} />)).not.toThrow();
  });

  it('uses localized strings for the header and year navigation buttons', () => {
    const dateTime: FormatDateTime = ({ date, format }) => `Localized ${calendarFormatters.dateTime({ date, format })}`;
    const { getByRole } = render(<CalendarMonth {...defaultProps} yearPickerHidden />, {
      formatters: {
        ...calendarFormatters,
        dateTime,
        monthPickerHeaderLabel: data => `Change the displayed year: ${data.formattedDate}`,
        previousYearLabel: data => `Go to prior year ${data.formattedDate}`,
        nextYearLabel: data => `Go to following year ${data.formattedDate}`,
      },
    });

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
    const { getAllByRole, getByRole } = render(<CalendarMonth {...defaultProps} />, {
      formatters: {
        ...calendarFormatters,
        monthPickerHeaderLabel: data => `Change the displayed year: ${data.formattedDate}`,
        yearRangePickerHeaderLabel: data => `Change the displayed year: ${data.formattedRange}`,
        previousYearRangeLabel: data => `Earlier years ${data.formattedRange}`,
        nextYearRangeLabel: data => `Later years ${data.formattedRange}`,
      },
    });

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
