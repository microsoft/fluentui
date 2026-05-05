import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger/MenuTrigger';
import { MenuPopover } from './MenuPopover/MenuPopover';
import { MenuList } from './MenuList/MenuList';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuItemCheckbox } from './MenuItemCheckbox/MenuItemCheckbox';
import { MenuItemRadio } from './MenuItemRadio/MenuItemRadio';
import { MenuItemLink } from './MenuItemLink/MenuItemLink';
import { MenuItemSwitch } from './MenuItemSwitch/MenuItemSwitch';
import { MenuGroup } from './MenuGroup/MenuGroup';
import { MenuGroupHeader } from './MenuGroupHeader/MenuGroupHeader';

describe('Menu variants', () => {
  describe('arrow-key navigation in MenuList', () => {
    const renderMenu = () =>
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Apple</MenuItem>
              <MenuItem>Banana</MenuItem>
              <MenuItem>Cherry</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

    it('ArrowDown moves focus across MenuItems', () => {
      const { getAllByRole } = renderMenu();
      const [apple, banana] = getAllByRole('menuitem');
      act(() => apple.focus());
      fireEvent.keyDown(apple, { key: 'ArrowDown' });
      expect(apple.ownerDocument.activeElement).toBe(banana);
    });

    it('ArrowUp wraps to the last item from the first', () => {
      const { getAllByRole } = renderMenu();
      const items = getAllByRole('menuitem');
      const [apple] = items;
      const cherry = items[items.length - 1];
      act(() => apple.focus());
      fireEvent.keyDown(apple, { key: 'ArrowUp' });
      expect(apple.ownerDocument.activeElement).toBe(cherry);
    });

    it('Home jumps to first item', () => {
      const { getAllByRole } = renderMenu();
      const items = getAllByRole('menuitem');
      const apple = items[0];
      const cherry = items[items.length - 1];
      act(() => cherry.focus());
      fireEvent.keyDown(cherry, { key: 'Home' });
      expect(cherry.ownerDocument.activeElement).toBe(apple);
    });

    it('stamps focusgroup attribute on MenuList root for forward-compat', () => {
      const { getByRole } = renderMenu();
      expect(getByRole('menu')).toHaveAttribute('focusgroup', 'block wrap');
    });
  });

  describe('MenuItemCheckbox', () => {
    it('renders role="menuitemcheckbox"', () => {
      const { getByRole } = render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemCheckbox name="filters" value="bold">
                Bold
              </MenuItemCheckbox>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      expect(getByRole('menuitemcheckbox')).toBeInTheDocument();
    });

    it('toggles aria-checked on click via controlled checkedValues', () => {
      const onCheckedValueChange = jest.fn();
      const { getByRole, rerender } = render(
        <Menu defaultOpen persistOnItemClick>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList checkedValues={{}} onCheckedValueChange={onCheckedValueChange}>
              <MenuItemCheckbox name="filters" value="bold">
                Bold
              </MenuItemCheckbox>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      const item = getByRole('menuitemcheckbox');
      expect(item).toHaveAttribute('aria-checked', 'false');

      userEvent.click(item);
      expect(onCheckedValueChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ name: 'filters', checkedItems: ['bold'] }),
      );

      rerender(
        <Menu defaultOpen persistOnItemClick>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList checkedValues={{ filters: ['bold'] }} onCheckedValueChange={onCheckedValueChange}>
              <MenuItemCheckbox name="filters" value="bold">
                Bold
              </MenuItemCheckbox>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      expect(getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('MenuItemRadio', () => {
    it('renders role="menuitemradio"', () => {
      const { getAllByRole } = render(
        <Menu defaultOpen defaultCheckedValues={{ sortBy: ['name'] }}>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio name="sortBy" value="name">
                Name
              </MenuItemRadio>
              <MenuItemRadio name="sortBy" value="size">
                Size
              </MenuItemRadio>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      expect(getAllByRole('menuitemradio')).toHaveLength(2);
    });

    it('enforces single-select per group', () => {
      const { getAllByRole } = render(
        <Menu defaultOpen persistOnItemClick defaultCheckedValues={{ sortBy: ['name'] }}>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio name="sortBy" value="name">
                Name
              </MenuItemRadio>
              <MenuItemRadio name="sortBy" value="size">
                Size
              </MenuItemRadio>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      const [name, size] = getAllByRole('menuitemradio');
      expect(name).toHaveAttribute('aria-checked', 'true');
      expect(size).toHaveAttribute('aria-checked', 'false');

      userEvent.click(size);

      const [nameAfter, sizeAfter] = getAllByRole('menuitemradio');
      expect(nameAfter).toHaveAttribute('aria-checked', 'false');
      expect(sizeAfter).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('MenuItemLink', () => {
    it('renders an <a> element with role="menuitem" and href', () => {
      const { getByRole } = render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemLink href="https://example.com">Docs</MenuItemLink>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      const link = getByRole('menuitem');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('MenuItemSwitch', () => {
    it('renders an item with switchIndicator slot', () => {
      const { getByText, container } = render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemSwitch name="view" value="grid" switchIndicator={<span data-testid="switch" />}>
                Grid view
              </MenuItemSwitch>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      expect(getByText('Grid view')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="switch"]')).toBeInTheDocument();
    });
  });

  describe('MenuGroup + MenuGroupHeader', () => {
    it('renders header inside group with a generated id', () => {
      const { getByText } = render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button>Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuGroupHeader>Document</MenuGroupHeader>
                <MenuItem>Page</MenuItem>
              </MenuGroup>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      const header = getByText('Document');
      expect(header).toBeInTheDocument();
      expect(header.getAttribute('id')).toBeTruthy();
    });
  });
});
