import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { DashboardGrid } from '../components/DashboardGrid/DashboardGrid';
import { DashboardGridItem } from '../components/DashboardGridItem/DashboardGridItem';
import type { DashboardGridHandle } from './useDashboardGrid';
import { useDashboardGridItem } from './useDashboardGridItem';

describe('useDashboardGridItem', () => {
  it('subscribes to the current declarative item snapshot', () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const Probe = () => {
      const snapshot = useDashboardGridItem();
      return <output>{snapshot.item?.columnSpan}</output>;
    };

    render(
      <DashboardGrid aria-label="Dashboard" imperativeRef={imperativeRef}>
        <DashboardGridItem id="item" item={{ columnSpan: 1 }}>
          <Probe />
        </DashboardGridItem>
      </DashboardGrid>,
    );

    expect(screen.getByText('1')).toBeVisible();
    act(() => imperativeRef.current?.updateItem('item', { columnSpan: 3 }));
    expect(screen.getByText('3')).toBeVisible();
  });
});
