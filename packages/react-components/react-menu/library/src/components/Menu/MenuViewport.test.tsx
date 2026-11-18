import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { createPortal } from 'react-dom';
import { useMenuViewport } from './useMenuViewport';

describe('Menu viewport ownership', () => {
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
  let reveals: Element[];
  let frames: Map<number, FrameRequestCallback>;
  beforeEach(() => {
    reveals = [];
    frames = new Map();
    let nextFrame = 0;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: jest.fn(function (this: Element) {
        reveals.push(this);
      }),
    });
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    if (descriptor) {
      Object.defineProperty(Element.prototype, 'scrollIntoView', descriptor);
    } else {
      Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
    }
  });
  const flush = () =>
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(0));
    });
  const Example = () => {
    const empty = React.useRef<HTMLElement | null>(null);
    const ref = useMenuViewport(true, empty, empty);
    return (
      <div ref={ref} className="fui-MenuPopover" data-testid="surface">
        <button data-testid="item">Action</button>
      </div>
    );
  };
  for (const mode of ['document', 'open', 'closed'] as const) {
    it(`uses focus in the surface's ${mode} root`, () => {
      const host = render(<div />).container.firstElementChild!;
      const root = mode === 'document' ? host : host.attachShadow({ mode });
      render(createPortal(<Example />, root));
      const item = root.querySelector<HTMLElement>('[data-testid="item"]')!;
      item.focus();
      flush();
      expect(reveals).toEqual([item]);
      expect((mode === 'document' ? host.ownerDocument : (root as ShadowRoot)).activeElement).toBe(item);
    });
  }
  it.each(['fui-MenuPopover', 'fui-PopoverSurface', 'native'])('does not claim nested %s focus', layer => {
    const view = render(<Example />);
    const surface = view.getByTestId('surface');
    const host = surface.ownerDocument.createElement('div');
    surface.append(host);
    const root = host.attachShadow({ mode: 'open' });
    const popup = surface.ownerDocument.createElement('div');
    if (layer === 'native') {
      popup.setAttribute('popover', 'manual');
    } else {
      popup.className = layer;
    }
    const item = surface.ownerDocument.createElement('button');
    popup.append(item);
    root.append(popup);
    item.focus();
    flush();
    expect(reveals).toEqual([]);
    expect(root.activeElement).toBe(item);
  });
});
