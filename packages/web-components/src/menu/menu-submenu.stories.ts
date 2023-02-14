import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Menu as FluentMenu } from './menu.js';

type MenuStoryArgs = Args & FluentMenu;
type MenuStoryMeta = Meta<MenuStoryArgs>;

const storyTemplate = html<MenuStoryArgs>`
  <div style="width: 260px; position: relative;">
    <fluent-menu>
      <fluent-menu-item disabled=${x => x.disabled}>
        New
        <fluent-menu slot="submenu">
          <fluent-menu-item> Submenu item 1 </fluent-menu-item>
          <fluent-menu-item> Submenu item 2 </fluent-menu-item>
        </fluent-menu>
      </fluent-menu-item>
      <fluent-menu-item>
        New Window
        <fluent-menu slot="submenu">
          <fluent-menu-item>Submenu item 1</fluent-menu-item>
          <fluent-menu-item>Submenu item 2</fluent-menu-item>
        </fluent-menu>
      </fluent-menu-item>
      <fluent-menu-item> Open Folder </fluent-menu-item>
    </fluent-menu>
  </div>
  <br />
`;

export default {
  title: 'Components/Menu/Menu Item with Submenus',
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      description: 'Disables Accordion Item',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
  },
} as MenuStoryMeta;

export const Menu = renderComponent(storyTemplate).bind({});
