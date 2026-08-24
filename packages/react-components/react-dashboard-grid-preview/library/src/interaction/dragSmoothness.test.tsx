import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider_unstable as FluentProvider } from '@fluentui/react-shared-contexts';
import { DashboardGrid } from '../components/DashboardGrid/DashboardGrid';
import { useRequiredDashboardGridContext_unstable } from '../contexts/DashboardGridContext';
import type { DashboardGridStore } from '../state/DashboardGridStore.types';
import { createDashboardGridInteractionCoordinator } from './coordinator';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

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

const StoreCapture = (props: {
  label: string;
  onStore: (store: DashboardGridStore) => void;
}) => {
  const store = useRequiredDashboardGridContext_unstable(context => context.store);
  const { label, onStore } = props;

  useIsomorphicLayoutEffect(() => {
    onStore(store);
  }, [onStore, store]);

  return <span>{label}</span>;
};

describe('dashboard grid deferred drag rendering', () => {
  it.each([
    { direction: 'ltr' as const, originX: 0, firstX: 20, secondX: 45 },
    { direction: 'rtl' as const, originX: 100, firstX: 80, secondX: 55 },
  ])(
    'keeps grid geometry at origin while the active item follows every $direction pixel update',
    async ({ direction, originX, firstX, secondX }) => {
      let store: DashboardGridStore | undefined;
      const { container } = render(
        <FluentProvider value={{ dir: direction, targetDocument: document }}>
          <DashboardGrid
            aria-label="Dashboard"
            gridId="smooth-grid"
            defaultItems={[{ id: 'active', column: 0, row: 0 }]}
            renderItem={item => (
              <StoreCapture
                label={item.id}
                onStore={nextStore => {
                  store = nextStore;
                }}
              />
            )}
          />
        </FluentProvider>,
      );
      await waitFor(() => expect(store).toBeDefined());
      const capturedStore = store!;
      const root = container.querySelector('[data-dashboard-grid-root]') as HTMLElement;
      const surface = container.querySelector('.fui-DashboardGrid__surface') as HTMLElement;
      const itemElement = screen.getByText('active').closest('[data-dashboard-grid-item]') as HTMLElement;
      jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 400, 400));
      const move = jest
        .spyOn(capturedStore, 'move')
        .mockReturnValue({ status: 'deferred', reason: 'coverage-threshold' });
      const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
      coordinator.registerGrid({
        id: 'smooth-grid',
        element: root,
        surfaceElement: surface,
        direction,
        store: capturedStore,
        getMetrics: () => ({
          columnWidth: 100,
          rowHeight: 100,
          gapTop: 0,
          gapRight: 0,
          gapBottom: 0,
          gapLeft: 0,
        }),
      });
      coordinator.registerItem({
        id: 'active',
        gridId: 'smooth-grid',
        element: itemElement,
        movable: true,
        resizable: true,
        locked: false,
      });

      act(() => {
        coordinator.beginPointer({
          operation: 'drag',
          pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
          timeStamp: 1,
          point: { clientX: 10, clientY: 10 },
          originPixelRect: { x: originX, y: 0, width: 100, height: 100 },
          sourceGridId: 'smooth-grid',
          itemId: 'active',
          ownerElement: itemElement,
        });
        coordinator.activatePointer({
          pixelRect: { x: originX, y: 0, width: 100, height: 100 },
        });
      });

      act(() => {
        coordinator.updatePointer({
          point: { clientX: 30, clientY: 10 },
          pixelRect: { x: firstX, y: 8, width: 100, height: 100 },
          proposal: { input: 'pointer', column: 0, row: 0 },
        });
      });
      expect(capturedStore.getItem('active')?.column).toBe(0);
      expect(itemElement.style.getPropertyValue('--dashboard-grid-column')).toBe('0');
      expect(itemElement.style.transform).toContain('translate3d(20px, 8px, 0)');

      act(() => {
        coordinator.updatePointer({
          point: { clientX: 55, clientY: 10 },
          pixelRect: { x: secondX, y: 16, width: 100, height: 100 },
          proposal: { input: 'pointer', column: 0, row: 0 },
        });
      });
      expect(capturedStore.getItem('active')?.column).toBe(0);
      expect(itemElement.style.getPropertyValue('--dashboard-grid-column')).toBe('0');
      expect(itemElement.style.transform).toContain('translate3d(45px, 16px, 0)');
      expect(move).toHaveBeenCalledTimes(2);

      act(() => coordinator.cancel());
      coordinator.destroy();
    },
  );
});
