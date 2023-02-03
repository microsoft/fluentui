import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../__test__/helpers.js';
import type { Menu as FluentMenu } from './menu.js';
import './define.js';
import '../menu-item/define.js';

type MenuStoryArgs = Args & FluentMenu;
type MenuStoryMeta = Meta<MenuStoryArgs>;

const eye20Regular = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z"
    fill="#212121"
  />
</svg>`;

const icon = eye20Regular;
const storyTemplate = html<MenuStoryArgs>`
  <fluent-menu>
    <fluent-menu-item
      >Menu item 1
      <span slot="start">${eye20Regular}</span>
      <fluent-menu slot="submenu">
        <fluent-menu-item>Submenu item 1</fluent-menu-item>
        <fluent-menu-item>Submenu item 2</fluent-menu-item>
      </fluent-menu>
    </fluent-menu-item>
    <fluent-menu-item role="menuitemcheckbox">Menu item 2</fluent-menu-item>
    <fluent-menu-item role="menuitemcheckbox">Menu item 3</fluent-menu-item>
  </fluent-menu>
`;

export default {
  title: 'Components/Menu',
  args: {},
  argTypes: {},
} as MenuStoryMeta;

export const Menu = renderComponent(storyTemplate).bind({});
