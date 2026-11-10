import * as React from 'react';
import { render } from '@testing-library/react';
import { CalendarMonth } from './CalendarMonth';
import { defaultNavigationIcons } from '../Calendar/calendarNavigationIcons';
import { DEFAULT_CALENDAR_STRINGS } from '../../utils';
import type { CalendarMonthProps } from './CalendarMonth.types';

const defaultProps: CalendarMonthProps = {
  strings: DEFAULT_CALENDAR_STRINGS,
  selectedDate: new Date(2025, 0, 15),
  navigatedDate: new Date(2025, 0, 15),
  onNavigateDate: jest.fn(),
  navigationIcons: defaultNavigationIcons,
};

describe('CalendarMonth', () => {
  it('should render without crashing', () => {
    expect(() => render(<CalendarMonth {...defaultProps} />)).not.toThrow();
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
