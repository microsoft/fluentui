import * as React from 'react';
import { createPortal } from 'react-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useTopLayer } from './useTopLayer';
import type { TopLayerOpenChangeData } from './TopLayer.types';
import type { UseTopLayerOptions } from './useTopLayer.types';
import { isPopoverOpen } from '../../utils/topLayer';

type TestLayerProps = Partial<Omit<UseTopLayerOptions, 'onOpenChange'>> & {
  children?: React.ReactNode;
  onPhase?: (phase: string) => void;
  onClose?: (data: TopLayerOpenChangeData) => void;
  onOpen?: (event: TopLayerOpenChangeData['event']) => void;
  ariaHidden?: 'true' | 'false';
};

const TestLayer = ({
  open = false,
  mode = 'auto',
  children,
  onPhase,
  onClose,
  onOpen,
  ariaHidden,
  ...options
}: TestLayerProps) => {
  const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
  const onOpenChange =
    onClose || onOpen
      ? (nextOpen: boolean, data: TopLayerOpenChangeData) => (nextOpen ? onOpen?.(data.event) : onClose?.(data))
      : undefined;
  const { shouldRender, popover, phase, onKeyDown } = useTopLayer(ref, { open, mode, onOpenChange, ...options });
  onPhase?.(phase);

  if (!shouldRender) {
    return null;
  }

  const Element = mode === 'modal' ? 'dialog' : 'div';
  return (
    <Element
      ref={ref}
      popover={popover}
      data-testid="layer"
      data-open={open ? '' : undefined}
      aria-hidden={ariaHidden}
      onKeyDown={onKeyDown}
    >
      {children}
    </Element>
  );
};

const flush = () =>
  act(
    () =>
      new Promise<void>(resolve => {
        setTimeout(resolve, 0);
      }),
  );

/**
 * Escape through the document capture phase, stopped before the popover polyfill's document listener (it throws in
 * jsdom).
 */
const pressEscapeOn = (element: HTMLElement) => {
  const stop = (event: Event) => event.stopPropagation();
  element.addEventListener('keydown', stop);
  element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  element.removeEventListener('keydown', stop);
};

