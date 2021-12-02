import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuPopover, MenuItem } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuButtonProps } from '@fluentui/react-menubutton';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SplitButton } from '@fluentui/react-button';

import { Scenario } from './utils';

export const EventReminderAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Event reminder split button">
      <p>Your meeting starts in 10 minutes.</p>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps} primaryActionButton="Dismiss" />}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Postpone for 10 minutes</MenuItem>
            <MenuItem>Postpone for 1 hour</MenuItem>
            <MenuItem>Postpone until tomorrow</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Event reminder split button',
  id: 'split-button-accessibility-scenario',
};
