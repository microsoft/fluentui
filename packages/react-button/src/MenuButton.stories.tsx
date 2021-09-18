import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
// @ts-ignore
import type { MenuProps } from '@fluentui/react-menu';
/* eslint-enable @typescript-eslint/ban-ts-comment */

import { MenuButton } from './MenuButton';
import { buttonBaseProps } from './buttonBaseProps.stories';
import { Playground } from './Playground.stories';
import type { MenuButtonProps } from './MenuButton';
import type { PlaygroundProps } from './Playground.types.stories';

const ExampleMenuButton = (props: MenuButtonProps): JSX.Element => (
  <Menu>
    <MenuTrigger>
      <MenuButton {...props} />
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

const menuButtonProps: PlaygroundProps<MenuProps>['sections'] = [
  { sectionName: 'Button props', propList: buttonBaseProps.filter(value => value.propName !== 'iconPosition') },
];

export const MenuButtonPlayground = () => {
  return (
    <Playground sections={menuButtonProps}>
      <ExampleMenuButton />
    </Playground>
  );
};

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
};
