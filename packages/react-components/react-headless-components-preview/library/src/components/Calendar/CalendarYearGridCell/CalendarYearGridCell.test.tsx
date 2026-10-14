import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { CalendarYear } from '../CalendarYear';
import { CalendarYearGridCell } from './CalendarYearGridCell';
import type { CalendarYearGridCellProps } from './CalendarYearGridCell.types';

const requiredProps: CalendarYearGridCellProps = {
  cell: {
    year: 2020,
    content: '2020',
    isNavigated: true,
    isCurrent: false,
    isSelected: true,
    isDisabled: false,
  },
};
const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <CalendarYear navigatedYear={2020} grid={{ children: <div role="row">{children}</div> }} />
);

describe('CalendarYearGridCell', () => {
  isConformant({
    Component: CalendarYearGridCell,
    displayName: 'CalendarYearGridCell',
    requiredProps,
    renderOptions: { wrapper },
    getTargetElement: result => result.container.querySelector('[role="gridcell"]')!,
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('forwards a ref to its year button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByRole } = render(<CalendarYearGridCell {...requiredProps} ref={ref} />, { wrapper });

    expect(ref.current).toBe(getByRole('gridcell', { name: '2020' }));
  });
});
