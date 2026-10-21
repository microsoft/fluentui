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
  onPhase?: (phase: string) => void;
};

const OpenStateThenPresence = ({ open, unmountOnClose, onPhase }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popover } = useLayerOpenState(ref, { open, mode: 'auto' });
  const { shouldRender, phase } = useLayerPresence(ref, { open, unmountOnClose });
  onPhase?.(phase);
  return shouldRender ? <div ref={ref} popover={popover} data-testid="layer" /> : null;
};

const PresenceThenOpenState = ({ open, unmountOnClose, onPhase }: LayerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { shouldRender, phase } = useLayerPresence(ref, { open, unmountOnClose });
  const { popover } = useLayerOpenState(ref, { open, mode: 'auto' });
  onPhase?.(phase);
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
    const onPhase = jest.fn();
    const { getByTestId, rerender } = render(<Layer open unmountOnClose={false} onPhase={onPhase} />);
    rerender(<Layer open={false} unmountOnClose={false} onPhase={onPhase} />);

    await waitFor(() => expect(onPhase).toHaveBeenLastCalledWith('closed'));
    expect(getByTestId('layer')).toBeInTheDocument();
  });

  it('stays exiting and inert until exit animations end', async () => {
    const onPhase = jest.fn();
    const { getByTestId, queryByTestId, rerender } = render(<Layer open onPhase={onPhase} />);
    const layer = getByTestId('layer');
    const finish = mockAnimation(layer);

    rerender(<Layer open={false} onPhase={onPhase} />);
    await waitFor(() => expect(layer.getAttribute('inert')).toBe(''));
    expect(onPhase).toHaveBeenLastCalledWith('exiting');
    expect(layer.getAttribute('aria-hidden')).toBe('true');

    await finish();
    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
    expect(layer.hasAttribute('inert')).toBe(false);
  });

  it('is entering while enter animations run', async () => {
    const onPhase = jest.fn();
    let finishEnter: () => Promise<void> | void = () => undefined;
    const Animated = () => {
      const ref = React.useRef<HTMLDivElement | null>(null);
      const setRef = React.useCallback((element: HTMLDivElement | null) => {
        ref.current = element;
        if (element) {
          finishEnter = mockAnimation(element);
        }
      }, []);
      const { popover } = useLayerOpenState(ref, { open: true, mode: 'auto' });
      const { phase } = useLayerPresence(ref, { open: true });
      onPhase(phase);
      return <div ref={setRef} popover={popover} />;
    };

    render(<Animated />);
    await waitFor(() => expect(onPhase).toHaveBeenLastCalledWith('entering'));

    await finishEnter();
    await waitFor(() => expect(onPhase).toHaveBeenLastCalledWith('open'));
  });
});

describe('useLayerPresence', () => {
  type TestLayerProps = {
    open?: boolean;
    mode?: TopLayerMode;
    unmountOnClose?: boolean;
    ariaHidden?: 'true' | 'false';
    onPhase?: (phase: string) => void;
  };

  const TestLayer = ({ open = false, mode = 'auto', unmountOnClose, ariaHidden, onPhase }: TestLayerProps) => {
    const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
    const { popover } = useDialogLayerOpenState(ref, { open, mode });
    const { shouldRender, phase } = useLayerPresence(ref, { open, unmountOnClose });
    onPhase?.(phase);

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

  it('goes straight to the open phase when nothing animates', () => {
    const phases: string[] = [];
    render(<TestLayer open onPhase={phase => phases.push(phase)} />);

    expect(phases).toEqual(['open']);
  });

  it('keeps the element mounted with unmountOnClose: false, without inert once the exit ends', async () => {
    const phases: string[] = [];
    const onPhase = (phase: string) => phases.push(phase);
    const { getByTestId, rerender } = render(<TestLayer open unmountOnClose={false} onPhase={onPhase} />);
    rerender(<TestLayer open={false} unmountOnClose={false} onPhase={onPhase} />);
    const layer = getByTestId('layer');

    expect(isPopoverOpen(layer)).toBe(false);
    await waitFor(() => {
      expect(phases[phases.length - 1]).toBe('closed');
      expect(layer).not.toHaveAttribute('inert');
      expect(layer).not.toHaveAttribute('aria-hidden');
    });

    rerender(<TestLayer open unmountOnClose={false} />);
    expect(layer).not.toHaveAttribute('inert');
    expect(layer).not.toHaveAttribute('aria-hidden');
  });

  it('unmounts a non-modal <dialog> shown without the Popover API once it closes', async () => {
    const Example = ({ open }: { open: boolean }) => {
      const ref = React.useRef<HTMLDialogElement | null>(null);
      useDialogLayerOpenState(ref, { open, mode: 'manual' });
      const { shouldRender } = useLayerPresence(ref, { open });
      const setRef = React.useCallback((element: HTMLDialogElement | null) => {
        if (element) {
          Object.defineProperty(element, 'showPopover', { value: undefined });
          Object.defineProperty(element, 'hidePopover', { value: undefined });
        }
        ref.current = element;
      }, []);
      return shouldRender ? <dialog ref={setRef} data-testid="layer" /> : null;
    };
    const { container, getByTestId, rerender } = render(<Example open />);
    expect((getByTestId('layer') as HTMLDialogElement).open).toBe(true);

    rerender(<Example open={false} />);

    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it('finishes the exit when the element is replaced before it ends', async () => {
    const phases: string[] = [];
    const KeyedLayer = ({ open, version }: { open: boolean; version: number }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      const { popover } = useLayerOpenState(ref, { open, mode: 'auto' });
      const { shouldRender, phase } = useLayerPresence(ref, { open });
      phases.push(phase);
      return shouldRender ? <div key={version} ref={ref} popover={popover} data-testid="layer" /> : null;
    };
    const { queryByTestId, rerender } = render(<KeyedLayer open version={0} />);
    mockAnimation(queryByTestId('layer')!);

    rerender(<KeyedLayer open={false} version={0} />);
    rerender(<KeyedLayer open={false} version={1} />);

    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
    expect(phases[phases.length - 1]).toBe('closed');
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
    const phases: string[] = [];
    const onPhase = (phase: string) => phases.push(phase);
    const { getByTestId, rerender } = render(<TestLayer open mode="manual" unmountOnClose={false} onPhase={onPhase} />);
    const layer = getByTestId('layer');
    layer.setAttribute('aria-hidden', 'true');
    const finish = mockAnimation(layer);

    rerender(<TestLayer open={false} mode="manual" unmountOnClose={false} onPhase={onPhase} />);
    await waitFor(() => expect(layer).toHaveAttribute('inert'));
    await finish();

    await waitFor(() => {
      expect(phases[phases.length - 1]).toBe('closed');
      expect(layer).not.toHaveAttribute('inert');
    });
    expect(layer).toHaveAttribute('aria-hidden', 'true');
  });

  it('restores the consumer aria-hidden="false" after the exit, so a reopened layer is not hidden', async () => {
    const phases: string[] = [];
    const onPhase = (phase: string) => phases.push(phase);
    const props = { mode: 'manual' as const, unmountOnClose: false, ariaHidden: 'false' as const, onPhase };
    const { getByTestId, rerender } = render(<TestLayer open {...props} />);
    const layer = getByTestId('layer');
    const finish = mockAnimation(layer);

    rerender(<TestLayer open={false} {...props} />);
    await waitFor(() => expect(layer).toHaveAttribute('aria-hidden', 'true'));
    await finish();
    await waitFor(() => {
      expect(phases[phases.length - 1]).toBe('closed');
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
