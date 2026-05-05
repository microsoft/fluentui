import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger/MenuTrigger';
import { MenuPopover } from './MenuPopover/MenuPopover';
import { MenuList } from './MenuList/MenuList';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuDivider } from './MenuDivider/MenuDivider';

describe('Menu', () => {
  it('renders trigger and surface children when open', () => {
    const { getByText } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(getByText('Trigger')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('opens on trigger click (uncontrolled)', () => {
    const { getByText, queryByText } = render(
      <Menu>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(queryByText('Item 1')).not.toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(getByText('Item 1')).toBeInTheDocument();
  });

  it('closes on trigger click when open', () => {
    const { getByText, queryByText } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(getByText('Item 1')).toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('fires onOpenChange callback', () => {
    const onOpenChange = jest.fn();

    const { getByText } = render(
      <Menu onOpenChange={onOpenChange}>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    userEvent.click(getByText('Trigger'));

    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('supports controlled open state', () => {
    const { getByText, queryByText, rerender } = render(
      <Menu open={false}>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(queryByText('Item 1')).not.toBeInTheDocument();

    rerender(
      <Menu open={true}>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(getByText('Item 1')).toBeInTheDocument();
  });

  it('sets aria-haspopup="menu" and aria-expanded on trigger', () => {
    const { getByText } = render(
      <Menu>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const trigger = getByText('Trigger');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).not.toHaveAttribute('aria-expanded');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets role="menu" on MenuList and links aria-labelledby to trigger id', () => {
    const { getByText, getByRole } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const list = getByRole('menu');
    const trigger = getByText('Trigger');

    expect(list).toHaveAttribute('aria-labelledby', trigger.getAttribute('id') ?? '');
  });

  it('sets role="menuitem" on MenuItem', () => {
    const { getAllByRole } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(getAllByRole('menuitem')).toHaveLength(2);
  });

  it('renders MenuDivider with role="presentation" and aria-hidden', () => {
    const { container } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuDivider data-testid="divider" />
            <MenuItem>Item 2</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const divider = container.querySelector('[data-testid="divider"]')!;
    expect(divider).toHaveAttribute('role', 'presentation');
    expect(divider).toHaveAttribute('aria-hidden', 'true');
  });

  it('closes the menu when a MenuItem is clicked', () => {
    const { getByText, queryByText } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    userEvent.click(getByText('Item 1'));
    expect(queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('keeps the menu open when persistOnItemClick is set', () => {
    const { getByText } = render(
      <Menu defaultOpen persistOnItemClick>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    userEvent.click(getByText('Item 1'));
    expect(getByText('Item 1')).toBeInTheDocument();
  });

  it('renders MenuPopover without a Portal (inline)', () => {
    const { container, getByRole } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // The popover surface should be a descendant of the test container, not in document.body via a Portal.
    expect(container.contains(getByRole('menu'))).toBe(true);
  });
});
