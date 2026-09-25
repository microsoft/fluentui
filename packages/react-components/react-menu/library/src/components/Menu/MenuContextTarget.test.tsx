import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import type { PositioningImperativeRef, PositioningVirtualElement } from '@fluentui/react-positioning';
import { Menu } from './Menu';
import { MenuTrigger } from '../MenuTrigger/index';
import { MenuList } from '../MenuList/index';
import { MenuItem } from '../MenuItem/index';
import { MenuPopover } from '../MenuPopover/index';

// The internal position manager is mocked at its resolved source path so that the effective
// positioning target can be asserted in jsdom. usePositioning imports './createPositionManager'
// relatively, which resolves to the same module registry entry as this deep relative path.
import { createPositionManager } from '../../../../../react-positioning/library/src/createPositionManager';

jest.mock('../../../../../react-positioning/library/src/createPositionManager', () => ({
  createPositionManager: jest.fn(() => ({ updatePosition: jest.fn(), dispose: jest.fn() })),
}));

const lastTarget = () => {
  const calls = (createPositionManager as jest.Mock).mock.calls;
  return calls[calls.length - 1][0].target;
};

describe('Menu openOnContext positioning target', () => {
  // Regression test for https://github.com/microsoft/fluentui/issues/31727
  it('does not clobber an imperative positioningRef.setTarget() called from onOpenChange', () => {
    const anchor = document.createElement('div');
    document.body.appendChild(anchor);
    const positioningRef = React.createRef<PositioningImperativeRef>();

    const { getByRole } = render(
      <Menu
        openOnContext
        positioning={{ positioningRef }}
        onOpenChange={(e, data) => {
          if (data.open) {
            positioningRef.current?.setTarget(anchor);
          }
        }}
      >
        <MenuTrigger disableButtonEnhancement>
          <button>trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    fireEvent.contextMenu(getByRole('button'), { clientX: 42, clientY: 24 });

    expect(lastTarget()).toBe(anchor);

    anchor.remove();
  });

  it('anchors to the mouse position on right click by default', () => {
    const { getByRole } = render(
      <Menu openOnContext>
        <MenuTrigger disableButtonEnhancement>
          <button>trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    fireEvent.contextMenu(getByRole('button'), { clientX: 42, clientY: 24 });

    const target = lastTarget() as PositioningVirtualElement;
    expect(target.getBoundingClientRect().x).toBe(42);
    expect(target.getBoundingClientRect().y).toBe(24);
  });

  it('restores the trigger as positioning target when the context menu closes', () => {
    const { getByRole } = render(
      <Menu openOnContext>
        <MenuTrigger disableButtonEnhancement>
          <button>trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const trigger = getByRole('button');
    fireEvent.contextMenu(trigger, { clientX: 42, clientY: 24 });
    fireEvent.click(getByRole('menuitem'));

    expect(lastTarget()).toBe(trigger);
  });
});
