import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { MenuList as FluentMenuList } from './menu-list.js';
import './define.js';
import '../menu-item/define.js';

type MenuStoryArgs = Args & FluentMenuList;
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

const Folder24Filled = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.82 6.5h5.93c1.14 0 2.08.84 2.23 1.94l.01.16.01.15v9c0 1.2-.93 2.17-2.1 2.24l-.15.01H4.25c-1.2 0-2.17-.93-2.24-2.1L2 17.75V10.5h6.4c.4-.04.77-.18 1.1-.4l.15-.12 4.17-3.48zM8.21 4c.46 0 .9.14 1.28.4l.16.12 2.1 1.75-3.06 2.56-.09.06a.75.75 0 01-.29.1l-.1.01H2V6.25c0-1.2.93-2.17 2.1-2.24L4.25 4h3.96z"
      fill="currentColor"
    ></path>
  </svg>
`;
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
    <fluent-menu-list icons>
      <fluent-menu-item icon ?disabled=${x => x.disabled}>
        Cut
        <span slot="start">${Cut20Filled}</span>
        <span slot="end">Ctrl+X</span>
      </fluent-menu-item>
      <fluent-menu-item icon ?disabled=${x => x.disabled}>
        <span slot="start">${Edit20Filled}</span>
        Edit
        <span slot="end">Ctrl+E</span>
      </fluent-menu-item>
      <fluent-menu-item icon ?disabled=${x => x.disabled}> Open </fluent-menu-item>
      <fluent-menu-item icon ?disabled=${x => x.disabled}>
        New
        <fluent-menu-list slot="submenu">
          <fluent-menu-item icon>
            File
            <span slot="start">${Folder24Filled}</span>
          </fluent-menu-item>
          <fluent-menu-item icon>
            Workspace
            <span slot="start">${Code20Filled}</span>
          </fluent-menu-item>
        </fluent-menu-list>
        <span slot="end">Ctrl+N</span>
      </fluent-menu-item>
    </fluent-menu-list>
  </div>
`;

export default {
  title: 'Components/MenuList',
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
    <fluent-menu-list>
      <fluent-menu-item role="menuitemcheckbox" icon>
        Option 1
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox" icon>
        Option 2
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox" icon>
        Option 3
        <span slot="start">${ClipboardPaste20Filled}</span>
      </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuWithRadios = renderComponent(html<MenuStoryArgs>`
  <div style="width: 128px; position: relative">
    <fluent-menu-list>
      <fluent-menu-item role="menuitemradio">
        Option 1
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio">
        Option 2
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio">
        Option 3
        <span slot="start">${ClipboardPaste20Filled}</span>
      </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuWithSubmenu = renderComponent(html<MenuStoryArgs>`
  <div style="width: 260px; position: relative;">
    <fluent-menu-list>
      <fluent-menu-item>
        New
        <fluent-menu-list slot="submenu">
          <fluent-menu-item>
            File
            <span slot="start">${Folder24Filled}</span>
          </fluent-menu-item>
          <fluent-menu-item>
            Workspace
            <span slot="start">${Code20Filled}</span>
          </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>
        Open
        <fluent-menu-list slot="submenu">
          <fluent-menu-item>
            Folder
            <span slot="start">${Folder24Filled}</span>
          </fluent-menu-item>
          <fluent-menu-item>
            Workspace
            <span slot="start">${Code20Filled}</span>
          </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item> Help</fluent-menu-item>
    </fluent-menu-list>
  </div>
`);
