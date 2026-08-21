import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardGrid } from '../components/DashboardGrid/DashboardGrid';
import { DashboardGridProvider } from '../components/DashboardGridProvider/DashboardGridProvider';
import type { DashboardGridHandle } from './useDashboardGrid';
import { useDashboardGridSerializer } from './useDashboardGridSerializer';

describe('useDashboardGridSerializer', () => {
  it('registers model rendering and persistence serialization', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const Serializer = () => {
      useDashboardGridSerializer('metric', {
        serialize: value => `saved:${value}`,
        deserialize: value => String(value).replace('saved:', ''),
        render: value => <span>{`Metric ${value}`}</span>,
      });
      return null;
    };

    render(
      <DashboardGridProvider targetDocument={document}>
        <Serializer />
        <DashboardGrid
          aria-label="Dashboard"
          imperativeRef={imperativeRef}
          defaultItems={[{ id: 'metric', component: 'metric', data: 7 }]}
        />
      </DashboardGridProvider>,
    );

    expect(await screen.findByText('Metric 7')).toBeVisible();
    const saved = imperativeRef.current?.save();
    expect('items' in saved! ? saved.items[0].data : undefined).toBe('saved:7');
  });
});
