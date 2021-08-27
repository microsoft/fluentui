import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuTrigger } from '@fluentui/react-menu';
// @ts-ignore
import type { MenuButtonProps } from './MenuButton';
/* eslint-enable @typescript-eslint/ban-ts-comment */

import { MenuButton } from './MenuButton';
import { Playground } from './Playground.stories';
import { buttonBaseProps } from './buttonBaseProps.stories';
import type { MenuProps } from '@fluentui/react-menu';
import type { PlaygroundProps } from './Playground.types.stories';

const ExampleMenu = (props: MenuButtonProps): JSX.Element => (
  <Menu>
    <MenuTrigger>
      <MenuButton {...props} />
    </MenuTrigger>

    <MenuList>
      <MenuItem>Item a</MenuItem>
      <MenuItem>Item b</MenuItem>
    </MenuList>
  </Menu>
);

const menuButtonProps: PlaygroundProps<MenuProps>['sections'] = [
  { sectionName: 'Button props', propList: buttonBaseProps.filter(value => value.propName !== 'iconPosition') },
];

export const MenuButtonPlayground = () => {
  return (
    <Playground sections={menuButtonProps}>
      <ExampleMenu />
    </Playground>
  );
};

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
};
