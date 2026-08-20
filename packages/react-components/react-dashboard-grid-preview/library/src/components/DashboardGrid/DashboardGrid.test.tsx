import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';
import { DashboardGrid } from './DashboardGrid';
import { DashboardGridProvider } from '../DashboardGridProvider/DashboardGridProvider';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';

describe('DashboardGrid', () => {
  it('renders uncontrolled defaultItems with deterministic geometry', () => {
    render(
      <DashboardGrid
        aria-label="Dashboard"
        defaultItems={[
          { id: 'one', column: 2, row: 3, columnSpan: 4, rowSpan: 2 },
        ]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const item = screen.getByText('one').closest('[data-dashboard-grid-item]');
    expect(item).toHaveAttribute('data-dashboard-grid-item', 'one');
    expect((item as HTMLElement).style.getPropertyValue('--dashboard-grid-column')).toBe('2');
    expect((item as HTMLElement).style.getPropertyValue('--dashboard-grid-row-span')).toBe('2');
  });

  it('exposes imperative uncontrolled commands separately from the root ref', () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    render(
      <DashboardGrid
        aria-label="Dashboard"
        imperativeRef={imperativeRef}
        defaultItems={[]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    act(() => {
      imperativeRef.current?.addItem({ id: 'added', column: 0, row: 0 });
    });

    expect(screen.getByText('added')).toBeInTheDocument();
  });

  it('reconciles controlled items without reloading on unrelated props', () => {
    const items = [{ id: 'controlled', column: 0, row: 0 }];
    const { rerender } = render(
      <DashboardGrid
        aria-label="Dashboard"
        items={items}
        data-extra="first"
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const item = screen.getByText('controlled').closest('[data-dashboard-grid-item]') as HTMLElement;
    expect(item.style.getPropertyValue('--dashboard-grid-column')).toBe('0');

    rerender(
      <DashboardGrid
        aria-label="Dashboard"
        items={items}
        data-extra="second"
        renderItem={resolved => <span>{resolved.id}</span>}
      />,
    );
    expect(item.style.getPropertyValue('--dashboard-grid-column')).toBe('0');

    rerender(
      <DashboardGrid
        aria-label="Dashboard"
        items={[{ id: 'controlled', column: 3, row: 0 }]}
        renderItem={resolved => <span>{resolved.id}</span>}
      />,
    );
    expect(item.style.getPropertyValue('--dashboard-grid-column')).toBe('3');
  });

  it('produces deterministic SSR geometry skeleton markup', () => {
    const markup = renderToString(
      <DashboardGridProvider targetDocument={null}>
        <DashboardGrid
          aria-label="Server dashboard"
          columns={6}
          rowHeight={64}
          defaultItems={[{ id: 'server', column: 1, row: 2, columnSpan: 3, rowSpan: 2 }]}
          renderItem={item => <span>{item.id}</span>}
        />
      </DashboardGridProvider>,
    );

    expect(markup).toContain('data-dashboard-grid-ssr=""');
    expect(markup).toContain('--dashboard-grid-column:1');
    expect(markup).toContain('--dashboard-grid-columns:6');
  });

  it('renders a visible fallback for unknown serialized components', () => {
    render(
      <DashboardGrid
        aria-label="Dashboard"
        defaultItems={[{ id: 'unknown', component: 'missing-component' }]}
      />,
    );

    expect(screen.getByText('Unknown dashboard component: missing-component')).toBeVisible();
  });

  it('uses caller-localized spatial and resize-handle strings', () => {
    render(
      <DashboardGrid
        aria-label="Dashboard"
        defaultItems={[{ id: 'localized', label: 'Friendly tile', column: 0, row: 0 }]}
        strings={{
          formatPosition: () => 'Localized position',
          formatResizeHandle: edge => `Localized ${edge}`,
        }}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const item = screen.getByText('localized').closest('[data-dashboard-grid-item]');
    expect(item).toHaveAttribute('aria-label', 'Friendly tile');
    expect(item).toHaveAttribute('aria-description', 'Localized position');
    expect(screen.getByRole('button', { name: 'Localized se' })).toBeVisible();
  });

  it('emits Fluent event data with input and kind metadata', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const onLayoutChange = jest.fn();
    render(
      <DashboardGrid
        aria-label="Dashboard"
        imperativeRef={imperativeRef}
        defaultItems={[]}
        onLayoutChange={onLayoutChange}
      />,
    );

    act(() => {
      imperativeRef.current?.addItem({ id: 'event-item' });
    });

    await waitFor(() =>
      expect(onLayoutChange).toHaveBeenCalledWith(
        expect.any(Event),
        expect.objectContaining({
          type: 'layout-change',
          input: 'api',
          kind: 'layout',
          gridId: expect.any(String),
        }),
      ),
    );
  });

  it('keeps the active pointer shell at origin while preview geometry and temporary rows update', () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const { container } = render(
      <DashboardGrid
        aria-label="Dashboard"
        gridId="pointer-grid"
        imperativeRef={imperativeRef}
        defaultItems={[{ id: 'active', column: 0, row: 0 }]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );
    const store = imperativeRef.current!.getStore();

    act(() => {
      store.beginInteraction('active', { kind: 'drag', source: 'internal' });
      store.move('active', { input: 'pointer', column: 3, row: 0 });
      store.publishPreview?.({
        operation: 'drag',
        sourceGridId: 'pointer-grid',
        targetGridId: 'pointer-grid',
        itemId: 'active',
        originRect: { column: 0, row: 0, columnSpan: 1, rowSpan: 1 },
        rect: { column: 3, row: 0, columnSpan: 1, rowSpan: 1 },
        temporaryRows: 4,
        valid: true,
      });
    });

    const item = screen.getByText('active').closest('[data-dashboard-grid-item]') as HTMLElement;
    const placeholder = container.querySelector('.fui-DashboardGrid__placeholder') as HTMLElement;
    const surface = container.querySelector('.fui-DashboardGrid__surface') as HTMLElement;
    expect(store.getItem('active')?.column).toBe(3);
    expect(item.style.getPropertyValue('--dashboard-grid-column')).toBe('0');
    expect(placeholder.style.getPropertyValue('--dashboard-grid-column')).toBe('3');
    expect(surface).toHaveAttribute('data-dashboard-grid-temporary-rows', '4');
    expect(surface.style.gridTemplateRows).toContain('repeat(4');
  });
});
