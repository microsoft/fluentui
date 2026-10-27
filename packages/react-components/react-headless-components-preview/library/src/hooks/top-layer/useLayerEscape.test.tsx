import * as React from 'react';
import { createPortal } from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import { useLayerEscape } from './useLayerEscape';
import type { UseLayerEscapeOptions } from './types';

type ExampleProps = Partial<UseLayerEscapeOptions> & {
  popover?: 'auto' | 'manual';
  onEscape: jest.Mock;
};

const Example = ({ open = true, popover = 'manual', onEscape, when, listen }: ExampleProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { onKeyDown } = useLayerEscape(ref, { open, onEscape, when, listen });
  return (
    <>
      <button>Outside</button>
      <div ref={ref} popover={popover} onKeyDown={onKeyDown} data-testid="layer">
        <button>Inside</button>
        <div popover="manual">
          <button>Nested</button>
        </div>
        {createPortal(<button>Portaled</button>, document.body)}
      </div>
    </>
  );
};

describe('useLayerEscape', () => {
  it('handles Escape on a manual layer and stops it', () => {
    const onEscape = jest.fn();
    const onOuterKeyDown = jest.fn();
    const { getByText } = render(
      <div onKeyDown={onOuterKeyDown}>
        <Example onEscape={onEscape} />
      </div>,
    );

    const notCancelled = fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });

    expect(onEscape).toHaveBeenCalledTimes(1);
    expect(notCancelled).toBe(false);
    expect(onOuterKeyDown).not.toHaveBeenCalled();
  });

  it('reports Escape before preventing it, so onEscape can tell a veto apart', () => {
    const onEscape = jest.fn((event: KeyboardEvent | React.KeyboardEvent) => event.defaultPrevented);
    const { getByText } = render(<Example onEscape={onEscape} />);

    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });

    expect(onEscape).toHaveReturnedWith(false);
  });

  it('ignores other keys and closed layers', () => {
    const onEscape = jest.fn();
    const { getByText, rerender } = render(<Example onEscape={onEscape} />);

    fireEvent.keyDown(getByText('Inside'), { key: 'Enter' });
    rerender(<Example onEscape={onEscape} open={false} />);
    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });

    expect(onEscape).not.toHaveBeenCalled();
  });

  it("leaves Escape to the browser on an auto popover, unless when is 'always'", () => {
    const onEscape = jest.fn();
    const { getByText, rerender } = render(<Example onEscape={onEscape} popover="auto" />);

    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });
    expect(onEscape).not.toHaveBeenCalled();

    rerender(<Example onEscape={onEscape} popover="auto" when="always" />);
    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('leaves Escape from a nested layer to that layer', () => {
    const onEscape = jest.fn();
    const { getByText } = render(<Example onEscape={onEscape} />);

    fireEvent.keyDown(getByText('Nested'), { key: 'Escape' });

    expect(onEscape).not.toHaveBeenCalled();
  });

  it('handles Escape from content portaled out of the layer', () => {
    const onEscape = jest.fn();
    const { getByText } = render(<Example onEscape={onEscape} />);

    fireEvent.keyDown(getByText('Portaled'), { key: 'Escape' });

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('ignores Escape that was already prevented', () => {
    const onEscape = jest.fn();
    const { getByText } = render(<Example onEscape={onEscape} />);
    const inside = getByText('Inside');
    inside.addEventListener('keydown', event => event.preventDefault());

    fireEvent.keyDown(inside, { key: 'Escape' });

    expect(onEscape).not.toHaveBeenCalled();
  });

  it("listens on the document while open with listen: 'document'", () => {
    const onEscape = jest.fn();
    const { getByText, rerender } = render(<Example onEscape={onEscape} listen="document" />);

    fireEvent.keyDown(getByText('Outside'), { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);

    rerender(<Example onEscape={onEscape} listen="document" open={false} />);
    fireEvent.keyDown(getByText('Outside'), { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("only lets the newest open layer with listen: 'document' handle Escape", () => {
    const onFirst = jest.fn();
    const onSecond = jest.fn();
    const { getAllByText, rerender } = render(
      <>
        <Example onEscape={onFirst} listen="document" />
        <Example onEscape={onSecond} listen="document" open={false} />
      </>,
    );
    rerender(
      <>
        <Example onEscape={onFirst} listen="document" />
        <Example onEscape={onSecond} listen="document" />
      </>,
    );

    fireEvent.keyDown(getAllByText('Outside')[0], { key: 'Escape' });
    expect(onSecond).toHaveBeenCalledTimes(1);
    expect(onFirst).not.toHaveBeenCalled();

    rerender(
      <>
        <Example onEscape={onFirst} listen="document" />
        <Example onEscape={onSecond} listen="document" open={false} />
      </>,
    );
    fireEvent.keyDown(getAllByText('Outside')[0], { key: 'Escape' });
    expect(onFirst).toHaveBeenCalledTimes(1);
  });

  it("handles Escape for an element that mounts after open with listen: 'document'", () => {
    const onEscape = jest.fn();
    const LateLayer = ({ mounted }: { mounted: boolean }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      useLayerEscape(ref, { open: true, onEscape, listen: 'document' });
      return mounted ? <div ref={ref} popover="manual" /> : null;
    };
    const { rerender } = render(<LateLayer mounted={false} />);
    rerender(<LateLayer mounted />);

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('leaves Escape from a layer inside a shadow root to that layer', () => {
    const onEscape = jest.fn();
    const ShadowExample = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const { onKeyDown } = useLayerEscape(ref, { open: true, onEscape });
      const hostRef = React.useCallback((host: HTMLDivElement | null) => {
        if (host && !host.shadowRoot) {
          host.attachShadow({ mode: 'open' }).innerHTML = '<div popover="manual"><button>In shadow</button></div>';
        }
      }, []);
      return (
        <div ref={ref} popover="manual" onKeyDown={onKeyDown}>
          <div ref={hostRef} data-testid="host" />
        </div>
      );
    };
    const { getByTestId } = render(<ShadowExample />);
    const button = getByTestId('host').shadowRoot!.querySelector('button')!;

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));

    expect(onEscape).not.toHaveBeenCalled();
  });
});
