import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CalendarYear } from './CalendarYear';
import { defaultNavigationIcons } from '../Calendar/calendarNavigationIcons';

const CELL_COUNT = 12;

const requiredProps = {
  navigationIcons: defaultNavigationIcons,
};

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

  describe('onNavigateDate', () => {
    it('should call onNavigateDate with the next decade fromYear when the next button is clicked', () => {
      const onNavigateDate = jest.fn();
      const navigatedYear = 2025;
      // CalendarYear snaps fromYear to the navigatedYear (or selectedYear)
      // CELL_COUNT = 12, so next decade starts at navigatedYear + 12
      const { getAllByRole } = render(
        <CalendarYear {...requiredProps} navigatedYear={navigatedYear} onNavigateDate={onNavigateDate} />,
      );

      // Navigation buttons: first is Previous, second is Next
      const navButtons = getAllByRole('button');
      const nextButton = navButtons[navButtons.length - 1];
      fireEvent.click(nextButton);

      expect(onNavigateDate).toHaveBeenCalledTimes(1);
      expect(onNavigateDate).toHaveBeenCalledWith(navigatedYear + CELL_COUNT);
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
      expect(onNavigateDate).toHaveBeenCalledWith(navigatedYear - CELL_COUNT);
    });

    it('should not call onNavigateDate when previous button is disabled due to minYear', () => {
      const onNavigateDate = jest.fn();
      const navigatedYear = 2025;
      // Previous is disabled when fromYear < minYear; with fromYear=2025, minYear=2026 disables it
      const { getAllByRole } = render(
        <CalendarYear
          {...requiredProps}
          navigatedYear={navigatedYear}
          minYear={navigatedYear + 1}
          onNavigateDate={onNavigateDate}
        />,
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
        <CalendarYear
          {...requiredProps}
          navigatedYear={navigatedYear}
          maxYear={navigatedYear + CELL_COUNT - 1}
          onNavigateDate={onNavigateDate}
        />,
      );

      const navButtons = getAllByRole('button');
      const nextButton = navButtons[navButtons.length - 1];
      fireEvent.click(nextButton);

      expect(onNavigateDate).not.toHaveBeenCalled();
    });
  });
});
