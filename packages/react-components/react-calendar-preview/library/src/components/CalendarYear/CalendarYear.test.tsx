import * as React from 'react';
import { render as testingRender, fireEvent } from '@testing-library/react';
import { CalendarYear } from './CalendarYear';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { formatDateTime as defaultFormatDateTime, formatLabel as defaultFormatLabel } from '../../utils';
import type { CalendarContextValue } from '../../contexts/calendarContext';
import type { CalendarYearRangeLabelData, FormatCalendarLabel, FormatDateTime } from '../../utils';

const CELL_COUNT = 12;

const requiredProps = {};

const render = (element: React.ReactElement, contextValue: Partial<CalendarContextValue> = {}) =>
  testingRender(element, {
    wrapper: ({ children }) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, ...contextValue }}>{children}</CalendarProvider>
    ),
  });

describe('CalendarYear', () => {
  it('should render without crashing', () => {
    expect(() => render(<CalendarYear {...requiredProps} />)).not.toThrow();
  });

  it('should render the navigated year range', () => {
    const { getByRole } = render(<CalendarYear {...requiredProps} navigatedYear={2025} />);
    const grid = getByRole('grid');
    // grid aria-label should contain the year range
    expect(grid.getAttribute('aria-label')).toContain('2025');
  });

  it('should format visible years', () => {
    const formatDateTime: FormatDateTime = (date, format) =>
      format === 'year' ? `Localized ${defaultFormatDateTime(date, format)}` : defaultFormatDateTime(date, format);
    const { getByRole, getByText } = render(<CalendarYear navigatedYear={2025} />, { formatDateTime });

    expect(getByText('Localized 2025 - Localized 2036')).toBeTruthy();
    expect(getByRole('gridcell', { name: 'Localized 2025' })).toBeTruthy();
  });

  it('should format the current and adjacent ranges for accessible labels', () => {
    const formatLabel = jest.fn((label: string, data: CalendarYearRangeLabelData): string => {
      if (label === 'yearRangePickerHeader') {
        return `Choose a year from ${data.formattedRange}`;
      }
      if (label === 'previousYearRange' && 'formattedRange' in data) {
        return `Previous ${data.fromYear} to ${data.toYear}`;
      }
      if (label === 'nextYearRange' && 'formattedRange' in data) {
        return `Next ${data.fromYear} to ${data.toYear}`;
      }
      return '';
    }) as unknown as FormatCalendarLabel;

    const { getAllByRole, getByRole } = render(<CalendarYear navigatedYear={2025} onHeaderSelect={jest.fn()} />, {
      formatLabel,
    });

    const buttons = getAllByRole('button');
    expect(getByRole('grid')).toHaveAttribute('aria-label', '2025 - 2036');
    expect(getByRole('button', { name: 'Choose a year from 2025 - 2036' })).toBeTruthy();
    expect(buttons[1]).toHaveAttribute('title', 'Previous 2013 to 2024');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Next 2037 to 2048');
    expect(formatLabel).toHaveBeenCalledWith('previousYearRange', {
      fromYear: 2013,
      toYear: 2024,
      formattedRange: '2013 - 2024',
    });
    expect(formatLabel).toHaveBeenCalledWith('nextYearRange', {
      fromYear: 2037,
      toYear: 2048,
      formattedRange: '2037 - 2048',
    });
    expect(formatLabel).toHaveBeenCalledWith('yearRangePickerHeader', {
      fromYear: 2025,
      toYear: 2036,
      formattedRange: '2025 - 2036',
    });
  });

  it('should update formatted range labels after navigating', () => {
    const formatLabel = ((label: string, data: CalendarYearRangeLabelData) => {
      if (label === 'previousYearRange') {
        return `Previous ${data.fromYear} to ${data.toYear}`;
      }
      if (label === 'nextYearRange') {
        return `Next ${data.fromYear} to ${data.toYear}`;
      }
      return '';
    }) as FormatCalendarLabel;
    const { getAllByRole } = render(<CalendarYear navigatedYear={2025} />, { formatLabel });

    let buttons = getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    buttons = getAllByRole('button');

    expect(buttons[0]).toHaveAttribute('title', 'Previous 2025 to 2036');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Next 2049 to 2060');
  });

  it('should support static range labels', () => {
    const formatLabel = ((label: string, _data: unknown) => {
      if (label === 'yearRangePickerHeader') {
        return 'Localized range';
      }
      return label === 'previousYearRange' ? 'Localized previous range' : 'Localized next range';
    }) as unknown as FormatCalendarLabel;
    const { getAllByRole, getByRole } = render(<CalendarYear navigatedYear={2025} onHeaderSelect={jest.fn()} />, {
      formatLabel,
    });

    const buttons = getAllByRole('button');
    expect(getByRole('button', { name: 'Localized range' })).toBeTruthy();
    expect(buttons[1]).toHaveAttribute('title', 'Localized previous range');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Localized next range');
  });

  it('should use default generated labels when formatters are not provided', () => {
    const { getAllByRole } = render(<CalendarYear navigatedYear={2025} onHeaderSelect={jest.fn()} />);

    const buttons = getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-label', '2025 - 2036, change year');
    expect(buttons[1]).toHaveAttribute('title', 'Previous year range 2013 - 2024');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Next year range 2037 - 2048');
  });

  it('should prefer explicit slot labels over generated labels', () => {
    const formatLabel = jest.fn(defaultFormatLabel) as unknown as FormatCalendarLabel;
    const { getAllByRole, getByRole } = render(
      <CalendarYear
        navigatedYear={2025}
        onHeaderSelect={jest.fn()}
        heading={{ 'aria-label': 'Custom heading label' }}
        previousRangeButton={{ title: 'Custom previous label' }}
        nextRangeButton={{ title: 'Custom next label' }}
        grid={{ 'aria-label': 'Custom grid label' }}
      />,
      { formatLabel },
    );

    const buttons = getAllByRole('button');
    expect(getByRole('button', { name: 'Custom heading label' })).toBeTruthy();
    expect(buttons[1]).toHaveAttribute('title', 'Custom previous label');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Custom next label');
    expect(getByRole('grid')).toHaveAttribute('aria-label', 'Custom grid label');
  });

  describe('onNavigateDate', () => {
    it('should call onNavigateDate with the next decade fromYear when the next button is clicked', () => {
      const onNavigateDate = jest.fn();
      const navigatedYear = 2025;
      /*
       * CalendarYear snaps fromYear to the navigatedYear (or selectedYear)
       * CELL_COUNT = 12, so next decade starts at navigatedYear + 12
       */
      const { getAllByRole } = render(
        <CalendarYear {...requiredProps} navigatedYear={navigatedYear} onNavigateDate={onNavigateDate} />,
      );

      // Navigation buttons: first is Previous, second is Next
      const navButtons = getAllByRole('button');
      const nextButton = navButtons[navButtons.length - 1];
      fireEvent.click(nextButton);

      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      expect(onNavigateDate.mock.calls[0][1].year).toBe(navigatedYear + CELL_COUNT);
    });

    it('should call onNavigateDate with the previous decade fromYear when the previous button is clicked', () => {
      const onNavigateDate = jest.fn();
      const navigatedYear = 2025;
      const { getAllByRole } = render(
        <CalendarYear {...requiredProps} navigatedYear={navigatedYear} onNavigateDate={onNavigateDate} />,
      );

      // Navigation buttons: first is Previous, second is Next
      const navButtons = getAllByRole('button');
      const prevButton = navButtons[0];
      fireEvent.click(prevButton);

      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      expect(onNavigateDate.mock.calls[0][1].year).toBe(navigatedYear - CELL_COUNT);
    });

    it('should not call onNavigateDate when previous button is disabled due to minYear', () => {
      const onNavigateDate = jest.fn();
      const navigatedYear = 2025;
      // Previous is disabled when fromYear < minYear; with fromYear=2025, minYear=2026 disables it
      const { getAllByRole } = render(
        <CalendarYear {...requiredProps} navigatedYear={navigatedYear} onNavigateDate={onNavigateDate} />,
        { minDate: new Date(navigatedYear + 1, 0, 1) },
      );

      const navButtons = getAllByRole('button');
      const prevButton = navButtons[0];
      fireEvent.click(prevButton);

      expect(onNavigateDate).not.toHaveBeenCalled();
    });

    it('should not call onNavigateDate when next button is disabled due to maxYear', () => {
      const onNavigateDate = jest.fn();
      const navigatedYear = 2025;
      // Next is disabled when fromYear + CELL_COUNT > maxYear; with fromYear=2025, maxYear=2036 disables it
      const { getAllByRole } = render(
        <CalendarYear {...requiredProps} navigatedYear={navigatedYear} onNavigateDate={onNavigateDate} />,
        { maxDate: new Date(navigatedYear + CELL_COUNT - 1, 11, 31) },
      );

      const navButtons = getAllByRole('button');
      const nextButton = navButtons[navButtons.length - 1];
      fireEvent.click(nextButton);

      expect(onNavigateDate).not.toHaveBeenCalled();
    });
  });

  describe('motion wrappers preserve grid structure', () => {
    it('renders all year rows under the grid with role="row"', () => {
      const { getByRole, getAllByRole } = render(<CalendarYear {...requiredProps} navigatedYear={2025} />);
      const grid = getByRole('grid');
      const rows = getAllByRole('row');
      // CalendarYear lays out CELL_COUNT (12) cells across rows of 4 — expect 3 rows.
      expect(rows.length).toBe(3);
      rows.forEach(row => {
        expect(grid.contains(row)).toBe(true);
      });
    });
  });
});
