import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview/menu';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  Menu as GriffelMenu,
  MenuDivider as GriffelMenuDivider,
  MenuGroup as GriffelMenuGroup,
  MenuGroupHeader as GriffelMenuGroupHeader,
  MenuItem as GriffelMenuItem,
  MenuList as GriffelMenuList,
  MenuPopover as GriffelMenuPopover,
  MenuTrigger as GriffelMenuTrigger,
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import {
  bundleIcon as griffelBundleIcon,
  CalendarMonthFilled as GriffelCalendarMonthFilled,
  CalendarMonthRegular as GriffelCalendarMonthRegular,
} from '@fluentui/react-icons';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(GriffelCalendarMonthFilled, GriffelCalendarMonthRegular);

/**
 * Pinned-open windmod menu next to its Griffel-suite twin. The mechanisms differ (a native
 * top-layer div[popover] + CSS anchor positioning vs portal + react-positioning) — the SURFACES
 * must match pixel-for-pixel.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <FluentProvider>
      <Menu open>
        <MenuTrigger>
          <Button>Windmod</Button>
        </MenuTrigger>
        {/* popover='manual' ONLY because both sides are pinned open at once: popover='auto'
            surfaces are mutually exclusive by spec. */}
        <MenuPopover popover="manual">
          <MenuList hasIcons>
            <MenuItem icon={<CalendarMonth />}>New</MenuItem>
            <MenuItem icon={<CalendarMonth />} secondaryContent="Ctrl+O">
              Open
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
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <GriffelMenu open>
        <GriffelMenuTrigger>
          <GriffelButton>Griffel</GriffelButton>
        </GriffelMenuTrigger>
        <GriffelMenuPopover>
          <GriffelMenuList hasIcons>
            <GriffelMenuItem icon={<GriffelCalendarMonth />}>New</GriffelMenuItem>
            <GriffelMenuItem icon={<GriffelCalendarMonth />} secondaryContent="Ctrl+O">
              Open
            </GriffelMenuItem>
            <GriffelMenuDivider />
            <GriffelMenuGroup>
              <GriffelMenuGroupHeader>Danger zone</GriffelMenuGroupHeader>
              <GriffelMenuItem icon={<GriffelCalendarMonth />} disabled>
                Delete
              </GriffelMenuItem>
            </GriffelMenuGroup>
          </GriffelMenuList>
        </GriffelMenuPopover>
      </GriffelMenu>
    </GriffelFluentProvider>
  </div>
);
