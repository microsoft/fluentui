import * as React from 'react';
import { createPortal } from 'react-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRequiredDashboardGridProviderContext_unstable } from '../../contexts';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';
import { DashboardGridProvider } from './DashboardGridProvider';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';
import type { DashboardGridInteractionCoordinator } from '../../interaction/types';

let capturedRegistry: DashboardGridRegistry | undefined;
let capturedCoordinator: DashboardGridInteractionCoordinator | undefined;

const CaptureRegistry = () => {
  capturedRegistry = useRequiredDashboardGridProviderContext_unstable(context => context.registry);
  capturedCoordinator = useRequiredDashboardGridProviderContext_unstable(
    context => context.coordinator,
  );
  return null;
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
  }) as DOMRect;

const StatefulContent = () => {
  const [count, setCount] = React.useState(0);
  return (
    <button type="button" onClick={() => setCount(value => value + 1)}>
      Count {count}
    </button>
  );
};

describe('DashboardGridProvider', () => {
  beforeEach(() => {
    capturedRegistry = undefined;
    capturedCoordinator = undefined;
  });

  it('preserves mounted state and focus across provider-wide transfer', async () => {
    render(
      <DashboardGridProvider targetDocument={document}>
        <CaptureRegistry />
        <DashboardGrid
          aria-label="Source"
          gridId="source"
          defaultItems={[{ id: 'stateful', column: 0, row: 0 }]}
          renderItem={() => <StatefulContent />}
        />
        <DashboardGrid
          aria-label="Target"
          gridId="target"
          defaultItems={[]}
          renderItem={() => <StatefulContent />}
        />
      </DashboardGridProvider>,
    );

    const counter = await screen.findByRole('button', { name: 'Count 0' });
    fireEvent.click(counter);
    expect(counter).toHaveTextContent('Count 1');
    counter.focus();

    await act(async () => {
      await expect(
        capturedRegistry!.transfer({
          operation: 'drag',
          sourceGridId: 'source',
          targetGridId: 'target',
          itemId: 'stateful',
        }),
      ).resolves.toMatchObject({ status: 'accepted', targetGridId: 'target' });
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Count 1' })).toBe(counter);
    });
    expect(document.activeElement).toBe(counter);
    expect(capturedRegistry?.getItemOwner('stateful')).toBe('target');
  });

  it('dispatches provider-approved custom non-grid drops', async () => {
    const onCustomDrop = jest.fn();
    render(
      <DashboardGridProvider targetDocument={document} onCustomDrop={onCustomDrop}>
        <CaptureRegistry />
      </DashboardGridProvider>,
    );

    const result = await (
      Promise.resolve(
        capturedRegistry?.drop({
          operation: 'external',
          sourceId: 'source',
          targetZoneId: 'custom-zone',
        }),
      )
    );
    expect(result).toMatchObject({ status: 'accepted' });
    if (result?.status === 'accepted') {
      expect(result.finalize).toEqual(expect.any(Function));
      await result.finalize?.();
    }
    expect(onCustomDrop).toHaveBeenCalledWith(
      expect.any(Event),
      expect.objectContaining({
        type: 'custom-drop',
        sourceId: 'source',
        targetZoneId: 'custom-zone',
      }),
    );
  });

  it('moves focus to a surviving item after focused item removal', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid
          aria-label="Dashboard"
          imperativeRef={imperativeRef}
          defaultItems={[
            { id: 'first', label: 'First tile', column: 0, row: 0 },
            { id: 'second', label: 'Second tile', column: 1, row: 0 },
          ]}
          renderItem={item =>
            item.id === 'first' ? <button type="button">First action</button> : <span>Second</span>
          }
        />
      </DashboardGridProvider>,
    );
    const firstAction = await screen.findByRole('button', { name: 'First action' });
    firstAction.focus();

    act(() => {
      imperativeRef.current?.removeItem('first');
    });

    const secondItem = screen.getByText('Second').closest('[data-dashboard-grid-item]');
    await waitFor(() => expect(document.activeElement).toBe(secondItem));
  });

  it('preserves focus semantics for removal-zone provider commands', async () => {
    render(
      <DashboardGridProvider targetDocument={document}>
        <CaptureRegistry />
        <DashboardGrid
          aria-label="Dashboard"
          gridId="removal-grid"
          defaultItems={[
            { id: 'remove-me', label: 'Remove me', column: 0, row: 0 },
            { id: 'survivor', label: 'Survivor', column: 1, row: 0 },
          ]}
          renderItem={item =>
            item.id === 'remove-me' ? <button type="button">Focused action</button> : <span>Survivor content</span>
          }
        />
      </DashboardGridProvider>,
    );
    const focusedAction = await screen.findByRole('button', { name: 'Focused action' });
    focusedAction.focus();

    act(() => {
      capturedRegistry?.remove({
        operation: 'drag',
        sourceGridId: 'removal-grid',
        itemId: 'remove-me',
      });
    });

    const survivor = screen.getByText('Survivor content').closest('[data-dashboard-grid-item]');
    await waitFor(() => expect(document.activeElement).toBe(survivor));
  });

  it('renders a dynamically created nested grid and transfers the item into it', async () => {
    const targetRef = React.createRef<DashboardGridHandle>();
    render(
      <DashboardGridProvider targetDocument={document}>
        <CaptureRegistry />
        <DashboardGrid
          aria-label="Source"
          gridId="source-grid"
          defaultItems={[{ id: 'moving-tile', column: 0, row: 0, columnSpan: 3 }]}
          renderItem={item => <span>{`Source ${item.id}`}</span>}
        />
        <DashboardGrid
          aria-label="Target"
          gridId="target-grid"
          imperativeRef={targetRef}
          dynamicNesting
          subGridDefaults={{ columns: 'auto' }}
          defaultItems={[{ id: 'host-tile', column: 0, row: 0, columnSpan: 4 }]}
          renderItem={item => <span>{`Target ${item.id}`}</span>}
        />
      </DashboardGridProvider>,
    );

    act(() => {
      capturedRegistry?.requestNesting({
        sourceGridId: 'source-grid',
        targetGridId: 'target-grid',
        itemId: 'moving-tile',
        targetItemId: 'host-tile',
        coverage: 0.9,
      });
    });

    await waitFor(() =>
      expect(
        document.querySelector(
          '[data-dashboard-grid-root="target-grid::host-tile::subgrid"]',
        ),
      ).toBeInTheDocument(),
    );
    expect(capturedRegistry?.getItemOwner('moving-tile')).toBe(
      'target-grid::host-tile::subgrid',
    );
    expect(
      targetRef.current?.getItem('moving-tile', { recursive: true }),
    ).toMatchObject({ id: 'moving-tile' });
    expect(screen.getByText('Target moving-tile')).toBeVisible();
  });

  it('orders drag stop before source/target item callbacks and final drop', async () => {
    const order: string[] = [];
    const { container } = render(
      <DashboardGridProvider targetDocument={document}>
        <CaptureRegistry />
        <DashboardGrid
          aria-label="Source"
          gridId="order-source"
          defaultItems={[{ id: 'moving', column: 0, row: 0 }]}
          onItemsChange={() => order.push('source-items')}
          renderItem={item => <span>{item.id}</span>}
        />
        <DashboardGrid
          aria-label="Target"
          gridId="order-target"
          defaultItems={[]}
          onItemsChange={() => order.push('target-items')}
          onDragEnd={() => order.push('drag-end')}
          onItemDrop={() => order.push('item-drop')}
        />
      </DashboardGridProvider>,
    );
    await waitFor(() => expect(capturedCoordinator?.getItem('order-source', 'moving')).toBeDefined());
    const sourceRoot = container.querySelector(
      '[data-dashboard-grid-root="order-source"]',
    ) as HTMLElement;
    const targetRoot = container.querySelector(
      '[data-dashboard-grid-root="order-target"]',
    ) as HTMLElement;
    const moving = container.querySelector(
      '[data-dashboard-grid-item="moving"]',
    ) as HTMLElement;
    jest.spyOn(sourceRoot, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
    jest.spyOn(targetRoot, 'getBoundingClientRect').mockReturnValue(rect(200, 0, 200, 200));
    const metrics = {
      columnWidth: 100,
      rowHeight: 100,
      gapTop: 0,
      gapRight: 0,
      gapBottom: 0,
      gapLeft: 0,
    };
    capturedCoordinator?.registerGrid({
      id: 'order-source',
      element: sourceRoot,
      direction: 'ltr',
      store: capturedRegistry!.getGrid('order-source')!.store,
      getMetrics: () => metrics,
    });
    capturedCoordinator?.registerGrid({
      id: 'order-target',
      element: targetRoot,
      direction: 'ltr',
      store: capturedRegistry!.getGrid('order-target')!.store,
      getMetrics: () => metrics,
    });

    act(() => {
      capturedCoordinator?.beginPointer({
        operation: 'drag',
        pointer: {
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          button: 0,
        },
        timeStamp: 1,
        point: { clientX: 10, clientY: 10 },
        originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
        sourceGridId: 'order-source',
        itemId: 'moving',
        ownerElement: moving,
      });
      capturedCoordinator?.activatePointer({
        pixelRect: { x: 0, y: 0, width: 100, height: 100 },
      });
      capturedCoordinator?.updatePointer({
        point: { clientX: 250, clientY: 50 },
        pixelRect: { x: 250, y: 50, width: 100, height: 100 },
        clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
      });
    });
    await act(async () => {
      await capturedCoordinator?.commit();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });

    await waitFor(() =>
      expect(order).toEqual([
        'drag-end',
        'source-items',
        'target-items',
        'item-drop',
      ]),
    );
  });

  it.each([
    { mode: 'rejected' as const, targetItems: [{ id: 'blocker', column: 0, row: 0 }] },
    { mode: 'cancelled' as const, targetItems: [] },
  ])(
    'does not emit committed public callbacks for $mode cross-grid interactions',
    async ({ mode, targetItems }) => {
      const sourceItemsChange = jest.fn();
      const targetItemsChange = jest.fn();
      const dragEnd = jest.fn();
      const itemDrop = jest.fn();
      const sourceId = `${mode}-source`;
      const targetId = `${mode}-target`;
      const movingId = `${mode}-moving`;
      const { container } = render(
        <DashboardGridProvider targetDocument={document}>
          <CaptureRegistry />
          <DashboardGrid
            aria-label="Source"
            gridId={sourceId}
            columns={1}
            defaultItems={[{ id: movingId, column: 0, row: 0 }]}
            onItemsChange={sourceItemsChange}
            renderItem={item => <span>{item.id}</span>}
          />
          <DashboardGrid
            aria-label="Target"
            gridId={targetId}
            columns={1}
            maxRows={1}
            defaultItems={targetItems}
            onItemsChange={targetItemsChange}
            onDragEnd={dragEnd}
            onItemDrop={itemDrop}
            renderItem={item => <span>{item.id}</span>}
          />
        </DashboardGridProvider>,
      );
      await waitFor(() =>
        expect(capturedCoordinator?.getItem(sourceId, movingId)).toBeDefined(),
      );
      const sourceRoot = container.querySelector(
        `[data-dashboard-grid-root="${sourceId}"]`,
      ) as HTMLElement;
      const targetRoot = container.querySelector(
        `[data-dashboard-grid-root="${targetId}"]`,
      ) as HTMLElement;
      const moving = container.querySelector(
        `[data-dashboard-grid-item="${movingId}"]`,
      ) as HTMLElement;
      jest.spyOn(sourceRoot, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
      jest.spyOn(targetRoot, 'getBoundingClientRect').mockReturnValue(rect(200, 0, 100, 100));
      const metrics = {
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      };
      capturedCoordinator?.registerGrid({
        id: sourceId,
        element: sourceRoot,
        direction: 'ltr',
        store: capturedRegistry!.getGrid(sourceId)!.store,
        getMetrics: () => metrics,
      });
      capturedCoordinator?.registerGrid({
        id: targetId,
        element: targetRoot,
        direction: 'ltr',
        store: capturedRegistry!.getGrid(targetId)!.store,
        getMetrics: () => metrics,
      });

      act(() => {
        capturedCoordinator?.beginPointer({
          operation: 'drag',
          pointer: {
            pointerId: 1,
            pointerType: 'mouse',
            isPrimary: true,
            button: 0,
          },
          timeStamp: 1,
          point: { clientX: 10, clientY: 10 },
          originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
          sourceGridId: sourceId,
          itemId: movingId,
          ownerElement: moving,
        });
        capturedCoordinator?.activatePointer({
          pixelRect: { x: 0, y: 0, width: 100, height: 100 },
        });
        capturedCoordinator?.updatePointer({
          point: { clientX: 250, clientY: 50 },
          pixelRect: { x: 250, y: 50, width: 100, height: 100 },
          clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
        });
      });
      await act(async () => {
        if (mode === 'cancelled') {
          capturedCoordinator?.cancel();
        } else {
          await capturedCoordinator?.commit();
        }
        await Promise.resolve();
        await Promise.resolve();
      });

      expect(sourceItemsChange).not.toHaveBeenCalled();
      expect(targetItemsChange).not.toHaveBeenCalled();
      expect(dragEnd).not.toHaveBeenCalled();
      expect(itemDrop).not.toHaveBeenCalled();
      expect(capturedRegistry?.getGrid(sourceId)?.store.getItem(movingId)).toBeDefined();
    },
  );

  it('registers selector-backed removal options with the provider coordinator', async () => {
    const { container } = render(
      <DashboardGridProvider targetDocument={document}>
        <CaptureRegistry />
        <div data-testid="trash">Trash</div>
        <DashboardGrid
          aria-label="Removable dashboard"
          gridId="removable-grid"
          removable='[data-testid="trash"]'
          defaultItems={[{ id: 'removable-item', column: 0, row: 0 }]}
          renderItem={item => <span>{item.id}</span>}
        />
      </DashboardGridProvider>,
    );
    await waitFor(() =>
      expect(
        capturedCoordinator?.getItem('removable-grid', 'removable-item'),
      ).toBeDefined(),
    );
    const root = container.querySelector(
      '[data-dashboard-grid-root="removable-grid"]',
    ) as HTMLElement;
    const item = container.querySelector(
      '[data-dashboard-grid-item="removable-item"]',
    ) as HTMLElement;
    const trash = screen.getByTestId('trash');
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
    jest.spyOn(trash, 'getBoundingClientRect').mockReturnValue(rect(200, 0, 100, 100));
    const store = capturedRegistry!.getGrid('removable-grid')!.store;
    expect(store.getDefinition('removable-item')?.content).toBeUndefined();
    capturedCoordinator?.registerGrid({
      id: 'removable-grid',
      element: root,
      direction: 'ltr',
      store,
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });

    act(() => {
      capturedCoordinator?.beginPointer({
        operation: 'drag',
        pointer: {
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          button: 0,
        },
        timeStamp: 1,
        point: { clientX: 10, clientY: 10 },
        originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
        sourceGridId: 'removable-grid',
        itemId: 'removable-item',
        ownerElement: item,
      });
      capturedCoordinator?.activatePointer({
        pixelRect: { x: 0, y: 0, width: 100, height: 100 },
      });
      capturedCoordinator?.updatePointer({
        point: { clientX: 250, clientY: 50 },
        pixelRect: { x: 250, y: 50, width: 100, height: 100 },
        clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
      });
    });
    let removalResult: Awaited<ReturnType<DashboardGridInteractionCoordinator['commit']>>;
    await act(async () => {
      removalResult = await capturedCoordinator?.commit();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(removalResult).toMatchObject({
      status: 'accepted',
      targetGridId: undefined,
    });
    expect(store.getItem('removable-item')).toBeUndefined();
  });

  it('projects public external acceptance into grid registration', async () => {
    render(
      <DashboardGridProvider targetDocument={document}>
        <CaptureRegistry />
        <DashboardGrid
          aria-label="Target"
          gridId="external-target"
          acceptExternal={item => item.data === 'accepted'}
        />
      </DashboardGridProvider>,
    );

    await waitFor(() =>
      expect(capturedCoordinator?.getGrid('external-target')).toBeDefined(),
    );
    const acceptsExternal =
      capturedCoordinator?.getGrid('external-target')?.acceptsExternal;
    expect(
      acceptsExternal?.({
        operation: 'external',
        targetGridId: 'external-target',
        sourceId: 'source',
        descriptor: { id: 'accepted', data: 'accepted' },
      }),
    ).toBe(true);
    expect(
      acceptsExternal?.({
        operation: 'external',
        targetGridId: 'external-target',
        sourceId: 'source',
        descriptor: { id: 'rejected', data: 'rejected' },
      }),
    ).toBe(false);
  });

  it('finds selector-backed removal zones in the grid ShadowRoot', async () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    document.body.appendChild(host);
    const Portal = (props: { children: React.ReactNode }) =>
      createPortal(props.children, shadowRoot);
    const { unmount } = render(
      <Portal>
        <DashboardGridProvider targetDocument={document}>
          <CaptureRegistry />
          <div data-shadow-trash="">Trash</div>
          <DashboardGrid
            aria-label="Shadow dashboard"
            gridId="shadow-removable"
            removable="[data-shadow-trash]"
            defaultItems={[{ id: 'shadow-item', column: 0, row: 0 }]}
            renderItem={item => <span>{item.id}</span>}
          />
        </DashboardGridProvider>
      </Portal>,
    );
    await waitFor(() =>
      expect(
        capturedCoordinator?.getItem('shadow-removable', 'shadow-item'),
      ).toBeDefined(),
    );
    const root = shadowRoot.querySelector(
      '[data-dashboard-grid-root="shadow-removable"]',
    ) as HTMLElement;
    const item = shadowRoot.querySelector(
      '[data-dashboard-grid-item="shadow-item"]',
    ) as HTMLElement;
    const trash = shadowRoot.querySelector('[data-shadow-trash]') as HTMLElement;
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
    jest.spyOn(trash, 'getBoundingClientRect').mockReturnValue(rect(200, 0, 100, 100));
    const store = capturedRegistry!.getGrid('shadow-removable')!.store;
    capturedCoordinator?.registerGrid({
      id: 'shadow-removable',
      element: root,
      direction: 'ltr',
      store,
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });

    act(() => {
      capturedCoordinator?.beginPointer({
        operation: 'drag',
        pointer: {
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          button: 0,
        },
        timeStamp: 1,
        point: { clientX: 10, clientY: 10 },
        originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
        sourceGridId: 'shadow-removable',
        itemId: 'shadow-item',
        ownerElement: item,
      });
      capturedCoordinator?.activatePointer({
        pixelRect: { x: 0, y: 0, width: 100, height: 100 },
      });
      capturedCoordinator?.updatePointer({
        point: { clientX: 250, clientY: 50 },
        pixelRect: { x: 250, y: 50, width: 100, height: 100 },
        clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
      });
    });
    let shadowRemovalResult: Awaited<
      ReturnType<DashboardGridInteractionCoordinator['commit']>
    >;
    await act(async () => {
      shadowRemovalResult = await capturedCoordinator?.commit();
      await Promise.resolve();
    });

    expect(shadowRemovalResult).toMatchObject({
      status: 'accepted',
      targetGridId: undefined,
    });
    expect(store.getItem('shadow-item')).toBeUndefined();
    unmount();
    host.remove();
  });
});
