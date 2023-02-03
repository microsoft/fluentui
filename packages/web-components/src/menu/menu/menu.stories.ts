import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../__test__/helpers.js';
import type { Menu as FluentMenu } from './menu.js';
import './define.js';
import '../menu-item/define.js';

type MenuStoryArgs = Args & FluentMenu;
type MenuStoryMeta = Meta<MenuStoryArgs>;

const storyTemplate = html<MenuStoryArgs>`
  <fluent-menu>
    <fluent-menu-item>Menu item 1</fluent-menu-item>
    <fluent-menu-item>Menu item 2</fluent-menu-item>
    <fluent-menu-item>Menu item 3</fluent-menu-item>
  </fluent-menu>
`;

export default {
  title: 'Components/Menu',
  args: {},
  argTypes: {},
} as MenuStoryMeta;

export const Menu = renderComponent(storyTemplate).bind({});
