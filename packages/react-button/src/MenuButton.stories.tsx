import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuProps, MenuTrigger } from '@fluentui/react-menu';
import { MenuButton, MenuButtonProps } from './MenuButton';
import { Playground } from './Playground.stories';
import { PlaygroundProps } from './Playground.types.stories';
import { buttonBaseProps } from './buttonBaseProps.stories';

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
