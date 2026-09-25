import * as React from 'react';
import { act, render } from '@testing-library/react';
import { DashboardGrid } from '../components/DashboardGrid/DashboardGrid';
import { DashboardGridItem } from '../components/DashboardGridItem/DashboardGridItem';
import type { DashboardGridHandle } from './useDashboardGrid';
import { useDashboardGrid } from './useDashboardGrid';

describe('useDashboardGrid', () => {
  it('returns the nearest public grid handle', () => {
    let captured: DashboardGridHandle | undefined;
    const Probe = () => {
      captured = useDashboardGrid();
      return null;
    };

    render(
      <DashboardGrid aria-label="Dashboard">
        <Probe />
        <DashboardGridItem id="item" item={{ column: 0, row: 0 }}>
          Item
        </DashboardGridItem>
      </DashboardGrid>,
    );

    expect(captured?.getItem('item')).toMatchObject({ id: 'item' });
    act(() => captured?.updateItem('item', { columnSpan: 2 }));
    expect(captured?.getItem('item')).toMatchObject({ columnSpan: 2 });
    expect('getStore' in captured!).toBe(false);
  });
});
