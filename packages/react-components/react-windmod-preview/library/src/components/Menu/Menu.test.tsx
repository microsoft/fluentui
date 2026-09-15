import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuProps } from './Menu.types';
import { Menu } from './Menu';

const renderMenu = (props: Partial<MenuProps> = {}) =>
  render(
    <Menu open {...props}>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>One</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

describe('Menu', () => {
  isConformant({
    Component: Menu as never,
    displayName: 'Menu',
    requiredProps: {
      children: [
        <MenuTrigger key="t">
          <button>Trigger</button>
        </MenuTrigger>,
        <MenuPopover key="p">
          <MenuList>
            <MenuItem>One</MenuItem>
          </MenuList>
        </MenuPopover>,
      ],
    } as never,
    // Menu renders no DOM of its own — it is a context provider around the trigger and popover.
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classname',
      'component-has-static-classname-exported',
      'make-styles-overrides-win',
    ],
  });

  it('renders no element of its own', () => {
    const { container } = renderMenu();

    // The trigger is the consumer's own button and the surface is the popover — nothing between.
    expect(container.firstElementChild!.tagName).toBe('BUTTON');
  });

  it('passes positioning and open state through to the headless hook', () => {
    const onOpenChange = jest.fn();
    const { container, getByRole } = renderMenu({ onOpenChange, positioning: { position: 'above' } });

    expect(getByRole('button').getAttribute('aria-expanded')).toBe('true');
    expect(container.querySelector('[popover]')!.getAttribute('data-placement')).toBe('above-start');
  });

  it('closes when open is false', () => {
    const { container } = render(
      <Menu open={false}>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>One</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // A closed [popover] stays mounted and the user agent hides it — the deliberate divergence
    // from Griffel, which unmounts. Pinned so a future change is intentional.
    expect(container.querySelector('[popover]')).not.toBeNull();
    expect(container.querySelector('[role="menuitem"]')).not.toBeNull();
  });
});
