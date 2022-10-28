import * as React from 'react';

import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';

import { Scenario } from './utils';

interface StatusSubmenuProps {
  checkedValues: Record<string, string[]>;
  onChange: OnCheckedValueChangeCallback;
}

const StatusSubmenu: React.FunctionComponent<StatusSubmenuProps> = props => {
  const { checkedValues, onChange } = props;

  return (
    <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Status</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItemRadio name="status" value="online">
            Online
          </MenuItemRadio>
          <MenuItemRadio name="status" value="away">
            Away
          </MenuItemRadio>
          <MenuItemRadio name="status" value="offline" disabled>
            Offline
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

type OnCheckedValueChangeDataType = {
  name: string;
  checkedItems: string[];
};

type OnCheckedValueChangeCallback = (
  event: React.MouseEvent | React.KeyboardEvent,
  data: OnCheckedValueChangeDataType,
) => void;

type ProfileMenuStatus = { status: Array<'online' | 'away' | 'offline'> };

export const ProfileMenu: React.FunctionComponent = () => {
  const [statusCheckedValues, setStatusCheckedValues] = React.useState<ProfileMenuStatus>({ status: ['online'] });
  const onStatusChange = (
    event: React.MouseEvent | React.KeyboardEvent,
    { name, checkedItems }: OnCheckedValueChangeDataType,
  ) => {
    setStatusCheckedValues(state => ({ ...state, [name]: checkedItems }));
  };

  return (
    <Scenario pageTitle="Profile menu">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>Profile</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Information</MenuGroupHeader>
              <MenuItem>Help</MenuItem>
            </MenuGroup>
            <MenuGroup>
              <MenuGroupHeader>Settings</MenuGroupHeader>
              <MenuItemCheckbox name="settings" value="runAtStartup">
                Run at startup
              </MenuItemCheckbox>
              <MenuItemCheckbox name="settings" value="showNotifications">
                Show notifications
              </MenuItemCheckbox>
            </MenuGroup>
            <MenuGroup>
              <MenuGroupHeader>Account</MenuGroupHeader>
              <StatusSubmenu checkedValues={statusCheckedValues} onChange={onStatusChange} />
              <MenuItem>Logout</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Scenario>
  );
};
