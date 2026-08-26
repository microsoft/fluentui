import * as React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <Menu>
        <MenuTrigger>
          <Button>Open menu</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList hasIcons>
            <MenuItem icon={<CalendarMonth />}>New</MenuItem>
            <MenuItem icon={<CalendarMonth />} secondaryContent="Ctrl+O">
              Open
            </MenuItem>
            <MenuItem icon={<CalendarMonth />} subText="Save a copy alongside the original">
              Save as
            </MenuItem>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Danger zone</MenuGroupHeader>
              <MenuItem icon={<CalendarMonth />} disabled>
                Delete
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  </FluentProvider>
);
