import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';
import { DashboardGrid } from './DashboardGrid';
import { DashboardGridProvider } from '../DashboardGridProvider/DashboardGridProvider';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';
import { createDashboardGridEngine } from '../../engine';
import { useRequiredDashboardGridContext_unstable } from '../../contexts';
import type { DashboardGridStore } from '../../state/DashboardGridStore.types';
import { isConformant } from '../../testing/isConformant';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

const pointerEvent = (type: string, init: { x: number; y: number; pointerId?: number }): PointerEvent => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: init.x,
    clientY: init.y,
    button: 0,
  });
  Object.defineProperties(event, {
    pointerId: { value: init.pointerId ?? 1 },
    pointerType: { value: 'mouse' },
    isPrimary: { value: true },
  });
  return event as PointerEvent;
};

const rect = (left: number, top: number, width: number, height: number): DOMRect =>
  ({
    x: left,
    y: top,
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRect);

const StoreCapture = (props: { onStore: (store: DashboardGridStore) => void }) => {
  const store = useRequiredDashboardGridContext_unstable(context => context.store);
  const { onStore } = props;
  useIsomorphicLayoutEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

describe('DashboardGrid', () => {
  isConformant({
    Component: DashboardGrid,
    displayName: 'DashboardGrid',
    requiredProps: { 'aria-label': 'Dashboard' },
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
  });

  it('renders a default state', () => {
    const { container } = render(<DashboardGrid aria-label="Dashboard" gridId="snapshot-grid" />);
    const root = container.firstElementChild as HTMLElement;
    const surface = root.firstElementChild as HTMLElement;

    expect({
      tagName: root.tagName,
      role: root.getAttribute('role'),
      label: root.getAttribute('aria-label'),
      gridId: root.getAttribute('data-dashboard-grid-root'),
      hasSurface: surface.classList.contains('fui-DashboardGrid__surface'),
    }).toMatchInlineSnapshot(`
      Object {
        "gridId": "snapshot-grid",
        "hasSurface": true,
        "label": "Dashboard",
        "role": "group",
        "tagName": "DIV",
      }
    `);
  });

  it('sets the resolved direction on the grid root', () => {
    const { container } = render(<DashboardGrid aria-label="Dashboard" direction="rtl" />);

    expect(container.firstElementChild).toHaveAttribute('dir', 'rtl');
  });

  it('renders uncontrolled defaultItems with deterministic geometry', () => {
    render(
      <DashboardGrid
        aria-label="Dashboard"
        defaultItems={[{ id: 'one', column: 2, row: 3, columnSpan: 4, rowSpan: 2 }]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const item = screen.getByText('one').closest('[data-dashboard-grid-item]');
    expect(item).toHaveAttribute('data-dashboard-grid-item', 'one');
    expect((item as HTMLElement).style.getPropertyValue('--dashboard-grid-column')).toBe('2');
    expect((item as HTMLElement).style.getPropertyValue('--dashboard-grid-row-span')).toBe('2');
  });

  it('renders a React-owned custom preview in the body during an internal pointer drag', () => {
    const frames: FrameRequestCallback[] = [];
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.push(callback);
      return frames.length;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
    const onUnmount = jest.fn();
    const CustomPreview = () => {
      React.useEffect(
        () => () => {
          onUnmount();
        },
        [],
      );
      return <span data-testid="custom-drag-preview">Custom preview</span>;
    };

    render(
      <DashboardGrid
        aria-label="Dashboard"
        columns={4}
        rowHeight={100}
        drag={{ preview: <CustomPreview />, portal: 'body' }}
        defaultItems={[{ id: 'item', column: 0, row: 0 }]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const item = screen.getByText('item').closest('[data-dashboard-grid-item]') as HTMLElement;
    const surface = item.parentElement as HTMLElement;
    Object.defineProperties(surface, {
      offsetWidth: { configurable: true, value: 400 },
      offsetHeight: { configurable: true, value: 400 },
    });
    jest.spyOn(surface, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 400, 400));
    jest.spyOn(item, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));

    act(() => {
      item.dispatchEvent(pointerEvent('pointerdown', { x: 10, y: 10 }));
      document.dispatchEvent(pointerEvent('pointermove', { x: 20, y: 10 }));
      frames.shift()?.(0);
    });

    const preview = screen.getByTestId('custom-drag-preview').closest('[data-dashboard-grid-preview]');
    expect(preview?.parentElement).toBe(document.body);
    expect(item.style.transform).toBe('');

    act(() => {
      document.dispatchEvent(pointerEvent('pointercancel', { x: 20, y: 10 }));
    });

    expect(screen.queryByTestId('custom-drag-preview')).not.toBeInTheDocument();
    expect(onUnmount).toHaveBeenCalledTimes(1);
  });

  it('renders a clone preview in the item parent and removes it after drop', () => {
    const frames: FrameRequestCallback[] = [];
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.push(callback);
      return frames.length;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);

    render(
      <DashboardGrid
        aria-label="Dashboard"
        columns={4}
        rowHeight={100}
        drag={{ preview: 'clone', portal: 'parent' }}
        defaultItems={[{ id: 'item', column: 0, row: 0 }]}
        renderItem={item => <span data-testid="clone-content">{item.id}</span>}
      />,
    );

    const item = screen.getAllByTestId('clone-content')[0].closest('[data-dashboard-grid-item]') as HTMLElement;
    const surface = item.parentElement as HTMLElement;
    Object.defineProperties(surface, {
      offsetWidth: { configurable: true, value: 400 },
      offsetHeight: { configurable: true, value: 400 },
    });
    jest.spyOn(surface, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 400, 400));
    jest.spyOn(item, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));

    act(() => {
      item.dispatchEvent(pointerEvent('pointerdown', { x: 10, y: 10 }));
      document.dispatchEvent(pointerEvent('pointermove', { x: 25, y: 15 }));
      frames.shift()?.(0);
    });

    expect(screen.getAllByTestId('clone-content')).toHaveLength(2);
    const preview = surface.querySelector('[data-dashboard-grid-preview]') as HTMLElement;
    expect(preview).toBeInTheDocument();
    expect(preview.style.transform).toBe('translate3d(15px, 5px, 0)');
    expect(item.style.transform).toBe('');

    act(() => {
      document.dispatchEvent(pointerEvent('pointerup', { x: 25, y: 15 }));
    });
    expect(surface.querySelector('[data-dashboard-grid-preview]')).toBeNull();
  });

  it('renders a functional preview in an explicit portal and cleans it up on unmount', () => {
    const frames: FrameRequestCallback[] = [];
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.push(callback);
      return frames.length;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
    const portal = document.createElement('div');
    document.body.appendChild(portal);
    const onUnmount = jest.fn();
    const FunctionalPreview = (props: { id: string }) => {
      React.useEffect(
        () => () => {
          onUnmount();
        },
        [],
      );
      return <span data-testid="functional-preview">{props.id}</span>;
    };

    const view = render(
      <DashboardGrid
        aria-label="Dashboard"
        columns={4}
        rowHeight={100}
        drag={{
          preview: item => <FunctionalPreview id={item.id} />,
          portal,
        }}
        defaultItems={[{ id: 'explicit', column: 0, row: 0 }]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    const item = screen.getByText('explicit').closest('[data-dashboard-grid-item]') as HTMLElement;
    const surface = item.parentElement as HTMLElement;
    Object.defineProperties(surface, {
      offsetWidth: { configurable: true, value: 400 },
      offsetHeight: { configurable: true, value: 400 },
    });
    jest.spyOn(surface, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 400, 400));
    jest.spyOn(item, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));

    act(() => {
      item.dispatchEvent(pointerEvent('pointerdown', { x: 10, y: 10 }));
      document.dispatchEvent(pointerEvent('pointermove', { x: 20, y: 10 }));
      frames.shift()?.(0);
    });

    expect(portal).toContainElement(screen.getByTestId('functional-preview'));

    view.unmount();
    expect(portal.querySelector('[data-dashboard-grid-preview]')).toBeNull();
    expect(onUnmount).toHaveBeenCalledTimes(1);
    portal.remove();
  });

  it.each([undefined, 'item'] as const)(
    'moves the original item without creating a portal preview for %s preview',
    preview => {
      const frames: FrameRequestCallback[] = [];
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
        frames.push(callback);
        return frames.length;
      });
      jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);

      render(
        <DashboardGrid
          aria-label="Dashboard"
          columns={4}
          rowHeight={100}
          drag={{ preview }}
          defaultItems={[{ id: 'item', column: 0, row: 0 }]}
          renderItem={item => <span>{item.id}</span>}
        />,
      );

      const item = screen.getByText('item').closest('[data-dashboard-grid-item]') as HTMLElement;
      const surface = item.parentElement as HTMLElement;
      Object.defineProperties(surface, {
        offsetWidth: { configurable: true, value: 400 },
        offsetHeight: { configurable: true, value: 400 },
      });
      jest.spyOn(surface, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 400, 400));
      jest.spyOn(item, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));

      act(() => {
        item.dispatchEvent(pointerEvent('pointerdown', { x: 10, y: 10 }));
        document.dispatchEvent(pointerEvent('pointermove', { x: 20, y: 10 }));
        frames.shift()?.(0);
      });

      expect(item.style.transform).toContain('translate3d(10px, 0px, 0)');
      expect(document.querySelector('[data-dashboard-grid-preview]')).toBeNull();

      act(() => {
        document.dispatchEvent(pointerEvent('pointercancel', { x: 20, y: 10 }));
      });
    },
  );

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
    render(<DashboardGrid aria-label="Dashboard" defaultItems={[{ id: 'unknown', component: 'missing-component' }]} />);

    expect(screen.getByText('Unknown dashboard component: missing-component')).toBeVisible();
  });

  it('renders registered components and a caller-provided unknown fallback', () => {
    const Metric = (props: Record<string, unknown>) => <span>{`Metric ${String(props.value)}`}</span>;
    render(
      <DashboardGrid
        aria-label="Dashboard"
        components={{ metric: Metric }}
        renderUnknownComponent={item => <span>{`Missing ${item.id}`}</span>}
        defaultItems={[
          { id: 'known', component: 'metric', props: { value: 7 } },
          { id: 'missing', component: 'unknown' },
        ]}
      />,
    );

    expect(screen.getByText('Metric 7')).toBeVisible();
    expect(screen.getByText('Missing missing')).toBeVisible();
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
        resize={{ handleVisibility: 'always' }}
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
    const onItemsChange = jest.fn();

    const compatibilityProps: Pick<React.ComponentProps<typeof DashboardGrid>, 'onLayoutChange'> = { onLayoutChange };
    render(
      <DashboardGrid
        {...compatibilityProps}
        aria-label="Dashboard"
        imperativeRef={imperativeRef}
        defaultItems={[]}
        onItemsChange={onItemsChange}
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
    expect(onItemsChange).toHaveBeenCalledWith(
      expect.any(Event),
      expect.objectContaining({
        type: 'items-change',
        input: 'api',
        reason: 'add',
        affectedItems: [expect.objectContaining({ id: 'event-item' })],
      }),
    );
  });

  it('renders and updates absolute screen geometry through the public handle', () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    render(
      <DashboardGrid
        aria-label="Dashboard"
        imperativeRef={imperativeRef}
        columns={4}
        rowHeight={64}
        float
        defaultItems={[{ id: 'active', column: 1, row: 2, columnSpan: 2, rowSpan: 2 }]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );
    const item = screen.getByText('active').closest('[data-dashboard-grid-item]') as HTMLElement;
    const surface = item.parentElement as HTMLElement;

    expect(getComputedStyle(item).position).toBe('absolute');
    expect(surface).toHaveClass('fui-DashboardGrid__surface');
    expect(getComputedStyle(surface).position).toBe('relative');
    expect(getComputedStyle(surface).overflow).toBe('visible');
    expect(item.style.insetInlineStart).toBe('25%');
    expect(item.style.top).toBe('128px');
    expect(item.style.width).toBe('50%');
    expect(item.style.height).toBe('128px');

    act(() => {
      imperativeRef.current?.updateItem('active', { column: 2, row: 1 });
    });
    expect(item.style.insetInlineStart).toBe('50%');
    expect(item.style.top).toBe('64px');
  });

  it('exposes the architecture command surface without a mutable store escape hatch', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const onEnabledChange = jest.fn();
    const onContentResize = jest.fn();
    render(
      <DashboardGrid
        aria-label="Dashboard"
        imperativeRef={imperativeRef}
        defaultItems={[
          {
            id: 'wide',
            column: 0,
            row: 0,
            columnSpan: 2,
            rowSpan: 1,
          },
        ]}
        onEnabledChange={onEnabledChange}
        onContentResize={onContentResize}
        renderItem={item => <span>{item.id}</span>}
      />,
    );
    const handle = imperativeRef.current!;

    expect('getStore' in handle).toBe(false);
    expect(handle.getItem('wide')).toMatchObject({ id: 'wide', columnSpan: 2 });
    expect(handle.getItems()).toHaveLength(1);
    expect(handle.canPlace({ id: 'candidate', column: 3, row: 0 }).fits).toBe(true);
    expect(handle.isAreaEmpty({ column: 3, row: 0, columnSpan: 1, rowSpan: 1 })).toBe(true);
    expect(handle.getCellFromPoint({ clientX: 0, clientY: 0 })).toEqual({
      column: 0,
      row: 0,
    });
    expect(handle.save()).toMatchObject({
      version: 1,
      options: expect.any(Object),
      items: [expect.objectContaining({ id: 'wide' })],
    });
    expect(handle.save({ itemsOnly: true })).toEqual([expect.objectContaining({ id: 'wide' })]);

    act(() => {
      handle.batch(() => {
        handle.addItem({ id: 'second', column: 3, row: 0 });
        handle.updateItem('wide', { rowSpan: 2 });
      });
      handle.setColumns(6, 'move');
      handle.rotateItem('wide');
      handle.disable();
    });
    await waitFor(() =>
      expect(onEnabledChange).toHaveBeenCalledWith(
        expect.any(Event),
        expect.objectContaining({ type: 'enabled-change', enabled: false }),
      ),
    );
    expect(handle.getItem('wide')).toMatchObject({
      columnSpan: 2,
      rowSpan: 2,
    });
    expect(screen.queryByRole('button', { name: /Resize wide/i })).toBeNull();

    act(() => {
      handle.enable();
      handle.refreshDragHandles('wide');
      handle.resizeItemToContent('wide');
      handle.focusItem('wide');
      handle.removeItem('second');
      handle.removeAll();
    });
    expect(handle.getItems()).toEqual([]);
    expect(onContentResize).toHaveBeenCalledWith(
      expect.any(Event),
      expect.objectContaining({ type: 'content-resize', input: 'content' }),
    );
  });

  it('applies gap, row constraints, disablement, and injected-engine options', () => {
    const engineFactory = jest.fn(options => createDashboardGridEngine(options));
    const { container } = render(
      <DashboardGrid
        aria-label="Dashboard"
        columns={4}
        rowHeight={50}
        gap="8px 12px"
        minRows={3}
        fixedRows={4}
        disableDrag
        disableResize
        layoutEngine={engineFactory}
        defaultItems={[{ id: 'item', column: 0, row: 0 }]}
        renderItem={item => <span>{item.id}</span>}
      />,
    );

    expect(engineFactory).toHaveBeenCalledWith(
      expect.objectContaining({
        columns: 4,
        maxRows: 4,
        resizeDisabled: true,
      }),
    );
    const surface = container.querySelector('.fui-DashboardGrid__surface') as HTMLElement;
    expect(surface.style.rowGap).toBe('8px');
    expect(surface.style.columnGap).toBe('12px');
    expect(surface.style.blockSize).toBe('200px');
    expect(screen.queryByRole('button', { name: /Resize item/i })).toBeNull();
  });

  it('positions the placeholder absolutely inside the surface and reserves temporary rows', async () => {
    let store: DashboardGridStore | undefined;
    const { container } = render(
      <DashboardGrid
        aria-label="Dashboard"
        gridId="preview-grid"
        columns={4}
        rowHeight={50}
        defaultItems={[{ id: 'item', column: 0, row: 0 }]}
        renderItem={() => (
          <StoreCapture
            onStore={next => {
              store = next;
            }}
          />
        )}
      />,
    );
    await waitFor(() => expect(store).toBeDefined());

    act(() => {
      store?.publishPreview?.({
        operation: 'drag',
        sourceGridId: 'preview-grid',
        targetGridId: 'preview-grid',
        itemId: 'item',
        originRect: { column: 0, row: 0, columnSpan: 1, rowSpan: 1 },
        rect: { column: 2, row: 3, columnSpan: 1, rowSpan: 1 },
        temporaryRows: 5,
        valid: true,
      });
    });

    const surface = container.querySelector('.fui-DashboardGrid__surface') as HTMLElement;
    const placeholder = container.querySelector('.fui-DashboardGrid__placeholder') as HTMLElement;
    expect(placeholder.parentElement).toBe(surface);
    expect(getComputedStyle(placeholder).position).toBe('absolute');
    expect(placeholder.style.insetInlineStart).toBe('50%');
    expect(placeholder.style.top).toBe('150px');
    expect(surface.style.blockSize).toBe('250px');
  });

  it('emits public drag and resize progress callbacks from interaction intents', async () => {
    let store: DashboardGridStore | undefined;
    const onDrag = jest.fn();
    const onResize = jest.fn();
    render(
      <DashboardGrid
        aria-label="Dashboard"
        gridId="progress-grid"
        defaultItems={[{ id: 'item', column: 0, row: 0 }]}
        onDrag={onDrag}
        onResize={onResize}
        renderItem={() => (
          <StoreCapture
            onStore={next => {
              store = next;
            }}
          />
        )}
      />,
    );
    await waitFor(() => expect(store).toBeDefined());

    act(() => {
      store?.events.enqueue({
        type: 'update',
        operation: 'drag',
        input: 'pointer',
        sourceGridId: 'progress-grid',
        targetGridId: 'progress-grid',
        itemId: 'item',
        previous: { column: 0, row: 0, columnSpan: 1, rowSpan: 1 },
        current: { column: 1, row: 0, columnSpan: 1, rowSpan: 1 },
      });
      store?.events.enqueue({
        type: 'update',
        operation: 'resize',
        input: 'pointer',
        sourceGridId: 'progress-grid',
        targetGridId: 'progress-grid',
        itemId: 'item',
        previous: { column: 1, row: 0, columnSpan: 1, rowSpan: 1 },
        current: { column: 1, row: 0, columnSpan: 2, rowSpan: 1 },
      });
      store?.events.flush();
    });

    expect(onDrag).toHaveBeenCalledWith(expect.any(Event), expect.objectContaining({ type: 'drag', kind: 'drag' }));
    expect(onResize).toHaveBeenCalledWith(
      expect.any(Event),
      expect.objectContaining({ type: 'resize', kind: 'resize' }),
    );
  });
});
