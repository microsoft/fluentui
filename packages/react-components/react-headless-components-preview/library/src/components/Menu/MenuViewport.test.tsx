import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { createPortal } from 'react-dom';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from './';

describe('Menu viewport ownership', () => {
  let frames: Map<number, FrameRequestCallback>;
  let reveals: Element[];
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
  beforeEach(() => {
    frames = new Map();
    reveals = [];
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
  const Example = () => (
    <Menu open>
      <MenuTrigger>
        <button>Actions</button>
      </MenuTrigger>
      <MenuPopover data-testid="surface">
        <MenuList>
          <MenuItem data-testid="item">Action</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
  for (const mode of ['document', 'open', 'closed'] as const) {
    it(`reveals current focus inside a ${mode} root without moving it`, () => {
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
  it.each([false, true])('checks shadow popup ownership before revealing a host (nested popover: %s)', nested => {
    const view = render(<Example />);
    const surface = view.getByTestId('surface');
    const host = surface.ownerDocument.createElement('div');
    surface.append(host);
    const root = host.attachShadow({ mode: 'open' });
    const content = surface.ownerDocument.createElement('div');
    if (nested) {
      content.setAttribute('popover', 'manual');
    }
    const item = surface.ownerDocument.createElement('button');
    content.append(item);
    root.append(content);
    item.focus();
    flush();
    expect(reveals).toEqual(nested ? [] : [host]);
    expect(root.activeElement).toBe(item);
  });
  it('excludes focus in a different popover in the same root', () => {
    const view = render(<Example />);
    const popup = view.getByTestId('surface').ownerDocument.createElement('div');
    popup.setAttribute('popover', 'manual');
    const item = popup.ownerDocument.createElement('button');
    popup.append(item);
    view.getByTestId('surface').append(popup);
    item.focus();
    flush();
    expect(reveals).toEqual([]);
  });
});
