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
const FormNew20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3 5.5A2.5 2.5 0 015.5 3h9A2.5 2.5 0 0117 5.5v4.1c-.75-.38-1.6-.6-2.5-.6h-5a.5.5 0 000 1h1.84a5.5 5.5 0 00-1.74 7H5.5A2.5 2.5 0 013 14.5v-9zM6.5 9a.5.5 0 100 1 .5.5 0 000-1zM5 9.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM6.5 13a.5.5 0 100 1 .5.5 0 000-1zm-1.5.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM5.5 5a.5.5 0 000 1h9a.5.5 0 000-1h-9zM19 14.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4-2a.5.5 0 00-1 0V14h-1.5a.5.5 0 000 1H14v1.5a.5.5 0 001 0V15h1.5a.5.5 0 000-1H15v-1.5z"
    fill="currentColor"
  ></path>
</svg>`;
const TabDesktopNewPage20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3 5.5A2.5 2.5 0 015.5 3H8v2.5C8 6.33 8.67 7 9.5 7H17v7.5a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9zM8 11a1 1 0 10-2 0 1 1 0 002 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 10-2 0 1 1 0 002 0zm3-5v-.5A2.5 2.5 0 0014.5 3H9v2.5c0 .28.22.5.5.5H17z"
    fill="currentColor"
  ></path>
</svg>`;
const Code20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.94 4.05a.75.75 0 00-1.38-.6l-5.5 12.5a.75.75 0 101.38.6l5.5-12.5zm1.35 9.8a.75.75 0 01-.13-1.06L16.3 10l-2.14-2.8a.75.75 0 011.18-.9l2.5 3.24c.21.27.21.65 0 .92l-2.5 3.25a.75.75 0 01-1.05.13zm-8.58-7.7c.33.26.39.73.13 1.06L3.7 10l2.14 2.8a.75.75 0 11-1.18.9l-2.5-3.24a.75.75 0 010-.92l2.5-3.25a.75.75 0 011.05-.13z"
    fill="currentColor"
  ></path>
</svg>`;

const storyTemplate = html<MenuStoryArgs>`
  <div style="width: 200px; height: 13em;">
    <fluent-menu>
      <fluent-menu-item disabled=${x => x.disabled}>
        Cut
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item disabled=${x => x.disabled}>
        <span slot="start">${ClipboardPaste20Filled}</span>
        Edit
      </fluent-menu-item>
      <fluent-menu-item class="header">Submenu Group Header</fluent-menu-item>
      <fluent-menu-item disabled=${x => x.disabled}>
        New
        <span slot="start">${FormNew20Filled}</span>
        <span slot="end">Ctrl+N</span>
      </fluent-menu-item>
      <fluent-menu-item disabled=${x => x.disabled}>
        Open
        <span slot="start">${FormNew20Filled}</span>
        <fluent-menu slot="submenu">
          <fluent-menu-item>
            File
            <span slot="start">${TabDesktopNewPage20Filled}</span>
          </fluent-menu-item>
          <fluent-menu-item>
            Workspace
            <span slot="start">${Code20Filled}</span>
          </fluent-menu-item>
        </fluent-menu>
      </fluent-menu-item>
      <fluent-menu-item class="header">Checkbox Group Header</fluent-menu-item>
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
      <fluent-menu-item class="header">Radio Group Header</fluent-menu-item>
      <fluent-menu-item role="menuitemradio" disabled=${x => x.disabled}>
        Cut
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio" disabled=${x => x.disabled}>
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio" disabled=${x => x.disabled}>
        Paste
        <span slot="start">${ClipboardPaste20Filled}</span>
      </fluent-menu-item>
    </fluent-menu>
  </div>
`;

export default {
  title: 'Components/Menu',
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      description: 'Disables Menu item',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
  },
} as MenuStoryMeta;

export const Menu = renderComponent(storyTemplate).bind({});

export const MenuWithCheckboxes = renderComponent(html<MenuStoryArgs>`
  <div style="width: 128px; position: relative;">
    <fluent-menu>
      <fluent-menu-item role="menuitemcheckbox">
        Cut
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox">
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox">
        Paste
        <span slot="start">${ClipboardPaste20Filled}</span>
      </fluent-menu-item>
    </fluent-menu>
  </div>
`);

export const MenuWithRadios = renderComponent(html<MenuStoryArgs>`
  <div style="width: 128px; position: relative">
    <fluent-menu>
      <fluent-menu-item role="menuitemradio">
        Cut
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio">
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio">
        Paste
        <span slot="start">${ClipboardPaste20Filled}</span>
      </fluent-menu-item>
    </fluent-menu>
  </div>
`);

export const MenuWithSubmenu = renderComponent(html<MenuStoryArgs>`
  <div style="width: 260px; position: relative;">
    <fluent-menu>
      <fluent-menu-item>
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
`);
