import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { DashboardGrid } from '../components/DashboardGrid/DashboardGrid';

describe('DashboardGrid keyboard resize integration', () => {
  it('resizes through a native handle and the shared keyboard transaction', async () => {
    const onResizeStart = jest.fn();
    const onResizeEnd = jest.fn();
    const { container } = render(
      <DashboardGrid
        aria-label="Dashboard"
        gridId="keyboard-resize-grid"
        onResizeStart={onResizeStart}
        onResizeEnd={onResizeEnd}
        defaultItems={[
          {
            id: 'item',
            column: 2,
            row: 1,
            columnSpan: 3,
            rowSpan: 2,
          },
        ]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const handle = await waitFor(() => {
      const element = container.querySelector(
        '[data-dashboard-grid-resize-handle="se"]',
      ) as HTMLButtonElement | null;
      expect(element).not.toBeNull();
      return element!;
    });

    fireEvent.keyDown(handle, { key: 'Enter' });
    expect(handle.getAttribute('aria-pressed')).toBe('true');
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    await waitFor(() => expect(handle.getAttribute('aria-pressed')).toBe('true'));
    fireEvent.keyDown(handle, { key: 'Enter' });

    const item = container.querySelector('[data-dashboard-grid-item="item"]') as HTMLElement;
    await waitFor(() => expect(item.style.getPropertyValue('--dashboard-grid-column-span')).toBe('4'));
    expect(item.style.getPropertyValue('--dashboard-grid-column')).toBe('2');
    expect(handle.getAttribute('aria-pressed')).toBe('false');
    expect(onResizeStart).toHaveBeenCalledTimes(1);
    expect(onResizeEnd).toHaveBeenCalledTimes(1);
  });
});
