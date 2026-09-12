import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { createDashboardGridStore } from '../state/createDashboardGridStore';
import { useDashboardGridResizeObserver } from './useDashboardGridResizeObserver';

describe('useDashboardGridResizeObserver', () => {
  it('creates one ResizeObserver for a top-level grid and drives nested grids through it', async () => {
    const original = window.ResizeObserver;
    const constructors = jest.fn();
    class MockResizeObserver {
      public constructor(_callback: ResizeObserverCallback) {
        constructors();
      }
      public observe() {
        return undefined;
      }
      public unobserve() {
        return undefined;
      }
      public disconnect() {
        return undefined;
      }
    }
    window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

    const Harness = () => {
      const [parentStore] = React.useState(() => createDashboardGridStore({ id: 'parent', columns: 12 }));
      const [childStore] = React.useState(() => createDashboardGridStore({ id: 'child', columns: 4 }));
      const parent = useDashboardGridResizeObserver({
        targetDocument: document,
        store: parentStore,
        rowHeight: 50,
      });
      useDashboardGridResizeObserver({
        targetDocument: document,
        store: childStore,
        rowHeight: 50,
        nested: true,
        parentController: parent,
      });

      React.useEffect(
        () => () => {
          parentStore.dispose();
          childStore.dispose();
        },
        [childStore, parentStore],
      );
      return <div ref={parent.rootRef} />;
    };

    render(<Harness />);
    await waitFor(() => expect(constructors).toHaveBeenCalledTimes(1));
    window.ResizeObserver = original;
  });

  it('measures transformed grids in their local coordinate space', async () => {
    const original = window.ResizeObserver;
    window.ResizeObserver = undefined as unknown as typeof ResizeObserver;
    const onMetricsChange = jest.fn();

    const Harness = () => {
      const [store] = React.useState(() => createDashboardGridStore({ id: 'grid', columns: 4 }));
      const controller = useDashboardGridResizeObserver({
        targetDocument: document,
        store,
        rowHeight: 50,
        onMetricsChange,
      });
      const setRootRef = React.useCallback(
        (element: HTMLDivElement | null) => {
          if (element) {
            Object.defineProperty(element, 'offsetWidth', { configurable: true, value: 400 });
            jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
              x: 0,
              y: 0,
              top: 0,
              right: 200,
              bottom: 100,
              left: 0,
              width: 200,
              height: 100,
              toJSON: () => ({}),
            });
          }
          controller.rootRef(element);
        },
        [controller],
      );

      React.useEffect(() => () => store.dispose(), [store]);
      return <div ref={setRootRef} />;
    };

    render(<Harness />);
    await waitFor(() => expect(onMetricsChange).toHaveBeenCalledWith(expect.objectContaining({ columnWidth: 100 })));
    window.ResizeObserver = original;
  });
});
