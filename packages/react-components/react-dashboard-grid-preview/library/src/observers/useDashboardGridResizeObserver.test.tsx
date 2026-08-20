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
      public observe() {}
      public unobserve() {}
      public disconnect() {}
    }
    window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

    const Harness = () => {
      const [parentStore] = React.useState(() =>
        createDashboardGridStore({ id: 'parent', columns: 12 }),
      );
      const [childStore] = React.useState(() =>
        createDashboardGridStore({ id: 'child', columns: 4 }),
      );
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
});
