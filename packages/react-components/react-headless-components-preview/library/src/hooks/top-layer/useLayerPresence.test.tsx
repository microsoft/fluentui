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
  presenceFirst?: boolean;
};

const OpenStateThenPresence = ({ open, unmountOnClose }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popover } = useLayerOpenState(ref, { open, mode: 'auto' });
  const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });
  return shouldRender ? <div ref={ref} popover={popover} data-testid="layer" /> : null;
};

const PresenceThenOpenState = ({ open, unmountOnClose }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });
  const { popover } = useLayerOpenState(ref, { open, mode: 'auto' });
  return shouldRender ? <div ref={ref} popover={popover} data-testid="layer" /> : null;
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

  it('keeps the element mounted with unmountOnClose: false', async () => {
    const { getByTestId, rerender } = render(<Layer open unmountOnClose={false} />);
    const layer = getByTestId('layer');
    rerender(<Layer open={false} unmountOnClose={false} />);

    await waitFor(() => expect(isPopoverOpen(layer)).toBe(false));
    await act(() => Promise.resolve());
    expect(layer).toBeInTheDocument();
    expect(layer).not.toHaveAttribute('inert');
  });

  // React 17 has no insertion effects, so there presence has to be declared before the open-state hook.
  const itWithInsertionEffect = 'useInsertionEffect' in React || Layer === PresenceThenOpenState ? it : it.skip;

  itWithInsertionEffect('is no longer inert when a reopen during the exit shows the element', async () => {
    const { getByTestId, rerender } = render(<Layer open />);
    const layer = getByTestId('layer');
    mockAnimation(layer);
    rerender(<Layer open={false} />);
    await waitFor(() => expect(layer).toHaveAttribute('inert'));

    let inertWhenShown: boolean | undefined;
    const showPopover = layer.showPopover.bind(layer);
    Object.defineProperty(layer, 'showPopover', {
      configurable: true,
      value: () => {
        inertWhenShown = layer.hasAttribute('inert');
        showPopover();
      },
    });
    rerender(<Layer open />);

    expect(inertWhenShown).toBe(false);
    expect(isPopoverOpen(layer)).toBe(true);
  });

  it('stays mounted and inert until exit animations end', async () => {
    const { getByTestId, queryByTestId, rerender } = render(<Layer open />);
    const layer = getByTestId('layer');
    const finish = mockAnimation(layer);

    rerender(<Layer open={false} />);
    await waitFor(() => expect(layer.getAttribute('inert')).toBe(''));
    expect(layer.getAttribute('aria-hidden')).toBe('true');

    await finish();
    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
    expect(layer.hasAttribute('inert')).toBe(false);
  });
});

describe('useLayerPresence', () => {
  type TestLayerProps = {
    open?: boolean;
    mode?: TopLayerMode;
    unmountOnClose?: boolean;
    ariaHidden?: 'true' | 'false';
  };

  const TestLayer = ({ open = false, mode = 'auto', unmountOnClose, ariaHidden }: TestLayerProps) => {
    const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
    const { popover } = useDialogLayerOpenState(ref, { open, mode });
    const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });

    if (!shouldRender) {
      return null;
    }

    const Element = mode === 'modal' ? 'dialog' : 'div';
    return <Element ref={ref} popover={popover} data-testid="layer" aria-hidden={ariaHidden} />;
  };

  it('renders nothing when closed', () => {
    const { container } = render(<TestLayer />);
    expect(container).toBeEmptyDOMElement();
  });

  it('keeps the element mounted with unmountOnClose: false, without inert once the exit ends', async () => {
    const { getByTestId, rerender } = render(<TestLayer open unmountOnClose={false} />);
    rerender(<TestLayer open={false} unmountOnClose={false} />);
    const layer = getByTestId('layer');

    expect(isPopoverOpen(layer)).toBe(false);
    await waitFor(() => {
      expect(layer).not.toHaveAttribute('inert');
      expect(layer).not.toHaveAttribute('aria-hidden');
    });

    rerender(<TestLayer open unmountOnClose={false} />);
    expect(layer).not.toHaveAttribute('inert');
    expect(layer).not.toHaveAttribute('aria-hidden');
  });

  it('finishes the exit when the element is replaced before it ends', async () => {
    const KeyedLayer = ({ open, version }: { open: boolean; version: number }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      const { popover } = useLayerOpenState(ref, { open, mode: 'auto' });
      const { shouldRender } = useLayerPresence(ref, { open });
      return shouldRender ? <div key={version} ref={ref} popover={popover} data-testid="layer" /> : null;
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
      const { popover } = useDialogLayerOpenState(ref, { open, mode });
      const { shouldRender } = useLayerPresence(ref, { open });
      return (
        <>
          <button onClick={() => setOpen(false)}>Close</button>
          {shouldRender && <dialog ref={ref} popover={popover} data-testid="layer" />}
        </>
      );
    };
    const { getByText, queryByTestId } = render(<Example />);
    expect(isPopoverOpen(queryByTestId('layer')!)).toBe(true);

    fireEvent.click(getByText('Close'));

    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
  });

  it("keeps the consumer's own aria-hidden after the exit", async () => {
    const { getByTestId, rerender } = render(<TestLayer open mode="manual" unmountOnClose={false} />);
    const layer = getByTestId('layer');
    layer.setAttribute('aria-hidden', 'true');
    const finish = mockAnimation(layer);

    rerender(<TestLayer open={false} mode="manual" unmountOnClose={false} />);
    await waitFor(() => expect(layer).toHaveAttribute('inert'));
    await finish();

    await waitFor(() => {
      expect(layer).not.toHaveAttribute('inert');
    });
    expect(layer).toHaveAttribute('aria-hidden', 'true');
  });

  it('restores the consumer aria-hidden="false" after the exit, so a reopened layer is not hidden', async () => {
    const props = { mode: 'manual' as const, unmountOnClose: false, ariaHidden: 'false' as const };
    const { getByTestId, rerender } = render(<TestLayer open {...props} />);
    const layer = getByTestId('layer');
    const finish = mockAnimation(layer);

    rerender(<TestLayer open={false} {...props} />);
    await waitFor(() => expect(layer).toHaveAttribute('aria-hidden', 'true'));
    await finish();
    await waitFor(() => {
      expect(layer).toHaveAttribute('aria-hidden', 'false');
    });

    rerender(<TestLayer open {...props} />);
    expect(layer).toHaveAttribute('aria-hidden', 'false');
    expect(layer).not.toHaveAttribute('inert');
  });

  it('keeps aria-hidden that React changed while the exit ran', async () => {
    const Example = ({ open }: { open: boolean }) => (
      <TestLayer open={open} mode="modal" unmountOnClose={false} ariaHidden={open ? 'false' : 'true'} />
    );
    const { getByTestId, rerender } = render(<Example open />);
    const layer = getByTestId('layer') as HTMLDialogElement;
    mockAnimation(layer);

    rerender(<Example open={false} />);
    await waitFor(() => expect(layer).toHaveAttribute('inert'));

    rerender(<Example open />);

    expect(layer).toHaveAttribute('aria-hidden', 'false');
    expect(layer).not.toHaveAttribute('inert');
  });
});
