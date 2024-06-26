import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Menu as FluentMenu } from './menu.js';

type MenuStoryArgs = Args & FluentMenu;
type MenuStoryMeta = Meta<MenuStoryArgs>;

const storyTemplate = html<MenuStoryArgs>`
  <style>
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
  <fluent-menu
    ?open-on-hover="${x => x.openOnHover}"
    ?open-on-context="${x => x.openOnContext}"
    ?close-on-scroll="${x => x.closeOnScroll}"
    ?persist-on-item-click="${x => x.persistOnItemClick}"
  >
    <fluent-menu-button aria-label="Toggle Menu" appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
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
  args: {
    openOnHover: false,
    openOnContext: false,
    closeOnScroll: false,
    persistOnItemClick: false,
  },
  argTypes: {
    openOnHover: {
      description: 'Sets whether menu opens on hover',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
    openOnContext: {
      description: 'Opens the menu on right click (context menu), removes all other menu open interactions',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
    closeOnScroll: {
      description: 'Close when scroll outside of it',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
    persistOnItemClick: {
      description: 'Prevents the menu from closing when an item is clicked',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
  },
} as MenuStoryMeta;

export const Menu = renderComponent(storyTemplate).bind({});

export const MenuOpenOnHover = renderComponent(html<MenuStoryArgs>`
  <div class="container">
    <fluent-menu open-on-hover>
      <fluent-menu-button aria-label="Toggle Menu" appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
      <fluent-menu-list>
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      </fluent-menu-list>
    </fluent-menu>
  </div>
`);

export const MenuOpenOnContext = renderComponent(html<MenuStoryArgs>`
  <div class="container">
    <fluent-menu open-on-context>
      <fluent-menu-button aria-label="Toggle Menu" appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
      <fluent-menu-list>
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      </fluent-menu-list>
    </fluent-menu>
  </div>
`);

export const MenuWithMaxHeight = renderComponent(html<MenuStoryArgs>`
  <div class="container">
    <fluent-menu style="--menu-max-height: 10rem">
      <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
      <fluent-menu-list>
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
        <fluent-menu-item>Menu item 5</fluent-menu-item>
        <fluent-menu-item>Menu item 6</fluent-menu-item>
        <fluent-menu-item>Menu item 7</fluent-menu-item>
        <fluent-menu-item>Menu item 8</fluent-menu-item>
      </fluent-menu-list>
    </fluent-menu>
  </div>
`);