describe('useTopLayer', () => {
  it('renders nothing when closed and unmountOnClose is true', () => {
    const { container } = render(<TestLayer />);
    expect(container).toBeEmptyDOMElement();
  });

  it.each(['auto', 'manual'] as const)('shows a popover="%s" element when open', mode => {
    const { getByTestId } = render(<TestLayer open mode={mode} />);
    const layer = getByTestId('layer');

    expect(layer).toHaveAttribute('popover', mode);
    expect(isPopoverOpen(layer)).toBe(true);
  });

  it('opens a dialog modally when mode="modal"', () => {
    const { getByTestId } = render(<TestLayer open mode="modal" />);
    const layer = getByTestId('layer') as HTMLDialogElement;

    expect(layer).not.toHaveAttribute('popover');
    expect(layer.open).toBe(true);
  });

  it('goes straight to the open phase when nothing animates', () => {
    const phases: string[] = [];
    render(<TestLayer open onPhase={phase => phases.push(phase)} />);

    expect(phases).toEqual(['open']);
  });

  it('hides, then unmounts once the browser reports the close', async () => {
    const { container, getByTestId, rerender } = render(<TestLayer open />);
    const layer = getByTestId('layer');
    rerender(<TestLayer open={false} />);

    expect(isPopoverOpen(layer)).toBe(false);
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it('keeps the element mounted when unmountOnClose is false, without inert once the exit ends', async () => {
    const phases: string[] = [];
    const onPhase = (phase: string) => phases.push(phase);
    const { getByTestId, rerender } = render(<TestLayer open unmountOnClose={false} onPhase={onPhase} />);
    rerender(<TestLayer open={false} unmountOnClose={false} onPhase={onPhase} />);
    const layer = getByTestId('layer');

    expect(isPopoverOpen(layer)).toBe(false);
    // Wait for the end of the exit; `inert` is only set in a microtask after the close starts.
    await waitFor(() => {
      expect(phases[phases.length - 1]).toBe('closed');
      expect(layer).not.toHaveAttribute('inert');
      expect(layer).not.toHaveAttribute('aria-hidden');
    });

    rerender(<TestLayer open unmountOnClose={false} />);
    expect(layer).not.toHaveAttribute('inert');
    expect(layer).not.toHaveAttribute('aria-hidden');
  });

  it('reports a native popover dismissal as light-dismiss', async () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open onClose={onClose} />);

    act(() => {
      getByTestId('layer').hidePopover();
    });

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(onClose.mock.calls[0][0].type).toBe('light-dismiss');
    expect(onClose.mock.calls[0][0].event.type).toBe('toggle');
  });

  it('reports Escape as the close reason', async () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open onClose={onClose} />);
    const layer = getByTestId('layer');

    act(() => {
      pressEscapeOn(layer);
      layer.hidePopover();
    });

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(onClose.mock.calls[0][0].type).toBe('escape');
  });

  it('reports a native open through onOpen', async () => {
    const onOpen = jest.fn();
    const { getByTestId } = render(<TestLayer open={false} unmountOnClose={false} mode="manual" onOpen={onOpen} />);

    act(() => {
      getByTestId('layer').showPopover();
    });

    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
    expect(onOpen.mock.calls[0][0].type).toBe('toggle');
  });

  it('warns once about a native open without onOpenChange', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const { getByTestId } = render(<TestLayer open={false} unmountOnClose={false} mode="manual" />);
    const layer = getByTestId('layer');

    act(() => layer.showPopover());
    await waitFor(() => expect(consoleWarn).toHaveBeenCalledTimes(1));
    act(() => layer.hidePopover());
    act(() => layer.showPopover());
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(consoleWarn).toHaveBeenCalledTimes(1);
    expect(consoleWarn.mock.calls[0][0]).toContain('Pass `onOpenChange`');
    consoleWarn.mockRestore();
  });

  it('reports native closes for an element mounted only while open', async () => {
    const onClose = jest.fn();
    const MountedWhileOpen = ({ open }: { open: boolean }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      useTopLayer(ref, { open, mode: 'auto', unmountOnClose: false, onOpenChange: (_, data) => onClose(data) });
      return open ? <div ref={ref} popover="auto" data-testid="layer" /> : null;
    };
    const { getByTestId, rerender } = render(<MountedWhileOpen open={false} />);
    rerender(<MountedWhileOpen open />);

    act(() => {
      getByTestId('layer').hidePopover();
    });

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(onClose.mock.calls[0][0].type).toBe('light-dismiss');
  });

  it('keeps popover="hint" as rendered', () => {
    const { getByTestId } = render(<TestLayer open mode="hint" />);
    expect(getByTestId('layer')).toHaveAttribute('popover', 'hint');
  });

  it('does not report closes it caused itself', async () => {
    const onClose = jest.fn();
    const { rerender } = render(<TestLayer open onClose={onClose} />);
    rerender(<TestLayer open={false} unmountOnClose={false} onClose={onClose} />);

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('lets the browser close a modal on Escape and reports it on close', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open mode="modal" onClose={onClose} />);
    const layer = getByTestId('layer');
    const cancelEvent = new Event('cancel', { cancelable: true });
    const closeEvent = new Event('close');

    act(() => {
      layer.dispatchEvent(cancelEvent);
    });
    expect(cancelEvent.defaultPrevented).toBe(false);
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      layer.removeAttribute('open');
      layer.dispatchEvent(closeEvent);
    });
    expect(onClose).toHaveBeenCalledWith({ type: 'escape', event: closeEvent });
  });

  it('prevents native modal cancel and reports it as escape with preventEscapeClose', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open mode="modal" preventEscapeClose onClose={onClose} />);
    const cancelEvent = new Event('cancel', { cancelable: true });

    act(() => {
      getByTestId('layer').dispatchEvent(cancelEvent);
    });

    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(onClose).toHaveBeenCalledWith({ type: 'escape', event: cancelEvent });
  });

  it('ignores cancel events from nested dialogs', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <TestLayer open mode="modal" onClose={onClose}>
        <span data-testid="child" />
      </TestLayer>,
    );
    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true });

    act(() => {
      getByTestId('child').dispatchEvent(cancelEvent);
    });

    expect(cancelEvent.defaultPrevented).toBe(false);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('skips one cancel after Escape closed a popover nested in a modal', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <TestLayer open mode="modal" preventEscapeClose onClose={onClose}>
        <div popover="auto" data-testid="nested" />
      </TestLayer>,
    );
    const layer = getByTestId('layer');
    getByTestId('nested').showPopover();

    const webkitCancel = new Event('cancel', { cancelable: true });
    act(() => {
      pressEscapeOn(layer);
      layer.dispatchEvent(webkitCancel);
    });
    expect(webkitCancel.defaultPrevented).toBe(true);
    expect(onClose).not.toHaveBeenCalled();

    const cancelEvent = new Event('cancel', { cancelable: true });
    act(() => {
      layer.dispatchEvent(cancelEvent);
    });
    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('reports a native modal close as native-close', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open mode="modal" onClose={onClose} />);
    const closeEvent = new Event('close');

    act(() => {
      getByTestId('layer').removeAttribute('open');
      getByTestId('layer').dispatchEvent(closeEvent);
    });

    expect(onClose).toHaveBeenCalledWith({ type: 'native-close', event: closeEvent });
  });

  it('shows an element that replaces the open one, with initialFocus and onShow', () => {
    const onShow = jest.fn();
    const Example = ({ version }: { version: number }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      const { popover } = useTopLayer(ref, {
        open: true,
        mode: 'manual',
        initialFocus: element => element.querySelector<HTMLElement>('[data-target]'),
        onShow,
      });
      return (
        <div key={version} ref={ref} popover={popover} data-testid="layer">
          <button>First</button>
          <button data-target>Target {version}</button>
        </div>
      );
    };
    const { getByTestId, getByText, rerender } = render(<Example version={1} />);
    rerender(<Example version={2} />);

    expect(isPopoverOpen(getByTestId('layer'))).toBe(true);
    expect(onShow).toHaveBeenCalledTimes(2);
    expect(onShow).toHaveBeenLastCalledWith(getByTestId('layer'));
    expect(getByText('Target 2')).toHaveFocus();
  });

  it('shows an element that mounts after open became true, with initialFocus and onShow', () => {
    const onShow = jest.fn();
    const Example = ({ ready }: { ready: boolean }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      const { popover } = useTopLayer(ref, {
        open: true,
        mode: 'manual',
        initialFocus: element => element.querySelector<HTMLElement>('[data-target]'),
        onShow,
      });
      return ready ? (
        <div ref={ref} popover={popover} data-testid="layer">
          <button>First</button>
          <button data-target>Target</button>
        </div>
      ) : null;
    };
    const { getByTestId, getByText, rerender } = render(<Example ready={false} />);
    rerender(<Example ready />);

    expect(isPopoverOpen(getByTestId('layer'))).toBe(true);
    expect(onShow).toHaveBeenCalledTimes(1);
    expect(getByText('Target')).toHaveFocus();
  });

  it.each([
    { mode: 'manual' as const, preventEscapeClose: false },
    { mode: 'modal' as const, preventEscapeClose: true },
  ])(
    'does not warn when the consumer vetoes an Escape the hook handled ($mode)',
    async ({ mode, preventEscapeClose }) => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
      const onClose = jest.fn();
      const { getByText, getByTestId } = render(
        <TestLayer open mode={mode} preventEscapeClose={preventEscapeClose} onClose={onClose}>
          <button>Inside</button>
        </TestLayer>,
      );

      fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });
      await flush();

      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ type: 'escape' }));
      expect(consoleWarn).not.toHaveBeenCalled();
      const layer = getByTestId('layer');
      expect(mode === 'modal' ? (layer as HTMLDialogElement).open : isPopoverOpen(layer)).toBe(true);
      consoleWarn.mockRestore();
    },
  );

  it('unmounts a non-modal <dialog> shown without the Popover API once it closes', async () => {
    const Example = ({ open }: { open: boolean }) => {
      const ref = React.useRef<HTMLDialogElement | null>(null);
      const { shouldRender } = useTopLayer(ref, { open, mode: 'manual' });
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

  it('lets Escape close a modal whose nested hint popover fell back to manual', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <TestLayer open mode="modal" preventEscapeClose onClose={onClose}>
        <div popover="hint" data-testid="nested" />
      </TestLayer>,
    );
    const layer = getByTestId('layer');
    const nested = getByTestId('nested');
    // Browsers without `popover="hint"` reflect it as `manual`.
    Object.defineProperty(nested, 'popover', { get: () => 'manual' });
    nested.showPopover();

    const cancelEvent = new Event('cancel', { cancelable: true });
    act(() => {
      pressEscapeOn(layer);
      layer.dispatchEvent(cancelEvent);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('finishes the exit when the element is replaced before the browser reports the close', async () => {
    const phases: string[] = [];
    const KeyedLayer = ({ open, version }: { open: boolean; version: number }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      const { shouldRender, popover, phase } = useTopLayer(ref, { open, mode: 'auto' });
      phases.push(phase);
      return shouldRender ? <div key={version} ref={ref} popover={popover} data-testid="layer" /> : null;
    };
    const { queryByTestId, rerender } = render(<KeyedLayer open version={0} />);

    rerender(<KeyedLayer open={false} version={0} />);
    rerender(<KeyedLayer open={false} version={1} />);

    await waitFor(() => expect(queryByTestId('layer')).toBeNull());
    expect(phases[phases.length - 1]).toBe('closed');
  });

  it('reports a later native close as native-close when another listener prevented the cancel', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open mode="modal" onClose={onClose} />);
    const layer = getByTestId('layer') as HTMLDialogElement;
    layer.addEventListener('cancel', event => event.preventDefault());

    act(() => {
      layer.dispatchEvent(new Event('cancel', { cancelable: true }));
    });
    act(() => {
      layer.close();
      layer.dispatchEvent(new Event('close'));
    });

    expect(onClose).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'native-close' }));
  });

  it("keeps the consumer's own aria-hidden after the exit", async () => {
    const phases: string[] = [];
    const onPhase = (phase: string) => phases.push(phase);
    const { getByTestId, rerender } = render(<TestLayer open mode="manual" unmountOnClose={false} onPhase={onPhase} />);
    const layer = getByTestId('layer');
    layer.setAttribute('aria-hidden', 'true');

    rerender(<TestLayer open={false} mode="manual" unmountOnClose={false} onPhase={onPhase} />);

    await waitFor(() => {
      expect(phases[phases.length - 1]).toBe('closed');
      expect(layer).not.toHaveAttribute('inert');
    });
    expect(layer).toHaveAttribute('aria-hidden', 'true');
  });

  it('stays closed and warns when the consumer keeps open after a browser close', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const onClose = jest.fn();
    const { getByTestId } = render(<TestLayer open onClose={onClose} />);
    const layer = getByTestId('layer');

    act(() => {
      layer.hidePopover();
    });

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(isPopoverOpen(layer)).toBe(false);
    await waitFor(() => expect(consoleWarn).toHaveBeenCalledWith(expect.stringContaining('`open` stayed true')));
    consoleWarn.mockRestore();
  });

  it('does not warn when the consumer closes after a browser close', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const Example = () => {
      const [open, setOpen] = React.useState(true);
      return <TestLayer open={open} onClose={() => setOpen(false)} />;
    };
    const { getByTestId } = render(<Example />);

    act(() => {
      getByTestId('layer').hidePopover();
    });
    await flush();

    expect(consoleWarn).not.toHaveBeenCalled();
    consoleWarn.mockRestore();
  });

  it('does not keep re-showing two auto layers that both stay open', async () => {
    jest.spyOn(console, 'warn').mockImplementation();
    const onCloseA = jest.fn();
    const onCloseB = jest.fn();
    render(
      <>
        <TestLayer open onClose={onCloseA} />
        <TestLayer open onClose={onCloseB} />
      </>,
    );

    await act(
      () =>
        new Promise<void>(resolve => {
          setTimeout(resolve, 200);
        }),
    );

    expect(onCloseA.mock.calls.length + onCloseB.mock.calls.length).toBeLessThanOrEqual(1);
    jest.restoreAllMocks();
  });

  it('hides a native open the consumer declines', async () => {
    const onOpen = jest.fn();
    const { getByTestId } = render(<TestLayer open={false} unmountOnClose={false} mode="manual" onOpen={onOpen} />);
    const layer = getByTestId('layer');

    act(() => {
      layer.showPopover();
    });

    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(isPopoverOpen(layer)).toBe(false));
  });

  it('forgets an Escape that closed a nested popover once the key is released', () => {
    const { getByTestId } = render(
      <TestLayer open mode="modal">
        <div popover="auto" data-testid="nested" />
      </TestLayer>,
    );
    const layer = getByTestId('layer');
    const nested = getByTestId('nested');
    nested.showPopover();

    act(() => {
      pressEscapeOn(layer);
      nested.hidePopover();
      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', bubbles: true }));
    });

    // A later close request without a keydown, e.g. the Android back button.
    const cancelEvent = new Event('cancel', { cancelable: true });
    act(() => {
      layer.dispatchEvent(cancelEvent);
    });
    expect(cancelEvent.defaultPrevented).toBe(false);
  });

  it('restores focus to the previously focused element when focus is inside on close', () => {
    const Example = ({ open }: { open: boolean }) => (
      <>
        <button>Trigger</button>
        <TestLayer open={open} mode="manual">
          <button>Inside</button>
        </TestLayer>
      </>
    );
    const { getByText, rerender } = render(<Example open={false} />);
    const trigger = getByText('Trigger');
    trigger.focus();

    rerender(<Example open />);
    getByText('Inside').focus();
    rerender(<Example open={false} />);

    expect(trigger).toHaveFocus();
  });

  it.each([
    { reason: 'Escape', escape: true },
    { reason: 'light dismiss', escape: false },
  ])('restores focus after a browser close by $reason', async ({ escape }) => {
    const Example = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Trigger</button>
          <TestLayer open={open} mode="manual" onClose={() => setOpen(false)}>
            <button>Inside</button>
          </TestLayer>
        </>
      );
    };
    const { getByText, getByTestId } = render(<Example />);
    const trigger = getByText('Trigger');
    trigger.focus();
    fireEvent.click(trigger);
    const layer = getByTestId('layer');
    getByText('Inside').focus();

    act(() => {
      if (escape) {
        pressEscapeOn(layer);
      }
      layer.hidePopover();
    });

    await waitFor(() => expect(layer).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it('does not steal focus when focus moved outside before close', () => {
    const Example = ({ open }: { open: boolean }) => (
      <>
        <button>Trigger</button>
        <input aria-label="Elsewhere" />
        <TestLayer open={open} mode="manual">
          <button>Inside</button>
        </TestLayer>
      </>
    );
    const { getByText, getByLabelText, rerender } = render(<Example open={false} />);
    getByText('Trigger').focus();

    rerender(<Example open />);
    const elsewhere = getByLabelText('Elsewhere');
    elsewhere.focus();
    rerender(<Example open={false} />);

    expect(elsewhere).toHaveFocus();
  });

  it('restores the consumer aria-hidden="false" after the exit, so a reopened layer is not hidden', async () => {
    const phases: string[] = [];
    const onPhase = (phase: string) => phases.push(phase);
    const props = { mode: 'manual' as const, unmountOnClose: false, ariaHidden: 'false' as const, onPhase };
    const { getByTestId, rerender } = render(<TestLayer open {...props} />);
    const layer = getByTestId('layer');

    rerender(<TestLayer open={false} {...props} />);
    await waitFor(() => expect(layer).toHaveAttribute('aria-hidden', 'true'));
    await waitFor(() => {
      expect(phases[phases.length - 1]).toBe('closed');
      expect(layer).toHaveAttribute('aria-hidden', 'false');
    });

    rerender(<TestLayer open {...props} />);
    expect(layer).toHaveAttribute('aria-hidden', 'false');
    expect(layer).not.toHaveAttribute('inert');
  });

  it.each([
    { accepted: true, expected: true },
    { accepted: false, expected: false },
  ])('syncs a native modal open (accepted: $accepted)', async ({ accepted, expected }) => {
    const onOpen = jest.fn();
    const Example = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <TestLayer
          open={open}
          mode="modal"
          unmountOnClose={false}
          onOpen={event => {
            onOpen(event);
            if (accepted) {
              setOpen(true);
            }
          }}
        />
      );
    };
    const { getByTestId } = render(<Example />);
    const layer = getByTestId('layer') as HTMLDialogElement;

    // `showModal()` or a `commandfor` invoker; Chromium fires `toggle` on the dialog.
    act(() => {
      layer.setAttribute('open', '');
      layer.dispatchEvent(Object.assign(new Event('toggle'), { newState: 'open', oldState: 'closed' }));
    });

    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(layer.open).toBe(expected));
  });

  it('switches between show() and showModal() without the Popover API', () => {
    const Example = ({ mode }: { mode: 'manual' | 'modal' }) => {
      const ref = React.useRef<HTMLDialogElement | null>(null);
      useTopLayer(ref, { open: true, mode });
      const setRef = React.useCallback((element: HTMLDialogElement | null) => {
        if (element) {
          let modal = false;
          const { show, showModal, close } = element;
          Object.defineProperty(element, 'showPopover', { value: undefined });
          Object.defineProperty(element, 'hidePopover', { value: undefined });
          element.show = () => {
            modal = false;
            show.call(element);
          };
          element.showModal = () => {
            modal = true;
            showModal.call(element);
          };
          element.close = () => {
            modal = false;
            close.call(element);
          };
          element.matches = (selector: string) =>
            selector === ':modal' ? element.open && modal : HTMLElement.prototype.matches.call(element, selector);
        }
        ref.current = element;
      }, []);
      return <dialog ref={setRef} data-testid="layer" />;
    };
    const { getByTestId, rerender } = render(<Example mode="manual" />);
    const layer = getByTestId('layer') as HTMLDialogElement;
    expect(layer.open && layer.matches(':modal')).toBe(false);

    rerender(<Example mode="modal" />);
    expect(layer.open && layer.matches(':modal')).toBe(true);

    rerender(<Example mode="manual" />);
    expect(layer.open).toBe(true);
    expect(layer.matches(':modal')).toBe(false);
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
      const { shouldRender, popover } = useTopLayer(ref, { open, mode });
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

  it('adds document listeners only while open', () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');
    const keyListeners = () => addEventListener.mock.calls.filter(([type]) => type === 'keydown' || type === 'keyup');
    const { rerender } = render(<TestLayer open={false} mode="hint" unmountOnClose={false} />);
    rerender(<TestLayer open={false} mode="hint" unmountOnClose={false} />);
    expect(keyListeners()).toHaveLength(0);

    rerender(<TestLayer open mode="hint" unmountOnClose={false} />);
    expect(keyListeners()).toHaveLength(2);
    addEventListener.mockRestore();
  });

  it('does not pull focus back on a later close after the consumer kept open through a browser close', async () => {
    jest.spyOn(console, 'warn').mockImplementation();
    const Example = ({ open }: { open: boolean }) => (
      <>
        <button>Trigger</button>
        <TestLayer open={open} mode="manual" onClose={() => undefined}>
          <button>Inside</button>
        </TestLayer>
      </>
    );
    const { getByText, getByTestId, rerender } = render(<Example open={false} />);
    const trigger = getByText('Trigger');
    trigger.focus();
    rerender(<Example open />);
    getByText('Inside').focus();

    act(() => {
      getByTestId('layer').hidePopover();
    });
    await flush();
    // Focus was returned when the browser closed the layer.
    expect(trigger).toHaveFocus();

    trigger.blur();
    rerender(<Example open={false} />);
    expect(trigger).not.toHaveFocus();
    jest.restoreAllMocks();
  });

  it("returns focus wherever focus is with returnFocus: 'always'", () => {
    const Example = ({ open }: { open: boolean }) => (
      <>
        <button>Trigger</button>
        <input aria-label="Elsewhere" />
        <TestLayer open={open} mode="manual" returnFocus="always" />
      </>
    );
    const { getByText, getByLabelText, rerender } = render(<Example open={false} />);
    const trigger = getByText('Trigger');
    trigger.focus();

    rerender(<Example open />);
    getByLabelText('Elsewhere').focus();
    rerender(<Example open={false} />);

    expect(trigger).toHaveFocus();
  });

  it('focuses initialFocus and calls onShow when shown', () => {
    const onShow = jest.fn();
    const Example = ({ open }: { open: boolean }) => (
      <TestLayer
        open={open}
        mode="manual"
        unmountOnClose={false}
        initialFocus={element => element.querySelector<HTMLElement>('[data-first]')}
        onShow={onShow}
      >
        <button data-first>First</button>
      </TestLayer>
    );
    const { getByText, getByTestId, rerender } = render(<Example open={false} />);
    rerender(<Example open />);

    expect(getByText('First')).toHaveFocus();
    expect(onShow).toHaveBeenCalledWith(getByTestId('layer'));
  });

  it('focuses initialFocus and calls onShow for a layer mounted open', () => {
    const onShow = jest.fn();
    const { getByText } = render(
      <TestLayer
        open
        mode="manual"
        initialFocus={element => element.querySelector<HTMLElement>('[data-target]')}
        onShow={onShow}
      >
        <button>First</button>
        <button data-target>Target</button>
      </TestLayer>,
    );

    expect(getByText('Target')).toHaveFocus();
    expect(onShow).toHaveBeenCalledTimes(1);
  });

  it.each([
    { initialFocus: (element: HTMLElement) => element.querySelector<HTMLElement>('[data-first]'), focused: 'First' },
    { initialFocus: () => false as const, focused: 'Trigger' },
  ])(
    'applies initialFocus ($focused) and onShow once for a native open the consumer accepts',
    async ({ initialFocus, focused }) => {
      const onShow = jest.fn();
      const Example = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <button>Trigger</button>
            <TestLayer
              open={open}
              mode="manual"
              unmountOnClose={false}
              initialFocus={initialFocus}
              onShow={onShow}
              onOpen={() => setOpen(true)}
            >
              <button data-first>First</button>
            </TestLayer>
          </>
        );
      };
      const { getByText, getByTestId } = render(<Example />);
      getByText('Trigger').focus();

      act(() => {
        getByTestId('layer').showPopover();
        // The browser moved focus into the layer.
        getByText('First').blur();
      });

      await waitFor(() => expect(onShow).toHaveBeenCalledTimes(1));
      expect(getByText(focused)).toHaveFocus();
    },
  );

  it('keeps aria-hidden that React changed while the exit ran', async () => {
    const Example = ({ open }: { open: boolean }) => (
      <TestLayer open={open} mode="modal" unmountOnClose={false} ariaHidden={open ? 'false' : 'true'} />
    );
    const { getByTestId, rerender } = render(<Example open />);
    const layer = getByTestId('layer') as HTMLDialogElement;
    // Hold the exit until the `close` event, which jsdom does not fire.
    jest.spyOn(layer, 'close').mockImplementation(() => layer.removeAttribute('open'));

    rerender(<Example open={false} />);
    await act(() => Promise.resolve());
    expect(layer).toHaveAttribute('inert');

    rerender(<Example open />);

    expect(layer).toHaveAttribute('aria-hidden', 'false');
    expect(layer).not.toHaveAttribute('inert');
  });

  it('reports Escape for a <dialog> shown without the Popover API, which the browser does not close', () => {
    const onOpenChange = jest.fn();
    const Example = () => {
      const ref = React.useRef<HTMLDialogElement | null>(null);
      const { onKeyDown } = useTopLayer(ref, { open: true, mode: 'auto', onOpenChange });
      const setRef = React.useCallback((element: HTMLDialogElement | null) => {
        if (element) {
          Object.defineProperty(element, 'showPopover', { value: undefined });
          Object.defineProperty(element, 'hidePopover', { value: undefined });
        }
        ref.current = element;
      }, []);
      return (
        <dialog ref={setRef} onKeyDown={onKeyDown}>
          <button>Inside</button>
        </dialog>
      );
    };
    const { getByText } = render(<Example />);

    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ type: 'escape' }));
  });

  describe('onKeyDown', () => {
    it('reports Escape for a manual layer and stops it from reaching outer layers', () => {
      const onClose = jest.fn();
      const onOuterKeyDown = jest.fn();
      const { getByText } = render(
        <div onKeyDown={onOuterKeyDown}>
          <TestLayer open mode="manual" onClose={onClose}>
            <button>Inside</button>
          </TestLayer>
        </div>,
      );

      fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });

      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ type: 'escape' }));
      expect(onOuterKeyDown).not.toHaveBeenCalled();
    });

    it('leaves Escape to the browser for an auto layer', () => {
      const onClose = jest.fn();
      const { getByText } = render(
        <TestLayer open mode="auto" onClose={onClose}>
          <button>Inside</button>
        </TestLayer>,
      );

      fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('ignores Escape from a layer nested inside', () => {
      const onClose = jest.fn();
      const { getByText } = render(
        <TestLayer open mode="manual" onClose={onClose}>
          <div popover="manual">
            <button>Nested</button>
          </div>
        </TestLayer>,
      );

      fireEvent.keyDown(getByText('Nested'), { key: 'Escape' });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('reports Escape from content portaled out of the layer', () => {
      const onClose = jest.fn();
      const { getByText } = render(
        <TestLayer open mode="manual" onClose={onClose}>
          {createPortal(<button>Portaled</button>, document.body)}
        </TestLayer>,
      );

      fireEvent.keyDown(getByText('Portaled'), { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('reports Escape for a modal with preventEscapeClose once, not again on cancel', () => {
      const onClose = jest.fn();
      const { getByText, getByTestId } = render(
        <TestLayer open mode="modal" preventEscapeClose onClose={onClose}>
          <button>Inside</button>
        </TestLayer>,
      );

      fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });
      const cancelEvent = new Event('cancel', { cancelable: true });
      act(() => {
        getByTestId('layer').dispatchEvent(cancelEvent);
      });

      expect(cancelEvent.defaultPrevented).toBe(true);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose.mock.calls[0][0].event.type).toBe('keydown');
    });
  });
});
