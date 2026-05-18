import * as React from 'react';
import { render } from '@testing-library/react';
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
import { MenuDivider } from './MenuDivider/MenuDivider';
import { MenuGroup } from './MenuGroup/MenuGroup';
import { MenuGroupHeader } from './MenuGroupHeader/MenuGroupHeader';

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
    expect(trigger).not.toHaveAttribute('data-open');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('data-open', '');
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

  // Arrow navigation is handled by Tabster (useArrowNavigationGroup).
  // Tabster's behavior is comprehensively tested in @fluentui/react-tabster.
  // E2E and integration tests should verify arrow navigation works correctly in the browser.

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
