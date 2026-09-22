import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Menu } from './Menu';
import { MenuDivider } from '../MenuDivider/MenuDivider';
import { MenuGroup } from '../MenuGroup/MenuGroup';
import { MenuGroupHeader } from '../MenuGroupHeader/MenuGroupHeader';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuItemCheckbox } from '../MenuItemCheckbox/MenuItemCheckbox';
import { MenuItemLink } from '../MenuItemLink/MenuItemLink';
import { MenuItemRadio } from '../MenuItemRadio/MenuItemRadio';
import { MenuItemSwitch } from '../MenuItemSwitch/MenuItemSwitch';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuSplitGroup } from '../MenuSplitGroup/MenuSplitGroup';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';

const MenuListWrapper = ({ children }: React.PropsWithChildren): React.ReactElement => <MenuList>{children}</MenuList>;

describe('Menu compound components', () => {
  const components = [
    [MenuList, 'MenuList', {}],
    [MenuItem, 'MenuItem', { children: 'Item' }],
    [MenuItemCheckbox, 'MenuItemCheckbox', { children: 'Checkbox', name: 'selection', value: 'checkbox' }],
    [MenuItemLink, 'MenuItemLink', { children: 'Link', href: '#' }],
    [MenuItemRadio, 'MenuItemRadio', { children: 'Radio', name: 'selection', value: 'radio' }],
    [MenuItemSwitch, 'MenuItemSwitch', { children: 'Switch', name: 'selection', value: 'switch' }],
    [MenuDivider, 'MenuDivider', {}],
    [MenuPopover, 'MenuPopover', {}],
    [MenuGroup, 'MenuGroup', {}],
    [MenuGroupHeader, 'MenuGroupHeader', { children: 'Group' }],
    [MenuSplitGroup, 'MenuSplitGroup', {}],
  ] as const;

  for (const [Component, displayName, requiredProps] of components) {
    const isMenuItem = displayName.startsWith('MenuItem');
    const itemRole =
      displayName === 'MenuItemRadio'
        ? 'menuitemradio'
        : displayName === 'MenuItemCheckbox' || displayName === 'MenuItemSwitch'
        ? 'menuitemcheckbox'
        : 'menuitem';
    isConformant({
      Component: Component as React.ComponentType<typeof requiredProps>,
      displayName,
      componentPath: require.resolve(`../${displayName}/${displayName}`),
      disableTypeTests: true,
      disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
      requiredProps,
      renderOptions: isMenuItem ? { wrapper: MenuListWrapper } : undefined,
      getTargetElement: isMenuItem ? result => result.getByRole(itemRole) : undefined,
    });
  }

  isConformant({
    Component: Menu,
    displayName: 'Menu',
    componentPath: require.resolve('./Menu'),
    disableTypeTests: true,
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
    ],
    requiredProps: {
      children: (
        <MenuTrigger disableButtonEnhancement>
          <button>Open menu</button>
        </MenuTrigger>
      ),
    },
  });

  isConformant({
    Component: MenuTrigger,
    displayName: 'MenuTrigger',
    componentPath: require.resolve('../MenuTrigger/MenuTrigger'),
    disableTypeTests: true,
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
      'has-top-level-file-extra',
    ],
    requiredProps: {
      disableButtonEnhancement: true,
      children: <button>Open menu</button>,
    },
    renderOptions: {
      wrapper: ({ children }) => <Menu>{children as React.ReactElement}</Menu>,
    },
    getTargetElement: result => result.getByRole('button'),
  });

  it('styles the menu surface and item slots with stable class names', () => {
    const { getByRole, getByText } = render(
      <MenuPopover>
        <MenuList>
          <MenuItem icon={<span>Icon</span>} secondaryContent="Ctrl+S">
            Save
          </MenuItem>
        </MenuList>
      </MenuPopover>,
    );

    expect(getByRole('menu')).toHaveClass('fui-MenuList');
    expect(getByRole('menuitem')).toHaveClass('fui-MenuItem');
    expect(getByText('Icon').parentElement).toHaveClass('fui-MenuItem__icon');
    expect(getByText('Ctrl+S')).toHaveClass('fui-MenuItem__secondaryContent');
  });

  it('maps checked values to selectable item visual states', () => {
    const { container } = render(
      <MenuList checkedValues={{ selection: ['checkbox', 'radio', 'switch'] }}>
        <MenuItemCheckbox name="selection" value="checkbox">
          Checkbox
        </MenuItemCheckbox>
        <MenuItemRadio name="selection" value="radio">
          Radio
        </MenuItemRadio>
        <MenuItemSwitch name="selection" value="switch">
          Switch
        </MenuItemSwitch>
      </MenuList>,
    );

    for (const item of Array.from(container.querySelectorAll('[role^="menuitem"]'))) {
      expect(item).toHaveAttribute('data-checked');
    }
  });

  it('marks a split group when its primary item is multiline', () => {
    const { getByRole } = render(
      <MenuSplitGroup>
        <MenuItem subText="Description">Primary</MenuItem>
        <MenuItem aria-label="More" hasSubmenu />
      </MenuSplitGroup>,
    );

    expect(getByRole('group')).toHaveAttribute('data-multiline');
  });
});
