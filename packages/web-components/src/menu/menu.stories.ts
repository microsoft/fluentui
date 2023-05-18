import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Menu as FluentMenu } from './menu.js';
import './define.js';
import '../menu-item/define.js';
import '../divider/define.js';

type MenuStoryArgs = Args & FluentMenu;
type MenuStoryMeta = Meta<MenuStoryArgs>;

const storyTemplate = html<MenuStoryMeta>`
  <fluent-menu>
    <fluent-menu-button appearance="primary" slot="trigger">Button!</fluent-menu-button>
    <fluent-menu-list>
      <fluent-menu-item>Menu item 1</fluent-menu-item>
      <fluent-menu-item>Menu item 2</fluent-menu-item>
      <fluent-menu-item>Menu item 3</fluent-menu-item>
      <fluent-menu-item>Menu item 4</fluent-menu-item>
    </fluent-menu-list>
  </fluent-menu>
`;

export default {
  title: 'Components/Menu',
  args: {},
  argTypes: {},
} as MenuStoryMeta;

export const Menu = renderComponent(storyTemplate).bind({});

export const MenuWith = renderComponent(html<MenuStoryArgs>`
  <div style="width: 128px; position: relative;">
    <fluent-menu-list>
      <fluent-menu-item role="menuitemcheckbox"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 2 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 3 </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);
