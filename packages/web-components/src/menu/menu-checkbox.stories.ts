import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Menu as FluentMenu } from './menu.js';
import './define.js';
import '../menu-item/define.js';

type MenuStoryArgs = Args & FluentMenu;
type MenuStoryMeta = Meta<MenuStoryArgs>;

const Cut20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M14.88 3.16l-3.1 4.77-.9-1.38 2.74-4.2a.75.75 0 011.26.8zm-2.38 8.6a3.24 3.24 0 014.5 2.99 3.25 3.25 0 11-5.72-2.11L10 10.66l-1.28 1.98a3.25 3.25 0 11-1.21-.88l1.6-2.47-3.99-6.13a.75.75 0 011.26-.82l6.12 9.41zm.2 1.6a1.75 1.75 0 10.01-.02l-.02.02zM6.24 13a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5z"
    fill="currentColor"
  ></path>
</svg>`;

const ClipboardPaste20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M4.5 4h1.59c.2.58.76 1 1.41 1h3c.65 0 1.2-.42 1.41-1h1.59c.28 0 .5.22.5.5v1a.5.5 0 001 0v-1c0-.83-.67-1.5-1.5-1.5h-1.59c-.2-.58-.76-1-1.41-1h-3c-.65 0-1.2.42-1.41 1H4.5C3.67 3 3 3.67 3 4.5v12c0 .83.67 1.5 1.5 1.5h3a.5.5 0 000-1h-3a.5.5 0 01-.5-.5v-12c0-.28.22-.5.5-.5zm3 0a.5.5 0 010-1h3a.5.5 0 010 1h-3zm3 3C9.67 7 9 7.67 9 8.5v8c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5h-5z"
    fill="currentColor"
  ></path>
</svg>`;

const Edit20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.92 2.87a2.97 2.97 0 014.2 4.21l-.66.67-4.2-4.2.66-.68zm-1.38 1.38l-8 8c-.32.33-.55.74-.65 1.2l-.88 3.94a.5.5 0 00.6.6l3.92-.87c.47-.1.9-.34 1.24-.68l7.98-7.98-4.2-4.21z"
    fill="currentColor"
  ></path>
</svg>`;

const storyTemplate = html<MenuStoryArgs>`
  <div style="width: 128px; position: relative;">
    <fluent-menu>
      <fluent-menu-item role="menuitemcheckbox" disabled=${x => x.disabled}>
        Cut
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox" disabled=${x => x.disabled}>
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox" disabled=${x => x.disabled}>
        Paste
        <span slot="start">${ClipboardPaste20Filled}</span>
      </fluent-menu-item>
    </fluent-menu>
  </div>
`;

export default {
  title: 'Components/Menu/Menu Item with Checkboxes',
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
