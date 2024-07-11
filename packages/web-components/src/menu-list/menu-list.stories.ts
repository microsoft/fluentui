import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { MenuList as FluentMenuList } from './menu-list.js';

type MenuListStoryArgs = Args & FluentMenuList;
type MenuListStoryMeta = Meta<MenuListStoryArgs>;

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

const storyTemplate = html<MenuListStoryArgs>`
  <div style="width: 200px;">
    <fluent-menu-list>
      <fluent-menu-item ?disabled=${x => x.disabled}>
        Item 1
        <span slot="start" class="start">${Cut20Filled}</span>
        <span slot="end">Ctrl+X</span>
      </fluent-menu-item>

      <fluent-menu-item ?disabled=${x => x.disabled}>
        <span slot="start">${Edit20Filled}</span>
        Item 2
        <span slot="end">Ctrl+E</span>
      </fluent-menu-item>

      <fluent-menu-item ?disabled=${x => x.disabled}> Open </fluent-menu-item>

      <fluent-menu-item disabled="true">
        <span slot="start" class="start">${Code20Filled}</span>
        <span slot="end">Win</span>

        Disabled Item
      </fluent-menu-item>

      <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

      <fluent-menu-item role="menuitemcheckbox" ?disabled=${x => x.disabled}>
        Checkbox 1
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>

      <fluent-menu-item role="menuitemcheckbox" ?disabled=${x => x.disabled}>
        Checkbox 2
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>

      <fluent-menu-item role="menuitemcheckbox" ?disabled=${x => x.disabled}> Checkbox 3 </fluent-menu-item>

      <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

      <fluent-menu-item role="menuitemradio" ?disabled=${x => x.disabled}>
        Radio 1
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>

      <fluent-menu-item role="menuitemradio" ?disabled=${x => x.disabled}>
        Radio 2
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>

      <fluent-menu-item role="menuitemradio" ?disabled=${x => x.disabled}> Radio 3 </fluent-menu-item>

      <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

      <fluent-menu-item ?disabled=${x => x.disabled}>
        <span slot="start">${Folder24Filled}</span>
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
        </fluen        Create
        <fluent-menu-list slot="submenu">
          <fluent-menu-item>
            File
            Create
          </fluent-menu-item>
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
} as MenuListStoryMeta;

export const MenuList = renderComponent(storyTemplate).bind({});

export const MenuListWithCheckboxSelection = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 128px;">
    <fluent-menu-list>
      <fluent-menu-item role="menuitemcheckbox"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 2 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 3 </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListWithRadioSelection = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 128px; position: relative">
    <fluent-menu-list>
      <fluent-menu-item role="menuitemradio"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemradio"> Item 2 </fluent-menu-item>
      <fluent-menu-item role="menuitemradio"> Item 3 </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListWithIcons = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 128px; position: relative">
    <fluent-menu-list>
      <fluent-menu-item> Item 1 </fluent-menu-item>
      <fluent-menu-item>
        Item 2
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item>
        <span slot="start">${Edit20Filled}</span>

        Item 3
      </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListWithIconsAndSelection = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 128px;">
    <fluent-menu-list>
      <fluent-menu-item role="menuitemcheckbox">
        Item 1
        <span slot="start">${Cut20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox">
        Item 2
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 3 </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListWithSubmenu = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 260px;">
    <fluent-menu-list>
      <fluent-menu-item>
        Item 1
        <fluent-menu-list slot="submenu">
          <fluent-menu-item> Subitem 1 </fluent-menu-item>
          <fluent-menu-item> Subitem 2 </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>
        Item 2
        <fluent-menu-list slot="submenu">
          <fluent-menu-item> Subitem 1 </fluent-menu-item>
          <fluent-menu-item> Subitem 1 </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>Item 3</fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListWithSubmenuAndIcons = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 260px;">
    <fluent-menu-list>
      <fluent-menu-item>
        Item 1
        <span slot="start">${Edit20Filled}</span>
        <fluent-menu-list slot="submenu">
          <fluent-menu-item>
            Subitem 1
            <span slot="start">${Folder24Filled}</span>
          </fluent-menu-item>
          <fluent-menu-item>
            Subitem 2
            <span slot="start">${Code20Filled}</span>
          </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>
        Item 2
        <fluent-menu-list slot="submenu">
          <fluent-menu-item>
            Subitem 1
            <span slot="start">${Folder24Filled}</span>
          </fluent-menu-item>
          <fluent-menu-item>
            Subitem 1
            <span slot="start">${Code20Filled}</span>
          </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>Item 3</fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListAligningWithDivider = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 128px; position: relative">
    <fluent-menu-list>
      <fluent-menu-item> Item 1 </fluent-menu-item>
      <fluent-menu-item> Item 2 </fluent-menu-item>
      <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

      <fluent-menu-item> Item 3 </fluent-menu-item>
      <fluent-menu-item> Item 4 </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const MenuListWithCustomIcons = renderComponent(html<MenuListStoryArgs>`
  <div style="width: 260px">
    <fluent-menu-list>
      <fluent-menu-item>
        Submenu 1
        <span slot="start">${Cut20Filled}</span>
        <span slot="submenu-glyph">→</span>
        <span slot="end">Ctrl+S</span>
        <fluent-menu-list slot="submenu">
          <fluent-menu-item> Subitem 1 </fluent-menu-item>
          <fluent-menu-item> Subitem 2 </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>

      <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

      <fluent-menu-item role="menuitemcheckbox">
        Checkbox 1
        <span slot="indicator">😀</span>
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>

      <fluent-menu-item role="menuitemcheckbox">
        Checkbox 2
        <span slot="indicator">😢</span>
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
    </fluent-menu-list>
  </div>
`);

export const HugEnd = renderComponent(
  html<MenuListStoryArgs>` <div style="display: flex;justify-content: end;">${storyTemplate}</div> `,
);
