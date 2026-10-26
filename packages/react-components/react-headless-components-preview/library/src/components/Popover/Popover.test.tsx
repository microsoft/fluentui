import * as React from 'react';
import { createPortal } from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { usePopover } from './usePopover';

describe('Popover', () => {
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

  it('sets aria-controls on trigger only while open', () => {
    const { getByText, getByRole } = render(
      <Popover id="my-id">
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    const trigger = getByText('Trigger');
    expect(trigger).not.toHaveAttribute('aria-controls');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-controls', 'my-id');
    expect(getByRole('group', { hidden: true })).toHaveAttribute('id', 'my-id');
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
