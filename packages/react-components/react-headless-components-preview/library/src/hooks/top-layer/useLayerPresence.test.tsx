import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useLayerPresence } from './useLayerPresence';
import { useLayerOpenState } from './useLayerOpenState';
import { useDialogLayerOpenState } from './useDialogLayerOpenState';
import { isPopoverOpen } from './utils';
import type { TopLayerMode } from './types';

type LayerProps = {
  open: boolean;
  unmountOnClose?: boolean;
};

const OpenStateThenPresence = ({ open, unmountOnClose }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useLayerOpenState(ref, { open, mode: 'auto' });
  const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });
  return shouldRender ? <div ref={ref} popover="auto" data-testid="layer" /> : null;
};

const PresenceThenOpenState = ({ open, unmountOnClose }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });
  useLayerOpenState(ref, { open, mode: 'auto' });
  return shouldRender ? <div ref={ref} popover="auto" data-testid="layer" /> : null;
};

const mockAnimation = (element: HTMLElement) => {
  let finish: () => void = () => undefined;
  const finished = new Promise<void>(resolve => {
    finish = resolve;
  });
  const animation = {
    effect: { target: element, getComputedTiming: () => ({ endTime: 100 }) },
    playState: 'running',
    finished,
  } as unknown as Animation;
  element.getAnimations = () => [animation];
  return () => act(() => finish());
};

// Lets the queued close event fire, and the presence microtask run after it.
const flushTasks = () =>
  new Promise<void>(resolve => {
    setTimeout(resolve);
  });

describe.each([
  ['open state first', OpenStateThenPresence],
  ['presence first', PresenceThenOpenState],
])('useLayerPresence (%s)', (_, Layer) => {
  it('renders while open and unmounts after the exit', async () => {
    const { queryByTestId, rerender } = render(<Layer open />);
    expect(isPopoverOpen(queryByTestId('layer')!)).toBe(true);

    rerender(<Layer open={false} />);
    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
  });

  it('stays mounted until the queued close event fires, so its own handlers still run', async () => {
    const { getByTestId, queryByTestId, rerender } = render(<Layer open />);
    const layer = getByTestId('layer');
    await act(() => Promise.resolve());
    let connectedOnClose: boolean | undefined;
    layer.addEventListener('toggle', event => {
      if ((event as Event & { newState?: string }).newState === 'closed') {
        connectedOnClose = layer.isConnected;
      }
    });

    rerender(<Layer open={false} />);
    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
    expect(connectedOnClose).toBe(true);
  });

  it('stays mounted until exit animations end', async () => {
    const { getByTestId, queryByTestId, rerender } = render(<Layer open />);
    const layer = getByTestId('layer');
    const finish = mockAnimation(layer);

    rerender(<Layer open={false} />);
    await waitFor(() => expect(isPopoverOpen(layer)).toBe(false));
    await act(flushTasks);
    expect(layer).toBeInTheDocument();

    await finish();
    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
  });

  it('stays mounted when it reopens during the exit', async () => {
    const { getByTestId, rerender } = render(<Layer open />);
    const layer = getByTestId('layer');
    const finish = mockAnimation(layer);

    rerender(<Layer open={false} />);
    await act(flushTasks);
    rerender(<Layer open />);
    await finish();

    expect(getByTestId('layer')).toBe(layer);
    expect(isPopoverOpen(layer)).toBe(true);
  });
});

describe('useLayerPresence', () => {
  type TestLayerProps = {
    open?: boolean;
    mode?: TopLayerMode;
    unmountOnClose?: boolean;
  };

  const TestLayer = ({ open = false, mode = 'auto', unmountOnClose }: TestLayerProps) => {
    const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
    useDialogLayerOpenState(ref, { open, mode });
    const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });

    if (!shouldRender) {
      return null;
    }

    const Element = mode === 'modal' ? 'dialog' : 'div';
    return <Element ref={ref} popover={mode === 'modal' ? undefined : mode} data-testid="layer" />;
  };

  it('keeps the element mounted with unmountOnClose: false and reopens it', async () => {
    const { getByTestId, rerender } = render(<TestLayer open unmountOnClose={false} />);
    rerender(<TestLayer open={false} unmountOnClose={false} />);
    const layer = getByTestId('layer');

    expect(isPopoverOpen(layer)).toBe(false);
    await act(flushTasks);
    expect(layer).toBeInTheDocument();

    rerender(<TestLayer open unmountOnClose={false} />);
    expect(isPopoverOpen(layer)).toBe(true);
  });

  it('finishes the exit when the element is replaced before it ends', async () => {
    const KeyedLayer = ({ open, version }: { open: boolean; version: number }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      useLayerOpenState(ref, { open, mode: 'auto' });
      const { shouldRender } = useLayerPresence(ref, { open });
      return shouldRender ? <div key={version} ref={ref} popover="auto" data-testid="layer" /> : null;
    };
    const { queryByTestId, rerender } = render(<KeyedLayer open version={0} />);
    mockAnimation(queryByTestId('layer')!);

    rerender(<KeyedLayer open={false} version={0} />);
    rerender(<KeyedLayer open={false} version={1} />);

    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
  });

  it('finishes the exit when the mode changes before the close event arrives', async () => {
    const Example = () => {
      const [open, setOpen] = React.useState(true);
      const [mode, setMode] = React.useState<'manual' | 'modal'>('manual');
      useIsomorphicLayoutEffect(() => {
        if (!open) {
          setMode('modal');
        }
      }, [open]);
      const ref = React.useRef<HTMLDialogElement>(null);
      useDialogLayerOpenState(ref, { open, mode });
      const { shouldRender } = useLayerPresence(ref, { open });
      return (
        <>
          <button onClick={() => setOpen(false)}>Close</button>
          {shouldRender && <dialog ref={ref} popover={mode === 'modal' ? undefined : mode} data-testid="layer" />}
        </>
      );
    };
    const { getByText, queryByTestId } = render(<Example />);
    expect(isPopoverOpen(queryByTestId('layer')!)).toBe(true);

    fireEvent.click(getByText('Close'));

    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
  });
});
