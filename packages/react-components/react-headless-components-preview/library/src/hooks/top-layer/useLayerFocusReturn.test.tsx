import * as React from 'react';
import { act, render } from '@testing-library/react';
import { useLayerFocusReturn } from './useLayerFocusReturn';
import { useDialogLayerOpenState } from './useDialogLayerOpenState';
import type { TopLayerMode, UseLayerFocusReturnOptions } from './types';

type ExampleProps = UseLayerFocusReturnOptions & {
  open: boolean;
  mode?: TopLayerMode;
  withTarget?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Example = ({ open, mode = 'manual', withTarget, when, onOpenChange }: ExampleProps) => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const targetRef = React.useRef<HTMLButtonElement>(null);
  const focusReturn = useLayerFocusReturn(ref, { target: withTarget ? targetRef : undefined, when });
  const { popover } = useDialogLayerOpenState(ref, { open, mode, onOpenChange, ...focusReturn });
  return (
    <>
      <button>Trigger</button>
      <button ref={targetRef}>Target</button>
      <input aria-label="Elsewhere" />
      <dialog ref={ref} popover={popover} data-testid="layer">
        <button>Inside</button>
      </dialog>
    </>
  );
};

describe('useLayerFocusReturn', () => {
  it('returns focus to the element focused before opening when focus was inside', () => {
    const { getByText, rerender } = render(<Example open={false} />);
    getByText('Trigger').focus();
    rerender(<Example open />);
    getByText('Inside').focus();

    rerender(<Example open={false} />);

    expect(getByText('Trigger')).toHaveFocus();
  });

  it('returns focus to target when given', () => {
    const { getByText, rerender } = render(<Example open={false} withTarget />);
    getByText('Trigger').focus();
    rerender(<Example open withTarget />);
    getByText('Inside').focus();

    rerender(<Example open={false} withTarget />);

    expect(getByText('Target')).toHaveFocus();
  });

  it('does not steal focus the user moved outside', () => {
    const { getByText, getByLabelText, rerender } = render(<Example open={false} />);
    getByText('Trigger').focus();
    rerender(<Example open />);
    getByLabelText('Elsewhere').focus();

    rerender(<Example open={false} />);

    expect(getByLabelText('Elsewhere')).toHaveFocus();
  });

  it("returns focus wherever focus is with when: 'always'", () => {
    const { getByText, getByLabelText, rerender } = render(<Example open={false} when="always" />);
    getByText('Trigger').focus();
    rerender(<Example open when="always" />);
    getByLabelText('Elsewhere').focus();

    rerender(<Example open={false} when="always" />);

    expect(getByText('Trigger')).toHaveFocus();
  });

  it('never moves focus with when: false', () => {
    const { getByText, rerender } = render(<Example open={false} when={false} />);
    getByText('Trigger').focus();
    rerender(<Example open when={false} />);
    getByText('Inside').focus();

    rerender(<Example open={false} when={false} />);

    expect(getByText('Trigger')).not.toHaveFocus();
  });

  it('returns focus after a browser close', () => {
    const { getByText, getByTestId, rerender } = render(<Example open={false} onOpenChange={() => undefined} />);
    getByText('Trigger').focus();
    rerender(<Example open onOpenChange={() => undefined} />);
    getByText('Inside').focus();

    act(() => {
      (getByTestId('layer') as HTMLDialogElement).hidePopover();
      getByText('Inside').blur();
      getByTestId('layer').dispatchEvent(Object.assign(new Event('toggle'), { newState: 'closed' }));
    });

    expect(getByText('Trigger')).toHaveFocus();
  });

  it('returns focus once per close', () => {
    const { getByText, getByTestId, rerender } = render(<Example open={false} />);
    getByText('Trigger').focus();
    rerender(<Example open />);
    getByText('Inside').focus();
    rerender(<Example open={false} />);
    expect(getByText('Trigger')).toHaveFocus();

    getByText('Target').focus();
    act(() => {
      getByTestId('layer').dispatchEvent(Object.assign(new Event('toggle'), { newState: 'closed' }));
    });

    expect(getByText('Target')).toHaveFocus();
  });

  it('returns focus to the element focused before a browser open, not to the [autofocus] element inside', () => {
    const NativeOpen = () => {
      const [open, setOpen] = React.useState(false);
      return <Example open={open} onOpenChange={setOpen} />;
    };
    const { getByText, getByTestId } = render(<NativeOpen />);
    const layer = getByTestId('layer') as HTMLDialogElement;
    getByText('Trigger').focus();

    // A `popovertarget` invoker: the browser shows the layer and focuses its `[autofocus]` element before `toggle`.
    act(() => {
      layer.dispatchEvent(Object.assign(new Event('beforetoggle'), { newState: 'open' }));
      layer.showPopover();
      getByText('Inside').focus();
      layer.dispatchEvent(Object.assign(new Event('toggle'), { newState: 'open' }));
    });
    act(() => {
      layer.hidePopover();
      getByText('Inside').blur();
      layer.dispatchEvent(Object.assign(new Event('toggle'), { newState: 'closed' }));
    });

    expect(getByText('Trigger')).toHaveFocus();
  });

  it('returns focus to a control inside another shadow root, not to its host', () => {
    const host = document.createElement('div');
    document.body.append(host);
    const shadowTrigger = document.createElement('button');
    host.attachShadow({ mode: 'open' }).append(shadowTrigger);

    const { getByText, rerender } = render(<Example open={false} />);
    shadowTrigger.focus();
    rerender(<Example open />);
    getByText('Inside').focus();
    rerender(<Example open={false} />);

    expect(host.shadowRoot!.activeElement).toBe(shadowTrigger);
    host.remove();
  });
});
