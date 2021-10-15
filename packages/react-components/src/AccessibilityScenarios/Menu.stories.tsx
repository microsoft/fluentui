import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuPopover,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
} from '@fluentui/react-components';
import { Scenario } from './utils';

interface IStatusSubmenuProps {
  checkedValues: Record<string, string[]>;
  onChange: OnCheckedValueChangeCallback;
}

const StatusSubmenu: React.FunctionComponent<IStatusSubmenuProps> = (props: IStatusSubmenuProps) => {
  const { checkedValues, onChange } = props;

  return (
    <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <MenuTrigger>
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

export const ProfileMenuAccessibilityScenario: React.FunctionComponent = () => {
  const [statusCheckedValues, setStatusCheckedValues] = React.useState({ status: ['online'] });
  const onStatusChange = (
    event: React.MouseEvent | React.KeyboardEvent,
    { name, checkedItems }: OnCheckedValueChangeDataType,
  ) => {
    setStatusCheckedValues(state => ({ ...state, [name]: checkedItems }));
  };

  return (
    <Scenario pageTitle="Profile menu">
      <Menu>
        <MenuTrigger>
          <Button>Profile</Button>
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

export default {
  title: 'Accessibility Scenarios/ProfileMenu',
  id: 'menu-accessibility-scenario',
};
