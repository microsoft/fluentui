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
});
