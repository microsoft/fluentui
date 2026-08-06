import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useGridNavigation } from './useGridNavigation';
import { Provider } from '../../components/Provider/Provider';

type TestGridProps = {
  circular?: boolean;
  homeEndNavigation?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

const TestGrid = (props: TestGridProps) => {
  const gridNavigationProps = useGridNavigation<HTMLDivElement>(props);

  return (
    <div role="grid" {...gridNavigationProps}>
      <div role="row">
        <button role="gridcell">A</button>
        <button role="gridcell">B</button>
      </div>
      <div role="row">
        <button role="gridcell">C</button>
        <button role="gridcell">D</button>
      </div>
    </div>
  );
};

describe('useGridNavigation', () => {
  it('does not wrap at grid boundaries by default', () => {
    const { getByRole } = render(<TestGrid />);
    const firstCell = getByRole('gridcell', { name: 'A' });
    const lastCell = getByRole('gridcell', { name: 'D' });

    firstCell.focus();
    fireEvent.keyDown(firstCell, { key: 'ArrowLeft' });
    expect(firstCell).toHaveFocus();

    lastCell.focus();
    fireEvent.keyDown(lastCell, { key: 'ArrowDown' });
    expect(lastCell).toHaveFocus();
  });

  it('does not navigate when the consumer prevents the keyboard event', () => {
    const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLDivElement>) => event.preventDefault());
    const { getByRole } = render(<TestGrid circular onKeyDown={onKeyDown} />);
    const firstCell = getByRole('gridcell', { name: 'A' });

    firstCell.focus();
    fireEvent.keyDown(firstCell, { key: 'ArrowRight' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(firstCell).toHaveFocus();
  });

  it('reverses horizontal arrow navigation in right-to-left mode', () => {
    const { getByRole } = render(<TestGrid circular />, {
      wrapper: ({ children }) => <Provider dir="rtl">{children}</Provider>,
    });
    const firstCell = getByRole('gridcell', { name: 'A' });
    const lastCell = getByRole('gridcell', { name: 'D' });

    firstCell.focus();
    fireEvent.keyDown(firstCell, { key: 'ArrowRight' });

    expect(lastCell).toHaveFocus();
  });

  it('supports row and grid boundary navigation with Home and End', () => {
    const { getByRole } = render(<TestGrid homeEndNavigation />);
    const firstCell = getByRole('gridcell', { name: 'A' });
    const secondCell = getByRole('gridcell', { name: 'B' });
    const thirdCell = getByRole('gridcell', { name: 'C' });
    const lastCell = getByRole('gridcell', { name: 'D' });

    lastCell.focus();
    fireEvent.keyDown(lastCell, { key: 'Home' });
    expect(thirdCell).toHaveFocus();

    fireEvent.keyDown(thirdCell, { key: 'End', ctrlKey: true });
    expect(lastCell).toHaveFocus();

    fireEvent.keyDown(lastCell, { key: 'Home', ctrlKey: true });
    expect(firstCell).toHaveFocus();

    fireEvent.keyDown(firstCell, { key: 'End' });
    expect(secondCell).toHaveFocus();
  });
});
