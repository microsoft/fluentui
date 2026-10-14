import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { CalendarDay } from '../CalendarDay';
import {
  CalendarDayGridHeaderCell as PublicCalendarDayGridHeaderCell,
  renderCalendarDayGridHeaderCell,
  useCalendarDayGridHeaderCell,
} from '../../../calendar';
import { CalendarDayGridHeaderCell } from './CalendarDayGridHeaderCell';
import type { CalendarDayGridHeaderCellProps } from './CalendarDayGridHeaderCell.types';

const requiredProps: CalendarDayGridHeaderCellProps = {
  dayLabel: { key: 'sunday', content: 'S', label: 'Sunday' },
};
const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <CalendarDay
    navigatedDate={new Date(2020, 8, 18)}
    grid={{ 'aria-activedescendant': undefined }}
    body={{ children: <tr>{children}</tr> }}
  />
);

describe('CalendarDayGridHeaderCell', () => {
  isConformant({
    Component: CalendarDayGridHeaderCell,
    displayName: 'CalendarDayGridHeaderCell',
    requiredProps,
    renderOptions: { wrapper },
    getTargetElement: result => result.container.querySelector('th')!,
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('exports its component, hook and renderer through the public calendar subpath', () => {
    expect(PublicCalendarDayGridHeaderCell).toBe(CalendarDayGridHeaderCell);
    expect(useCalendarDayGridHeaderCell).toBeInstanceOf(Function);
    expect(renderCalendarDayGridHeaderCell).toBeInstanceOf(Function);
  });

  it('forwards a ref to its column header', () => {
    const ref = React.createRef<HTMLTableCellElement>();
    const { getByRole } = render(<CalendarDayGridHeaderCell {...requiredProps} ref={ref} />, { wrapper });

    expect(ref.current).toBe(getByRole('columnheader', { name: 'Sunday' }));
  });
});
