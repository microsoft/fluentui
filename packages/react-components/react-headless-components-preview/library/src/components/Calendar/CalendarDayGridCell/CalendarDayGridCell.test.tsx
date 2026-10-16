import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { CalendarDay } from '../CalendarDay';
import { CalendarDayGridCell } from './CalendarDayGridCell';
import type { CalendarDayGridCellProps } from './CalendarDayGridCell.types';

const date = new Date(2020, 8, 18);
const requiredProps: CalendarDayGridCellProps = {
  day: {
    key: '2020-8-18',
    date: '18',
    originalDate: date,
    isPlaceholder: false,
    isInMonth: true,
    isToday: true,
    isSelected: true,
    isSingleSelected: true,
    isInBounds: true,
    isMarked: false,
    onSelected: jest.fn(),
    setRef: jest.fn(),
  },
  dayIndex: 0,
  weekIndex: 0,
};
const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <CalendarDay navigatedDate={date} body={{ children: <tr>{children}</tr> }} />
);

describe('CalendarDayGridCell', () => {
  isConformant({
    Component: CalendarDayGridCell,
    displayName: 'CalendarDayGridCell',
    requiredProps,
    renderOptions: { wrapper },
    getTargetElement: result => result.container.querySelector('td')!,
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('forwards a ref to its table cell', () => {
    const ref = React.createRef<HTMLTableCellElement>();
    const { getByRole } = render(<CalendarDayGridCell {...requiredProps} ref={ref} />, { wrapper });

    expect(ref.current).toBe(getByRole('gridcell'));
  });
});
