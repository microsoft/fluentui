import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { act, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setVirtualParent } from '@fluentui/react-utilities';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { usePopover } from './usePopover';
import { PopoverFocusExample, TriggerPortalExample, useTestPopoverOpen } from '../../testing/PopoverTestFixtures';

describe('Popover', () => {
  describe('automatic focus-exit dismissal', () => {
    const Example = PopoverFocusExample;
    const focus = (element: HTMLElement) => act(() => element.focus());

    it('closes by default when focus moves to the next page control', async () => {
      const onOpenChange = jest.fn();
      const { getByText, queryByText } = render(<Example onOpenChange={onOpenChange} />);
      focus(getByText('Inside'));
      focus(getByText('After'));
      await waitFor(() => expect(queryByText('Inside')).toBeNull());
      expect(getByText('After')).toHaveFocus();
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('does not dismiss hover opening when focus moves between unrelated outside controls', () => {
      const onOpenChange = jest.fn();
      const { getByText } = render(<Example defaultOpen={false} textOnly openOnHover onOpenChange={onOpenChange} />);
      focus(getByText('Before'));
      fireEvent.mouseEnter(getByText('Trigger'));
      onOpenChange.mockClear();
      focus(getByText('After'));
      expect(getByText('Surface')).toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('allows controlled acceptance without duplicate native close callbacks', async () => {
      const onOpenChange = jest.fn();
      const ControlledExample = () => {
        return <Example {...useTestPopoverOpen('accept', true, onOpenChange)} />;
      };
      const { getByText, queryByText } = render(<ControlledExample />);
      focus(getByText('Inside'));
      focus(getByText('After'));
      await waitFor(() => expect(queryByText('Inside')).toBeNull());
      expect(getByText('After')).toHaveFocus();
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('honors controlled rejection and only requests again after reentry', async () => {
      const onOpenChange = jest.fn();
      const { getByText } = render(<Example open onOpenChange={onOpenChange} />);
      focus(getByText('Inside'));
      focus(getByText('After'));
      expect(getByText('Inside').closest('[popover]')?.matches(':popover-open')).toBe(true);
      expect(getByText('After')).toHaveFocus();
      await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
      focus(getByText('Before'));
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      focus(getByText('Inside'));
      focus(getByText('After'));
      await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(2));
    });

    it('does not dismiss for an outside destination superseded by reentry in the same dispatch turn', async () => {
      const onOpenChange = jest.fn();
      const { getByText } = render(<Example onOpenChange={onOpenChange} />);
      focus(getByText('Inside'));
      await act(async () => {
        getByText('After').focus();
        getByText('Inside').focus();
      });
      expect(getByText('Inside')).toHaveFocus();
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('preserves a consumer surface focus-capture handler', () => {
      const onFocusCapture = jest.fn();
      const { getByText } = render(
        <Popover defaultOpen>
          <PopoverSurface onFocusCapture={onFocusCapture}>
            <button>Inside</button>
          </PopoverSurface>
        </Popover>,
      );
      onFocusCapture.mockClear();
      focus(getByText('Inside'));
      fireEvent.focusIn(getByText('Inside'));
      expect(onFocusCapture).toHaveBeenCalled();
    });

    it('ignores unknown destinations and window blur without losing boundary ownership', async () => {
      const onOpenChange = jest.fn();
      const { getByText, queryByText, rerender } = render(<Example onOpenChange={onOpenChange} />);
      const inside = getByText('Inside');
      focus(inside);
      act(() => inside.blur());
      fireEvent.focusOut(inside, { relatedTarget: null });
      fireEvent(inside.ownerDocument.defaultView!, new Event('blur'));
      expect(onOpenChange).not.toHaveBeenCalled();
      rerender(<Example onOpenChange={onOpenChange} />);
      focus(getByText('After'));
      await waitFor(() => expect(queryByText('Inside')).toBeNull());
      expect(getByText('After')).toHaveFocus();
    });

    it('does not change modal focus handling', () => {
      const onOpenChange = jest.fn();
      const { getByText } = render(<Example trapFocus onOpenChange={onOpenChange} />);
      focus(getByText('Inside'));
      focus(getByText('After'));
      expect(getByText('Inside')).toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('keeps a parent open while entering and leaving a nested surface within its boundary', async () => {
      const parentChange = jest.fn();
      const childChange = jest.fn();
      const { getByText, queryByText } = render(
        <Example onOpenChange={parentChange}>
          <Popover defaultOpen onOpenChange={childChange}>
            <PopoverSurface>
              <button>Nested</button>
            </PopoverSurface>
          </Popover>
        </Example>,
      );
      focus(getByText('Nested'));
      focus(getByText('Inside'));
      await waitFor(() => expect(queryByText('Nested')).toBeNull());
      expect(parentChange).not.toHaveBeenCalled();
      expect(childChange).toHaveBeenCalledTimes(1);
      expect(getByText('Inside')).toHaveFocus();
    });

    it('includes virtual-parent-linked portals without treating arbitrary portals as owned', async () => {
      const onOpenChange = jest.fn();
      const { getByText, queryByText } = render(
        <Example onOpenChange={onOpenChange}>
          {createPortal(<button>Linked portal</button>, document.body)}
          {createPortal(<button>Unregistered portal</button>, document.body)}
        </Example>,
      );
      setVirtualParent(getByText('Linked portal'), getByText('Inside').closest('[popover]')!);
      focus(getByText('Inside'));
      focus(getByText('Linked portal'));
      expect(onOpenChange).not.toHaveBeenCalled();
      focus(getByText('Unregistered portal'));
      await waitFor(() => expect(queryByText('Inside')).toBeNull());
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('close lifecycle', () => {
    const Example = ({ open, trapFocus = false }: { open: boolean; trapFocus?: boolean }) => (
      <Popover open={open} trapFocus={trapFocus}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>
          <button autoFocus>Inside</button>
        </PopoverSurface>
      </Popover>
    );

    it('calls native dialog close while the surface is connected', async () => {
      const { getByRole, getByText, rerender } = render(<Example open trapFocus />);
      const surface = getByRole('dialog', { hidden: true });
      const nativeClose = HTMLDialogElement.prototype.close;
      const close = jest
        .spyOn(HTMLDialogElement.prototype, 'close')
        .mockImplementation(function (this: HTMLDialogElement) {
          expect(this.isConnected).toBe(true);
          nativeClose.call(this);
        });
      try {
        rerender(<Example open={false} trapFocus />);
        expect(close).toHaveBeenCalledTimes(1);
        expect(surface.isConnected).toBe(true);
        await waitFor(() => expect(surface.isConnected).toBe(false));
        expect(getByText('Trigger')).toHaveFocus();
      } finally {
        close.mockRestore();
      }
    });

    it('preserves focus outside the shadow root during controlled close', () => {
      const { container } = render(
        <>
          <button>Outside</button>
          <div />
        </>,
      );
      const outside = container.querySelector('button')!;
      const host = container.querySelector('div')!;
      const shadowRoot = host.attachShadow({ mode: 'closed' });
      const { rerender } = render(createPortal(<Example open />, shadowRoot));
      expect(shadowRoot.activeElement).toHaveTextContent('Inside');
      outside.focus();
      rerender(createPortal(<Example open={false} />, shadowRoot));
      expect(outside).toHaveFocus();
    });

    it('keeps the surface mounted until native close completes without repeating onOpenChange', () => {
      const onOpenChange = jest.fn();
      const ControlledExample = ({ open }: { open: boolean }) => (
        <Popover open={open} trapFocus onOpenChange={onOpenChange}>
          <PopoverSurface>Surface</PopoverSurface>
        </Popover>
      );
      const { getByRole, rerender } = render(<ControlledExample open />);
      const surface = getByRole('dialog', { hidden: true });
      const close = jest
        .spyOn(HTMLDialogElement.prototype, 'close')
        .mockImplementation(function (this: HTMLDialogElement) {
          this.removeAttribute('open');
        });
      try {
        rerender(<ControlledExample open={false} />);
        expect(surface.isConnected).toBe(true);
        fireEvent(surface, new Event('cancel', { cancelable: true }));
        expect(surface.isConnected).toBe(true);
        fireEvent(surface, new Event('close'));
        expect(surface.isConnected).toBe(false);
        expect(onOpenChange).not.toHaveBeenCalled();
      } finally {
        close.mockRestore();
      }
    });

    it('ignores a queued close event after the dialog has reopened', () => {
      const { getByRole, rerender } = render(<Example open trapFocus />);
      const surface = getByRole('dialog', { hidden: true });
      const close = jest
        .spyOn(HTMLDialogElement.prototype, 'close')
        .mockImplementation(function (this: HTMLDialogElement) {
          this.removeAttribute('open');
        });
      try {
        rerender(<Example open={false} trapFocus />);
        rerender(<Example open trapFocus />);
        fireEvent(surface, new Event('close'));
        expect(surface.isConnected).toBe(true);
        expect(surface).toHaveAttribute('open');
      } finally {
        close.mockRestore();
      }
    });

    it('reopens when a controlled parent keeps open after native dismissal', () => {
      const onOpenChange = jest.fn();
      const { getByRole } = render(
        <Popover open trapFocus onOpenChange={onOpenChange}>
          <PopoverSurface>Surface</PopoverSurface>
        </Popover>,
      );
      const surface = getByRole('dialog', { hidden: true });
      surface.removeAttribute('open');
      fireEvent(surface, new Event('close'));
      expect(surface.isConnected).toBe(true);
      expect(surface).toHaveAttribute('open');
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: false }));
    });

    ([false, true] as const).forEach(trapFocus => {
      it(`follows a replaced surface after close and reopen (${trapFocus ? 'modal' : 'non-modal'})`, async () => {
        const onOpenChange = jest.fn();
        const KeyedExample = ({ open, version }: { open: boolean; version: number }) => (
          <Popover open={open} trapFocus={trapFocus} onOpenChange={onOpenChange}>
            <PopoverSurface key={version}>Surface</PopoverSurface>
          </Popover>
        );
        const { getByText, queryByText, rerender } = render(<KeyedExample open version={0} />);
        const oldSurface = getByText('Surface');
        rerender(<KeyedExample open={false} version={1} />);
        await waitFor(() => expect(queryByText('Surface')).toBeNull());
        expect(oldSurface.isConnected).toBe(false);
        rerender(<KeyedExample open version={1} />);
        const surface = getByText('Surface');
        if (trapFocus) {
          surface.removeAttribute('open');
          fireEvent(surface, new Event('close'));
        } else {
          surface.hidePopover();
          await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
        }
        expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: false }));
      });

      it(`unmounts a surface that never opened (${trapFocus ? 'modal' : 'non-modal'})`, async () => {
        const preventOpening = (surface: HTMLDialogElement | HTMLDivElement | null) => {
          if (surface) {
            Object.defineProperty(surface, trapFocus ? 'showModal' : 'showPopover', {
              configurable: true,
              value: () => undefined,
            });
          }
        };
        const PreventedExample = ({ open }: { open: boolean }) => (
          <Popover open={open} trapFocus={trapFocus}>
            <PopoverSurface ref={preventOpening}>Surface</PopoverSurface>
          </Popover>
        );
        const { queryByText, rerender } = render(<PreventedExample open />);
        rerender(<PreventedExample open={false} />);
        await waitFor(() => expect(queryByText('Surface')).toBeNull());
      });
    });

    it('ignores a queued polyfill close toggle after reopening', async () => {
      const onOpenChange = jest.fn();
      const ControlledExample = ({ open }: { open: boolean }) => (
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverSurface>Surface</PopoverSurface>
        </Popover>
      );
      const { getByText, rerender } = render(<ControlledExample open />);
      const surface = getByText('Surface');
      const toggle = jest.fn();
      surface.addEventListener('toggle', toggle);
      await waitFor(() => expect(toggle).toHaveBeenCalled());
      toggle.mockClear();
      rerender(<ControlledExample open={false} />);
      rerender(<ControlledExample open />);
      await waitFor(() => expect(toggle).toHaveBeenCalled());
      expect(surface.isConnected).toBe(true);
      expect(surface.matches(':popover-open')).toBe(true);
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    const NativeCloseExample = () => (
      <>
        <button>Outside</button>
        <Popover defaultOpen trapFocus>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <button autoFocus>Inside</button>
          </PopoverSurface>
        </Popover>
      </>
    );

    ([false, true] as const).forEach(withBeforeToggle => {
      it(`restores focus after native dialog close ${withBeforeToggle ? 'with' : 'without'} beforetoggle`, () => {
        const { getByRole, getByText, queryByRole } = render(<NativeCloseExample />);
        const surface = getByRole('dialog', { hidden: true });
        expect(getByText('Inside')).toHaveFocus();
        if (withBeforeToggle) {
          fireEvent(surface, Object.assign(new Event('beforetoggle'), { newState: 'closed' }));
        }
        surface.removeAttribute('open');
        getByText('Inside').blur();
        fireEvent(surface, new Event('close'));
        expect(queryByRole('dialog', { hidden: true })).toBeNull();
        expect(getByText('Trigger')).toHaveFocus();
      });
    });

    it('preserves focus moved outside between native dialog close and the close event', () => {
      const { getByRole, getByText } = render(<NativeCloseExample />);
      const surface = getByRole('dialog', { hidden: true });
      surface.removeAttribute('open');
      getByText('Outside').focus();
      fireEvent(surface, new Event('close'));
      expect(getByText('Outside')).toHaveFocus();
    });

    it('does not restore focus when the inner control was blurred before native dialog close', () => {
      const { getByRole, getByText } = render(<NativeCloseExample />);
      getByText('Inside').blur();
      getByRole('dialog', { hidden: true }).removeAttribute('open');
      fireEvent(getByRole('dialog', { hidden: true }), new Event('close'));
      expect(getByText('Trigger')).not.toHaveFocus();
    });

    (['open', 'closed'] as const).forEach(mode => {
      ([false, true] as const).forEach(inShadowRoot => {
        it(`restores focus from a nested ${mode} shadow root ${
          inShadowRoot ? 'inside another shadow root' : 'in the document'
        }`, async () => {
          const NestedControl = () => {
            const [root, setRoot] = React.useState<ShadowRoot | null>(null);
            const attachRoot = React.useCallback((host: HTMLDivElement | null) => {
              if (host) {
                setRoot(host.attachShadow({ mode }));
              }
            }, []);
            return <div ref={attachRoot}>{root && createPortal(<button autoFocus>Nested control</button>, root)}</div>;
          };
          const NestedExample = ({ open }: { open: boolean }) => (
            <Popover open={open}>
              <PopoverTrigger>
                <button>Trigger</button>
              </PopoverTrigger>
              <PopoverSurface as="div">
                <NestedControl />
              </PopoverSurface>
            </Popover>
          );
          const { container } = render(<div />);
          const host = container.firstElementChild!;
          const outerShadowRoot = inShadowRoot ? host.attachShadow({ mode: 'open' }) : null;
          const root = outerShadowRoot ?? host;
          const { rerender } = render(createPortal(<NestedExample open />, root));
          const surface = root.querySelector('[data-popover-surface]')!;
          const nestedHost = surface.firstElementChild!;
          expect(outerShadowRoot?.activeElement ?? host.ownerDocument.activeElement).toBe(nestedHost);
          rerender(createPortal(<NestedExample open={false} />, root));
          await waitFor(() =>
            expect(outerShadowRoot?.activeElement ?? host.ownerDocument.activeElement).toBe(
              root.querySelector('button'),
            ),
          );
        });
      });
    });
  });

  it('renders trigger and surface children', () => {
    const { getByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toBeInTheDocument();
    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('opens on trigger click (uncontrolled)', () => {
    const { getByText, queryByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(queryByText('Surface content')).not.toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('batches surface retention with an uncontrolled opening', () => {
    const onRender = jest.fn();
    const MeasuredPopover = () => {
      const state = usePopover({ children: <div /> });
      onRender();
      return (
        <>
          <button aria-expanded={state.open} onClick={event => state.setOpen(event, true)}>
            Trigger
          </button>
          {state.shouldRenderSurface && (
            <section popover="auto" ref={state.contentRef}>
              Surface
            </section>
          )}
        </>
      );
    };
    const { getByText } = render(<MeasuredPopover />);
    onRender.mockClear();

    fireEvent.click(getByText('Trigger'));

    expect(getByText('Trigger')).toHaveAttribute('aria-expanded', 'true');
    expect(getByText('Surface').matches(':popover-open')).toBe(true);
    expect(onRender).toHaveBeenCalledTimes(1);
  });

  it('does not mount a surface when a controlled opening request is rejected', () => {
    const onOpenChange = jest.fn();
    const { getByText, queryByText } = render(
      <Popover open={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    fireEvent.click(getByText('Trigger'));

    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
    expect(queryByText('Surface')).not.toBeInTheDocument();
  });

  it('closes on trigger click when open', async () => {
    const { getByText, queryByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Surface content')).toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    await waitFor(() => expect(queryByText('Surface content')).not.toBeInTheDocument());
  });

  it('fires onOpenChange callback', () => {
    const onOpenChange = jest.fn();

    const { getByText } = render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    userEvent.click(getByText('Trigger'));

    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('supports controlled open state', () => {
    const { getByText, queryByText, rerender } = render(
      <Popover open={false}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(queryByText('Surface')).not.toBeInTheDocument();

    rerender(
      <Popover open={true}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Surface')).toBeInTheDocument();
  });

  it('sets aria-expanded on trigger', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    const trigger = getByText('Trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets data-open on trigger when open', () => {
    const { getByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('data-open');
  });

  it('sets role="group" on surface', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true })).toBeInTheDocument();
  });

  it('sets data-open attribute on surface', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true })).toHaveAttribute('data-open');
  });

  it('mirrors a browser-driven `toggle` event into React state and closes the surface', async () => {
    const { getByRole, queryByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group', { hidden: true });
    surface.hidePopover();

    await waitFor(() => expect(queryByText('Surface')).not.toBeInTheDocument());
  });

  it('uses a custom id for the surface and references it from the trigger', () => {
    const { getByRole } = render(
      <Popover id="my-id" defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true })).toHaveAttribute('id', 'my-id');
    expect(getByRole('button')).toHaveAttribute('aria-details', 'my-id');
  });

  it('sets popover="auto" on surface by default', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true })).toHaveAttribute('popover', 'auto');
  });
});

describe('Popover frame observation lifecycle', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const settle = async (run: () => void) => {
    await act(async () => {
      run();
      jest.advanceTimersByTime(0);
    });
  };

  const Example = ({ open = true, onOpenChange = jest.fn() }) => (
    <>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverSurface as="div">
          <button>Inside</button>
          <iframe title="Inside frame" />
        </PopoverSurface>
      </Popover>
      <iframe title="Outside frame" />
      <button>Outside</button>
    </>
  );

  (['open', 'closed'] as const).forEach(mode => {
    it(`learns a pre-open trigger Portal root without installing closed observers (${mode})`, async () => {
      const host = document.createElement('div');
      document.body.append(host);
      const root = host.attachShadow({ mode });
      const mountNode = document.createElement('div');
      const sibling = document.createElement('button');
      root.append(mountNode, sibling);
      const add = jest.spyOn(root, 'addEventListener');
      const remove = jest.spyOn(root, 'removeEventListener');
      const change = jest.fn();
      const PortalExample = ({ open }: { open: boolean }) => (
        <TriggerPortalExample open={open} mountNode={mountNode} autoFocus interactive={false} onOpenChange={change} />
      );
      const result = render(<PortalExample open={false} />, { wrapper: React.StrictMode });
      const timeout = jest.spyOn(window, 'setTimeout');
      const interval = jest.spyOn(window, 'setInterval');
      try {
        act(() => mountNode.querySelector<HTMLButtonElement>('button')!.focus());
        expect(add.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(0);
        expect(timeout).not.toHaveBeenCalled();
        expect(interval).not.toHaveBeenCalled();
        result.rerender(<PortalExample open={false} />);
        result.rerender(<PortalExample open />);
        expect(add.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(1);
        await settle(() => sibling.focus());
        expect(change).toHaveBeenCalledTimes(1);
        expect(change).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: false }));
        result.rerender(<PortalExample open={false} />);
        await settle(() => undefined);
        expect(remove.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(1);
      } finally {
        result.unmount();
        host.remove();
      }
    });
  });

  it('does not arm dismissal from a cached trigger Portal target that is no longer focused', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = host.attachShadow({ mode: 'closed' });
    const mountNode = document.createElement('div');
    const sibling = document.createElement('button');
    root.append(mountNode, sibling);
    const change = jest.fn();
    const PortalExample = ({ open }: { open: boolean }) => (
      <TriggerPortalExample open={open} mountNode={mountNode} interactive={false} onOpenChange={change} />
    );
    const result = render(
      <>
        <PortalExample open={false} />
        <button>Outside</button>
      </>,
    );
    try {
      act(() => {
        mountNode.querySelector<HTMLButtonElement>('button')!.focus();
        sibling.focus();
      });
      result.rerender(
        <>
          <PortalExample open />
          <button>Outside</button>
        </>,
      );
      await settle(() => result.getByText('Outside').focus());
      expect(change).not.toHaveBeenCalled();
    } finally {
      result.unmount();
      host.remove();
    }
  });

  it('polls only during frame focus and stops when ordinary parent focus returns', async () => {
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const { getByText, getByTitle, unmount } = render(<Example />);
    await settle(() => getByText('Inside').focus());
    expect(interval).not.toHaveBeenCalled();
    await settle(() => getByTitle('Inside frame').focus());
    expect(interval).toHaveBeenCalledTimes(1);
    expect(interval).toHaveBeenCalledWith(expect.any(Function), 100);
    const id = interval.mock.results[0].value;
    await settle(() => getByText('Inside').focus());
    expect(clear).toHaveBeenCalledWith(id);
    unmount();
  });

  it('does not repeat a rejected close request and rearms after observed frame reentry', async () => {
    const change = jest.fn();
    const { getByText, getByTitle, unmount } = render(<Example onOpenChange={change} />);
    await settle(() => getByText('Inside').focus());
    await settle(() => getByTitle('Inside frame').focus());
    await settle(() => getByTitle('Outside frame').focus());
    expect(change).toHaveBeenCalledTimes(1);
    await settle(() => jest.advanceTimersByTime(500));
    expect(change).toHaveBeenCalledTimes(1);
    await settle(() => getByTitle('Inside frame').focus());
    await settle(() => getByTitle('Outside frame').focus());
    expect(change).toHaveBeenCalledTimes(2);
    unmount();
  });

  it('shares one sampler across nested frame documents', async () => {
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const { getByTitle, getByText, unmount } = render(<Example />);
    const frame = getByTitle('Inside frame') as HTMLIFrameElement;
    const child = frame.contentDocument!;
    const nested = child.createElement('iframe');
    child.body.append(nested);
    const button = nested.contentDocument!.createElement('button');
    nested.contentDocument!.body.append(button);
    const childInterval = jest.spyOn(child.defaultView!, 'setInterval');
    await settle(() => frame.focus());
    await settle(() => button.focus());
    expect(interval).toHaveBeenCalledTimes(1);
    expect(childInterval).not.toHaveBeenCalled();
    await settle(() => getByText('Outside').focus());
    expect(clear).toHaveBeenCalledWith(interval.mock.results[0].value);
    unmount();
  });

  it('cleans up pending frame checks and intervals on close and unmount', async () => {
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const change = jest.fn();
    const { getByTitle, rerender, unmount } = render(<Example onOpenChange={change} />);
    await settle(() => getByTitle('Inside frame').focus());
    const id = interval.mock.results[0].value;
    fireEvent(window, new Event('blur'));
    rerender(<Example open={false} onOpenChange={change} />);
    expect(clear).toHaveBeenCalledWith(id);
    unmount();
    await settle(() => jest.advanceTimersByTime(500));
    expect(change).not.toHaveBeenCalled();
  });

  it('ignores genuine window blur and resumes frame observation on window focus', async () => {
    const hasFocus = jest.spyOn(document, 'hasFocus').mockReturnValue(true);
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const change = jest.fn();
    const { getByTitle, unmount } = render(<Example onOpenChange={change} />);
    await settle(() => getByTitle('Inside frame').focus());
    const id = interval.mock.results[0].value;
    hasFocus.mockReturnValue(false);
    await settle(() => fireEvent(window, new Event('blur')));
    expect(clear).toHaveBeenCalledWith(id);
    expect(change).not.toHaveBeenCalled();
    hasFocus.mockReturnValue(true);
    await settle(() => fireEvent(window, new Event('focus')));
    expect(interval).toHaveBeenCalledTimes(2);
    expect(change).not.toHaveBeenCalled();
    unmount();
  });

  it('does not reattach observers when an older React capture continues after synchronous unmount', async () => {
    const add = jest.spyOn(document, 'addEventListener');
    const remove = jest.spyOn(document, 'removeEventListener');
    const lifecycle: { unmount?: () => void } = {};
    const result = render(
      <div
        onFocusCapture={() => {
          if (lifecycle.unmount) {
            flushSync(lifecycle.unmount);
          }
        }}
      >
        <Popover defaultOpen>
          <PopoverSurface as="div">
            <button>Inside</button>
          </PopoverSurface>
        </Popover>
      </div>,
    );
    lifecycle.unmount = result.unmount;
    const initialObservers = add.mock.calls.filter(call => call[0] === 'fuiframefocus').length;
    expect(initialObservers).toBeGreaterThan(0);
    await settle(() => {
      const inside = result.getByText('Inside');
      inside.blur();
      inside.focus();
    });
    expect(result.queryByText('Inside')).toBeNull();
    expect(add.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(initialObservers);
    expect(remove.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(initialObservers);
  });
});
