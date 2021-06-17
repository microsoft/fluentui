import * as React from 'react';
import { MenuButton, MenuButtonProps } from './index';
import { Menu, MenuItem, MenuList, MenuProps, MenuTrigger } from '@fluentui/react-menu';
import { buttonBaseProps } from './Button.stories';
import { Playground } from './Playground';
import { PlaygroundProps } from './Playground.types';

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
