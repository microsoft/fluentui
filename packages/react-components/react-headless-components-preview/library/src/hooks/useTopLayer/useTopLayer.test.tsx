import * as React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { useTopLayer } from './useTopLayer';
import type { UseTopLayerOptions } from './useTopLayer';
import { getTopLayerTriggerProps } from './getTopLayerTriggerProps';
import { isPopoverOpen } from '../../utils/topLayer';

type TestLayerProps = Partial<UseTopLayerOptions> & { children?: React.ReactNode; onPhase?: (phase: string) => void };

const TestLayer = ({ open = false, mode = 'auto', children, onPhase, ...options }: TestLayerProps) => {
  const ref = React.useRef<HTMLDivElement & HTMLDialogElement>(null);
  const { shouldRender, popover, phase } = useTopLayer(ref, { open, mode, ...options });
  onPhase?.(phase);

  if (!shouldRender) {
    return null;
  }

  const Element = mode === 'modal' ? 'dialog' : 'div';
  return (
    <Element ref={ref} popover={popover} role={options.role} data-testid="layer" data-open={open ? '' : undefined}>
      {children}
    </Element>
  );
};

/**
 * Dispatches Escape through the document capture phase without reaching the popover polyfill's document listener,
 * which throws in jsdom.
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

  it('settles to the open phase when nothing animates', () => {
    const phases: string[] = [];
    render(<TestLayer open onPhase={phase => phases.push(phase)} />);

    expect(phases[0]).toBe('entering');
    expect(phases[phases.length - 1]).toBe('open');
  });

  it('hides and unmounts when open becomes false', () => {
    const { container, rerender } = render(<TestLayer open />);
    rerender(<TestLayer open={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('keeps the element mounted and inert when unmountOnClose is false', async () => {
    const { getByTestId, rerender } = render(<TestLayer open unmountOnClose={false} />);
    rerender(<TestLayer open={false} unmountOnClose={false} />);
    const layer = getByTestId('layer');

    expect(isPopoverOpen(layer)).toBe(false);
    await waitFor(() => expect(layer).toHaveAttribute('inert'));
    expect(layer).toHaveAttribute('aria-hidden', 'true');

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

  it('warns once about a native open without onOpen', async () => {
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
    expect(consoleWarn.mock.calls[0][0]).toContain('Pass `onOpen`');
    consoleWarn.mockRestore();
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
      getByTestId('layer').dispatchEvent(closeEvent);
    });

    expect(onClose).toHaveBeenCalledWith({ type: 'native-close', event: closeEvent });
  });

  it.each([
    ['menu', 'First'],
    ['dialog', 'First'],
  ])('moves focus into a popover with role="%s"', (role, expected) => {
    const { getByText } = render(
      <TestLayer open mode="auto" role={role}>
        <button disabled>Disabled</button>
        <button>First</button>
        <button>Second</button>
      </TestLayer>,
    );

    expect(getByText(expected)).toHaveFocus();
  });

  it('focuses the selected option of a listbox', () => {
    const { getByText } = render(
      <TestLayer open mode="auto" role="listbox">
        <div role="option" tabIndex={-1} aria-selected="false">
          One
        </div>
        <div role="option" tabIndex={-1} aria-selected="true">
          Two
        </div>
      </TestLayer>,
    );

    expect(getByText('Two')).toHaveFocus();
  });

  it('keeps focus on a combobox that controls the popup', () => {
    const Example = ({ open }: { open: boolean }) => (
      <>
        <input role="combobox" aria-controls="popup" aria-label="Search" />
        <div id="popup">
          <TestLayer open={open} mode="auto" role="listbox">
            <div role="option" tabIndex={-1}>
              One
            </div>
          </TestLayer>
        </div>
      </>
    );
    const { getByLabelText, rerender } = render(<Example open={false} />);
    const input = getByLabelText('Search');
    input.focus();
    rerender(<Example open />);

    expect(input).toHaveFocus();
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
});

describe('getTopLayerTriggerProps', () => {
  it('returns popup ARIA attributes and only references the layer while open', () => {
    expect(getTopLayerTriggerProps({ open: true, layerId: 'menu-1', role: 'menu' })).toEqual({
      'aria-haspopup': 'menu',
      'aria-expanded': true,
      'aria-controls': 'menu-1',
    });
    expect(getTopLayerTriggerProps({ open: false, layerId: 'menu-1', role: 'menu' })).toEqual({
      'aria-haspopup': 'menu',
      'aria-expanded': false,
      'aria-controls': undefined,
    });
  });

  it('maps alertdialog to aria-haspopup="dialog"', () => {
    expect(getTopLayerTriggerProps({ open: true, layerId: 'd', role: 'alertdialog' })['aria-haspopup']).toBe('dialog');
  });

  it('omits aria-haspopup for non-popup roles', () => {
    expect(getTopLayerTriggerProps({ open: true, layerId: 'g', role: 'group' })).toEqual({
      'aria-haspopup': undefined,
      'aria-expanded': true,
      'aria-controls': 'g',
    });
  });

  it('describes the trigger for tooltips', () => {
    expect(getTopLayerTriggerProps({ open: true, layerId: 'tip-1', role: 'tooltip' })).toEqual({
      'aria-describedby': 'tip-1',
    });
    expect(getTopLayerTriggerProps({ open: false, layerId: 'tip-1', role: 'tooltip' })).toEqual({
      'aria-describedby': undefined,
    });
  });
});
