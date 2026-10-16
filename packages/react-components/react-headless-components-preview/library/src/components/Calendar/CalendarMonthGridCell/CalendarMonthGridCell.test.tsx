import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarMonthGridCell } from './CalendarMonthGridCell';
import type { CalendarMonthGridCellProps } from './CalendarMonthGridCell.types';

const requiredProps: CalendarMonthGridCellProps = {
  month: {
    index: 0,
    label: 'Jan',
    ariaLabel: 'January',
    isNavigated: true,
    isCurrent: false,
    isSelected: true,
    isInBounds: true,
    onSelect: jest.fn(),
  },
};
const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <CalendarMonth navigatedDate={new Date(2020, 0, 18)} grid={{ children: <div role="row">{children}</div> }} />
);

describe('CalendarMonthGridCell', () => {
  isConformant({
    Component: CalendarMonthGridCell,
    displayName: 'CalendarMonthGridCell',
    requiredProps,
    renderOptions: { wrapper },
    getTargetElement: result => result.container.querySelector('[role="gridcell"]')!,
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('forwards a ref to its month button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByRole } = render(<CalendarMonthGridCell {...requiredProps} ref={ref} />, { wrapper });

    expect(ref.current).toBe(getByRole('gridcell', { name: 'January' }));
  });
});
