import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRequiredDashboardGridProviderContext_unstable } from '../../contexts';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';
import { DashboardGridProvider } from './DashboardGridProvider';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';

let capturedRegistry: DashboardGridRegistry | undefined;

const CaptureRegistry = () => {
  capturedRegistry = useRequiredDashboardGridProviderContext_unstable(context => context.registry);
  return null;
};

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
      expect(
        capturedRegistry?.transfer({
          operation: 'drag',
          sourceGridId: 'source',
          targetGridId: 'target',
          itemId: 'stateful',
        }),
      ).toMatchObject({ status: 'accepted', targetGridId: 'target' });
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

    await expect(
      Promise.resolve(
        capturedRegistry?.drop({
          operation: 'external',
          sourceId: 'source',
          targetZoneId: 'custom-zone',
        }),
      ),
    ).resolves.toMatchObject({ status: 'accepted' });
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
});
