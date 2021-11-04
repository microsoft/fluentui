import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { SplitButton } from '../../../SplitButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const WithLongText = () => (
  <>
    <Menu positioning="below-end">
      <MenuTrigger>
        {triggerProps => <SplitButton menuButton={triggerProps} primaryActionButton={'Text'} />}
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>

    <Menu positioning="below-end">
      <MenuTrigger>
        {triggerProps => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton={'Text truncates after it hits the max width token value'}
          />
        )}
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
