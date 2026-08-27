import * as React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { OpenFilled, OpenRegular } from '@fluentui/react-icons/headless/svg/open';

import styles from '../compare.module.css';

const Open = bundleIcon(OpenFilled, OpenRegular);

export const ItemLinks = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <Menu>
        <MenuTrigger>
          <Button>Help</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList hasIcons>
            <MenuItemLink href="https://react.fluentui.dev" icon={<Open />}>
              Documentation
            </MenuItemLink>
            <MenuItemLink href="https://github.com/microsoft/fluentui" icon={<Open />}>
              Source
            </MenuItemLink>
            <MenuItemLink href="https://react.fluentui.dev" icon={<Open />} disabled>
              Release notes
            </MenuItemLink>
            <MenuDivider />
            <MenuItem>About</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  </FluentProvider>
);
