import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuPopover,
} from '@fluentui/react-components';
import { CutRegular, CutFilled, bundleIcon } from '@fluentui/react-icons';

const CutIcon = bundleIcon(CutFilled, CutRegular);

export const AligningWithSelectableItems = (): JSXElement => (
  <Menu hasIcons hasCheckmarks>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Checkbox item
        </MenuItemCheckbox>
        <MenuItem>Menu item</MenuItem>
        <MenuItem>Menu item</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

AligningWithSelectableItems.parameters = {
  docs: {
    description: {
      story: ['The `hasCheckmarks` prop will align menu items if only a subset of menu items are selectable.'].join(
        '\n',
      ),
    },
  },
};
