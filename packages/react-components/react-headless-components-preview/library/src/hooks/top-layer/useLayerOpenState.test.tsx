import * as React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { useLayerPresence } from './useLayerPresence';
import { useLayerOpenState } from './useLayerOpenState';
import { useDialogLayerOpenState } from './useDialogLayerOpenState';
import { isPopoverOpen } from './utils';
import type { TopLayerMode, TopLayerOpenChangeData, UseLayerOpenStateOptions } from './types';

type LayerProps<Mode extends TopLayerMode> = Partial<UseLayerOpenStateOptions<Mode>> & {
  onRender?: (open: boolean) => void;
};

const Layer = ({ mode = 'auto', onRender, ...options }: LayerProps<'auto' | 'hint' | 'manual'>) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { open, setOpen, popover } = useLayerOpenState(ref, { mode, ...options });
  onRender?.(open);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <div ref={ref} popover={popover} data-testid="layer" />
    </>
  );
};

const DialogLayer = ({ mode = 'modal', onRender, ...options }: LayerProps<TopLayerMode>) => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const { open, setOpen, popover } = useDialogLayerOpenState(ref, { mode, ...options });
  onRender?.(open);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <dialog ref={ref} popover={popover} data-testid="layer" />
    </>
  );
};

describe('useLayerOpenState and useDialogLayerOpenState', () => {
  it('shows and hides a controlled popover', () => {
    const { getByTestId, rerender } = render(<Layer open mode="manual" />);
    expect(isPopoverOpen(getByTestId('layer'))).toBe(true);

    rerender(<Layer open={false} mode="manual" />);
    expect(isPopoverOpen(getByTestId('layer'))).toBe(false);
  });

  it('keeps uncontrolled state, starting from defaultOpen', () => {
    const { getByTestId, getByText } = render(<Layer defaultOpen />);
    expect(isPopoverOpen(getByTestId('layer'))).toBe(true);

    act(() => getByText('Toggle').click());
    expect(isPopoverOpen(getByTestId('layer'))).toBe(false);
  });

  it('opens a <dialog> modally for mode="modal"', () => {
    const { getByTestId } = render(<DialogLayer open />);
    expect((getByTestId('layer') as HTMLDialogElement).open).toBe(true);
  });

  it('reports a light dismiss, and uncontrolled state follows it', async () => {
    const onOpenChange = jest.fn();
    const onRender = jest.fn();
    const { getByTestId } = render(<Layer defaultOpen onOpenChange={onOpenChange} onRender={onRender} />);

    act(() => getByTestId('layer').hidePopover());

    await waitFor(() =>
      expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ type: 'light-dismiss' })),
    );
    expect(onRender).toHaveBeenLastCalledWith(false);
  });

  it('does not report changes made through open', () => {
    const onOpenChange = jest.fn();
    const { rerender } = render(<Layer open onOpenChange={onOpenChange} />);
    rerender(<Layer open={false} onOpenChange={onOpenChange} />);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('reports a native open, and hides it again when open stays false', async () => {
    const onOpenChange = jest.fn();
    const { getByTestId } = render(<Layer open={false} onOpenChange={onOpenChange} />);

    act(() => getByTestId('layer').showPopover());

    await waitFor(() =>
      expect(onOpenChange).toHaveBeenCalledWith(true, expect.objectContaining({ type: 'native-open' })),
    );
    await waitFor(() => expect(isPopoverOpen(getByTestId('layer'))).toBe(false));
  });

  it('reports a dialog close as native-close, and as escape after a cancel', async () => {
    // Controlled `open` stays true after the close until the rerender below.
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    const onOpenChange = jest.fn();
    const { getByTestId, rerender } = render(<DialogLayer open onOpenChange={onOpenChange} />);
    const dialog = getByTestId('layer') as HTMLDialogElement;

    act(() => dialog.close());
    await waitFor(() =>
      expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.objectContaining({ type: 'native-close' })),
    );

    rerender(<DialogLayer open={false} onOpenChange={onOpenChange} />);
    rerender(<DialogLayer open onOpenChange={onOpenChange} />);
    act(() => {
      dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
      dialog.close();
    });
    await waitFor(() =>
      expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.objectContaining({ type: 'escape' })),
    );
    warn.mockRestore();
  });

  it('switches mode while open without reporting a close', async () => {
    const onOpenChange = jest.fn();
    const { getByTestId, rerender } = render(<Layer open mode="manual" onOpenChange={onOpenChange} />);
    rerender(<Layer open mode="auto" onOpenChange={onOpenChange} />);

    await waitFor(() => expect(isPopoverOpen(getByTestId('layer'))).toBe(true));
    expect(getByTestId('layer').getAttribute('popover')).toBe('auto');
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('switches between show() and showModal() without the Popover API', () => {
    const Example = ({ mode }: { mode: 'manual' | 'modal' }) => {
      const ref = React.useRef<HTMLDialogElement | null>(null);
      useDialogLayerOpenState(ref, { open: true, mode });
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

  it('calls the lifecycle callbacks in order, once per open and close', async () => {
    const calls: string[] = [];
    const callbacks = {
      onBeforeShow: () => calls.push('beforeShow'),
      onShow: () => calls.push('show'),
      onBeforeHide: () => calls.push('beforeHide'),
      onHide: () => calls.push('hide'),
    };
    const { getByTestId, rerender } = render(<Layer open {...callbacks} />);
    rerender(<Layer open={false} {...callbacks} />);
    expect(calls).toEqual(['beforeShow', 'show', 'beforeHide', 'hide']);

    calls.length = 0;
    rerender(<Layer open {...callbacks} onOpenChange={() => undefined} />);
    act(() => getByTestId('layer').hidePopover());
    await waitFor(() => expect(calls).toEqual(['beforeShow', 'show', 'beforeHide', 'hide']));
  });

  it('calls onShow once per show', () => {
    const onShow = jest.fn();
    const { rerender } = render(<Layer open onShow={onShow} />);
    rerender(<Layer open onShow={onShow} />);
    expect(onShow).toHaveBeenCalledTimes(1);

    rerender(<Layer open={false} onShow={onShow} />);
    rerender(<Layer open onShow={onShow} />);
    expect(onShow).toHaveBeenCalledTimes(2);
  });

  describe('with useLayerPresence', () => {
    type TestLayerProps = {
      open?: boolean;
      mode?: TopLayerMode;
      unmountOnClose?: boolean;
      children?: React.ReactNode;
      onShow?: (element: HTMLElement) => void;
      onClose?: (data: TopLayerOpenChangeData) => void;
      onOpen?: (event: Event) => void;
    };

    const TestLayer = ({
      open = false,
      mode = 'auto',
      unmountOnClose,
      children,
      onShow,
      onClose,
      onOpen,
    }: TestLayerProps) => {
      const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
      const onOpenChange =
        onClose || onOpen
          ? (nextOpen: boolean, data: TopLayerOpenChangeData) => (nextOpen ? onOpen?.(data.event) : onClose?.(data))
          : undefined;
      const { popover } = useDialogLayerOpenState(ref, { open, mode, onOpenChange, onShow });
      const { shouldRender } = useLayerPresence(ref, { open, unmountOnClose });

      if (!shouldRender) {
        return null;
      }

      const Element = mode === 'modal' ? 'dialog' : 'div';
      return (
        <Element ref={ref} popover={popover} data-testid="layer">
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

    it.each(['auto', 'manual'] as const)('shows a popover="%s" element when open', mode => {
      const { getByTestId } = render(<TestLayer open mode={mode} />);
      const layer = getByTestId('layer');

      expect(layer).toHaveAttribute('popover', mode);
      expect(isPopoverOpen(layer)).toBe(true);
    });

    it('keeps popover="hint" as rendered', () => {
      const { getByTestId } = render(<TestLayer open mode="hint" />);
      expect(getByTestId('layer')).toHaveAttribute('popover', 'hint');
    });

    it('opens a dialog modally without a popover attribute', () => {
      const { getByTestId } = render(<TestLayer open mode="modal" />);
      const layer = getByTestId('layer') as HTMLDialogElement;

      expect(layer).not.toHaveAttribute('popover');
      expect(layer.open).toBe(true);
    });

    it('reports a native popover dismissal with the toggle event', async () => {
      const onClose = jest.fn();
      const { getByTestId } = render(<TestLayer open onClose={onClose} />);

      act(() => {
        getByTestId('layer').hidePopover();
      });

      await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
      expect(onClose.mock.calls[0][0].type).toBe('light-dismiss');
      expect(onClose.mock.calls[0][0].event.type).toBe('toggle');
    });

    it('reports a native open with the toggle event', async () => {
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
      await flush();

      expect(consoleWarn).toHaveBeenCalledTimes(1);
      expect(consoleWarn.mock.calls[0][0]).toContain('Pass `onOpenChange`');
      consoleWarn.mockRestore();
    });

    it('reports native closes for an element mounted only while open', async () => {
      const onClose = jest.fn();
      const MountedWhileOpen = ({ open }: { open: boolean }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        useLayerOpenState(ref, { open, mode: 'auto', onOpenChange: (_, data) => onClose(data) });
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

    it('does not report closes it caused itself', async () => {
      const onClose = jest.fn();
      const { rerender } = render(<TestLayer open onClose={onClose} />);
      rerender(<TestLayer open={false} unmountOnClose={false} onClose={onClose} />);

      await flush();
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

    it('shows an element that replaces the open one, and calls onShow for it', () => {
      const onShow = jest.fn();
      const Example = ({ version }: { version: number }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const { popover } = useLayerOpenState(ref, { open: true, mode: 'manual', onShow });
        return <div key={version} ref={ref} popover={popover} data-testid="layer" />;
      };
      const { getByTestId, rerender } = render(<Example version={1} />);
      rerender(<Example version={2} />);

      expect(isPopoverOpen(getByTestId('layer'))).toBe(true);
      expect(onShow).toHaveBeenCalledTimes(2);
      expect(onShow).toHaveBeenLastCalledWith(getByTestId('layer'));
    });

    it('shows an element that mounts after open became true, and calls onShow for it', () => {
      const onShow = jest.fn();
      const Example = ({ ready }: { ready: boolean }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const { popover } = useLayerOpenState(ref, { open: true, mode: 'manual', onShow });
        return ready ? <div ref={ref} popover={popover} data-testid="layer" /> : null;
      };
      const { getByTestId, rerender } = render(<Example ready={false} />);
      rerender(<Example ready />);

      expect(isPopoverOpen(getByTestId('layer'))).toBe(true);
      expect(onShow).toHaveBeenCalledTimes(1);
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
  });
});
