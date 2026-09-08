import * as React from 'react';
import { render as testingRender, fireEvent } from '@testing-library/react';
import { CalendarYear } from './CalendarYear';
import type { CalendarYearHandle } from './CalendarYear.types';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { calendarFormatters } from '../../utils';
import type { CalendarContextValue } from '../../contexts/calendarContext';

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

  it('uses the provider today value and keeps unavailable years focusable without selecting them', () => {
    const onSelectYear = jest.fn();
    const { getByRole, getByTitle } = render(<CalendarYear navigatedYear={2025} onSelectYear={onSelectYear} />, {
      today: new Date(2025, 0, 15),
      minDate: new Date(2026, 0, 1),
      allFocusable: true,
    });
    const year = getByRole('gridcell', { name: '2025' });

    expect(year).toHaveAttribute('data-current');
    expect(year).not.toBeDisabled();
    expect(year).toHaveAttribute('aria-disabled', 'true');
    expect(year).toHaveAttribute('tabindex', '0');
    expect(getByTitle('Previous year range 2013 - 2024')).toHaveAttribute('tabindex', '0');
    fireEvent.click(year);
    fireEvent.keyDown(year, { key: 'Enter' });
    expect(onSelectYear).not.toHaveBeenCalled();
  });

  it('focuses the navigated year with an empty selection outside the current year range', () => {
    const ref = React.createRef<CalendarYearHandle>();
    const { getByRole } = render(<CalendarYear ref={ref} navigatedYear={2027} />, {
      today: new Date(2026, 8, 8),
      value: null,
    });

    ref.current?.focus();

    expect(getByRole('gridcell', { name: '2027' })).toHaveFocus();
  });

  it('focuses an available year when the navigated year is disabled', () => {
    const ref = React.createRef<CalendarYearHandle>();
    const { getByRole } = render(<CalendarYear ref={ref} navigatedYear={2025} selectedYear={2025} />, {
      minDate: new Date(2027, 0, 1),
      maxDate: new Date(2030, 11, 31),
    });

    ref.current?.focus();

    expect(getByRole('gridcell', { name: '2027' })).toHaveFocus();
  });

  it.each([2000, 2045])('prefers the navigated year over selectedYear=%s for its range and focus', selectedYear => {
    const ref = React.createRef<CalendarYearHandle>();
    const { getByRole } = render(<CalendarYear ref={ref} navigatedYear={2040} selectedYear={selectedYear} />);

    ref.current?.focus();

    expect(getByRole('grid')).toHaveAttribute('aria-label', '2040 - 2051');
    expect(getByRole('gridcell', { name: '2040' })).toHaveFocus();
  });

  it('uses the selected year for range and focus when navigation is unspecified', () => {
    const ref = React.createRef<CalendarYearHandle>();
    const { getByRole } = render(<CalendarYear ref={ref} selectedYear={2045} />);

    ref.current?.focus();

    expect(getByRole('grid')).toHaveAttribute('aria-label', '2045 - 2056');
    expect(getByRole('gridcell', { name: '2045' })).toHaveFocus();
  });

  it('updates selection without resetting an independently navigated range', () => {
    const { getByRole, rerender } = render(<CalendarYear navigatedYear={2040} selectedYear={2000} />);

    rerender(<CalendarYear navigatedYear={2040} selectedYear={2045} />);

    expect(getByRole('grid')).toHaveAttribute('aria-label', '2040 - 2051');
    expect(getByRole('gridcell', { name: '2045' })).toHaveAttribute('aria-selected', 'true');
  });

  it.each([false, true])('applies current-year styling only when highlightCurrent=%s', highlightCurrent => {
    const { getByRole } = render(<CalendarYear navigatedYear={2025} />, {
      today: new Date(2026, 8, 8),
      value: null,
      highlightCurrent,
    });
    const currentYear = getByRole('gridcell', { name: '2026' });
    const otherYear = getByRole('gridcell', { name: '2027' });

    expect(currentYear.className === otherYear.className).toBe(!highlightCurrent);
  });

  it.each([false, true])('keeps heading styles independent of current-year highlighting (clickable=%s)', clickable => {
    const onHeaderSelect = clickable ? jest.fn() : undefined;
    const renderPicker = (highlightCurrent: boolean) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, today: new Date(2026, 8, 8), highlightCurrent }}>
        <CalendarYear navigatedYear={2025} onHeaderSelect={onHeaderSelect} />
      </CalendarProvider>
    );
    const { getByText, getByRole, rerender } = testingRender(renderPicker(false));
    const headingClassName = getByText('2025 - 2036').className;
    const currentYearClassName = getByRole('gridcell', { name: '2026' }).className;

    rerender(renderPicker(true));

    expect(getByText('2025 - 2036').className).toBe(headingClassName);
    expect(getByRole('gridcell', { name: '2026' }).className).not.toBe(currentYearClassName);
  });

  it('should format visible years', () => {
    const dateTime: typeof calendarFormatters.dateTime = ({ date, format }) =>
      format === 'year'
        ? `Localized ${calendarFormatters.dateTime({ date, format })}`
        : calendarFormatters.dateTime({ date, format });
    const { getByRole, getByText } = render(<CalendarYear navigatedYear={2025} />, {
      formatters: { ...calendarFormatters, dateTime },
    });

    expect(getByText('Localized 2025 - Localized 2036')).toBeTruthy();
    expect(getByRole('gridcell', { name: 'Localized 2025' })).toBeTruthy();
  });

  it('preserves year selection with custom cell content', () => {
    const onSelectYear = jest.fn();
    const { getByRole } = render(
      <CalendarYear navigatedYear={2025} renderYear={year => <strong>FY {year}</strong>} onSelectYear={onSelectYear} />,
    );

    fireEvent.click(getByRole('gridcell', { name: 'FY 2027' }));

    expect(onSelectYear).toHaveBeenCalledTimes(1);
    expect(onSelectYear.mock.calls[0][1].year).toBe(2027);
  });

  it('should format the current and adjacent ranges for accessible labels', () => {
    const previousYearRangeLabel = jest.fn(
      (data: { fromYear: number; toYear: number }) => `Previous ${data.fromYear} to ${data.toYear}`,
    );
    const nextYearRangeLabel = jest.fn(
      (data: { fromYear: number; toYear: number }) => `Next ${data.fromYear} to ${data.toYear}`,
    );
    const yearRangePickerHeaderLabel = jest.fn(
      (data: { formattedRange: string }) => `Choose a year from ${data.formattedRange}`,
    );

    const { getAllByRole, getByRole } = render(<CalendarYear navigatedYear={2025} onHeaderSelect={jest.fn()} />, {
      formatters: {
        ...calendarFormatters,
        previousYearRangeLabel,
        nextYearRangeLabel,
        yearRangePickerHeaderLabel,
      },
    });

    const buttons = getAllByRole('button');
    expect(getByRole('grid')).toHaveAttribute('aria-label', '2025 - 2036');
    expect(getByRole('button', { name: 'Choose a year from 2025 - 2036' })).toBeTruthy();
    expect(buttons[1]).toHaveAttribute('title', 'Previous 2013 to 2024');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Next 2037 to 2048');
    expect(previousYearRangeLabel).toHaveBeenCalledWith({
      fromYear: 2013,
      toYear: 2024,
      formattedRange: '2013 - 2024',
    });
    expect(nextYearRangeLabel).toHaveBeenCalledWith({
      fromYear: 2037,
      toYear: 2048,
      formattedRange: '2037 - 2048',
    });
    expect(yearRangePickerHeaderLabel).toHaveBeenCalledWith({
      fromYear: 2025,
      toYear: 2036,
      formattedRange: '2025 - 2036',
    });
  });

  it('should update formatted range labels after navigating', () => {
    const { getAllByRole } = render(<CalendarYear navigatedYear={2025} />, {
      formatters: {
        ...calendarFormatters,
        previousYearRangeLabel: data => `Previous ${data.fromYear} to ${data.toYear}`,
        nextYearRangeLabel: data => `Next ${data.fromYear} to ${data.toYear}`,
      },
    });

    let buttons = getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    buttons = getAllByRole('button');

    expect(buttons[0]).toHaveAttribute('title', 'Previous 2025 to 2036');
    expect(buttons[buttons.length - 1]).toHaveAttribute('title', 'Next 2049 to 2060');
  });

  it('should support static range labels', () => {
    const { getAllByRole, getByRole } = render(<CalendarYear navigatedYear={2025} onHeaderSelect={jest.fn()} />, {
      formatters: {
        ...calendarFormatters,
        yearRangePickerHeaderLabel: () => 'Localized range',
        previousYearRangeLabel: () => 'Localized previous range',
        nextYearRangeLabel: () => 'Localized next range',
      },
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
    const { getAllByRole, getByRole } = render(
      <CalendarYear
        navigatedYear={2025}
        onHeaderSelect={jest.fn()}
        heading={{ 'aria-label': 'Custom heading label' }}
        previousRangeButton={{ title: 'Custom previous label' }}
        nextRangeButton={{ title: 'Custom next label' }}
        grid={{ 'aria-label': 'Custom grid label' }}
      />,
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
