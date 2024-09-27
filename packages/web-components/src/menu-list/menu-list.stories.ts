import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { type MenuItem as FluentMenuItem, MenuItemRole } from '../menu-item/menu-item.js';
import type { MenuList as FluentMenuList } from './menu-list.js';

type Story = StoryObj<FluentMenuList>;

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

const Folder20Filled = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path
      fill="currentColor"
      d="M2 5.5A2.5 2.5 0 0 1 4.5 3h2.482c.464 0 .91.184 1.238.513l1.28 1.28l-2.06 2.06A.5.5 0 0 1 7.085 7H2zM2 8v6.5A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 15.5 5h-4.793l-2.56 2.56A1.5 1.5 0 0 1 7.085 8z"
    />
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

const menuItemTemplate = html<StoryArgs<FluentMenuItem>>`
  <fluent-menu-item
    ?disabled="${story => story.disabled}"
    role="${story => story.role}"
    ?checked="${story => story.checked}"
  >
    ${story => story.indicatorSlottedContent?.()} ${story => story.startSlottedContent?.()}
    ${story => story.slottedContent?.()} ${story => story.endSlottedContent?.()}
    ${story => story.submenuGlyphSlottedContent?.()} ${story => story.submenuSlottedContent?.()}
  </fluent-menu-item>
`;

const storyTemplate = html<StoryArgs<FluentMenuItem>>`
  <fluent-menu-list>${story => story.slottedContent?.()}</fluent-menu-list>
`;

export default {
  title: 'Components/MenuList',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => html`
      ${repeat(
        [{ slottedContent: () => 'Item 1' }, { slottedContent: () => 'Item 2' }, { slottedContent: () => 'Item 3' }],
        menuItemTemplate,
      )}
    `,
  },
  argTypes: {
    slottedContent: {
      control: false,
      description: 'The default slot. Contains the menu items.',
      name: '',
      table: { category: 'content', type: {} },
    },
  },
} as Meta<FluentMenuList>;

export const Default: Story = {};

export const CheckboxItems: Story = {
  args: {
    slottedContent: () => html`
      ${repeat(
        [
          { slottedContent: () => 'Check One' },
          { slottedContent: () => 'Check Two' },
          { slottedContent: () => 'Triple Check' },
        ].map(x => ({
          ...x,
          role: MenuItemRole.menuitemcheckbox,
          checked: true,
        })),
        menuItemTemplate,
      )}
    `,
  },
};

export const RadioItems: Story = {
  args: {
    slottedContent: () => html`
      ${repeat(
        [
          { slottedContent: () => 'Yesterday' },
          { slottedContent: () => 'Today', checked: true },
          { slottedContent: () => 'Tomorrow' },
        ].map(x => ({ ...x, role: MenuItemRole.menuitemradio })),
        menuItemTemplate,
      )}
    `,
  },
};

export const DisabledItems: Story = {
  args: {
    slottedContent: () => html`
      ${repeat(
        [
          { slottedContent: () => 'Item 1' },
          { slottedContent: () => 'Item 2', disabled: true },
          { slottedContent: () => 'Item 3' },
        ],
        menuItemTemplate,
      )}
    `,
  },
};

export const Submenus: Story = {
  args: {
    slottedContent: () => html`
      ${repeat(
        [
          {
            slottedContent: () => 'Item 1',
            startSlottedContent: () => html`<span slot="start">${Edit20Filled}</span>`,

            submenuSlottedContent: () => html`
              <fluent-menu-list slot="submenu">
                <fluent-menu-item>
                  Subitem 1
                  <span slot="start">${Folder20Filled}</span>
                </fluent-menu-item>
                <fluent-menu-item>
                  Subitem 2
                  <span slot="start">${Code20Filled}</span>
                </fluent-menu-item>
              </fluent-menu-list>
            `,
          },
          {
            slottedContent: () => 'Item 2',
            submenuSlottedContent: () => html`
              <fluent-menu-list slot="submenu">
                <fluent-menu-item>
                  Subitem 1
                  <span slot="start">${Folder20Filled}</span>
                </fluent-menu-item>
                <fluent-menu-item>
                  Subitem 2
                  <span slot="start">${Code20Filled}</span>
                </fluent-menu-item>
              </fluent-menu-list>
            `,
          },
          { slottedContent: () => 'Item 3' },
        ],
        menuItemTemplate,
      )}
    `,
  },
};

export const DividerAlignment: Story = {
  args: {
    slottedContent: () => html`
      <fluent-menu-item>Item 1</fluent-menu-item>
      <fluent-menu-item>Item 2</fluent-menu-item>
      <fluent-divider></fluent-divider>
      <fluent-menu-item>Item 3</fluent-menu-item>
      <fluent-menu-item>Item 4</fluent-menu-item>
    `,
  },
};

export const CustomIcons: Story = {
  args: {
    slottedContent: () => html<StoryArgs<FluentMenuList>>`
      ${repeat(
        [
          {
            slottedContent: () => 'Submenu 1',
            startSlottedContent: () => html`<span slot="start">${Cut20Filled}</span>`,

            submenuGlyphSlottedContent: () => html`<span slot="submenu-glyph">→</span>`,

            endSlottedContent: () => html`<span slot="end">Ctrl+S</span>`,

            submenuSlottedContent: () => html`
              <fluent-menu-list slot="submenu">
                <fluent-menu-item>Subitem 1</fluent-menu-item>
                <fluent-menu-item>Subitem 2</fluent-menu-item>
              </fluent-menu-list>
            `,
          },
        ],
        menuItemTemplate,
      )}

      <fluent-divider></fluent-divider>

      ${repeat(
        [
          {
            role: MenuItemRole.menuitemcheckbox,
            slottedContent: () => 'Checkbox 1',
            indicatorSlottedContent: () => html`<span slot="indicator">✅</span>`,

            startSlottedContent: () => html`<span slot="start">${Edit20Filled}</span>`,
          },

          {
            role: MenuItemRole.menuitemcheckbox,
            slottedContent: () => 'Checkbox 2',

            indicatorSlottedContent: () => html`<span slot="indicator">👍</span>`,

            startSlottedContent: () => html`<span slot="start">${Edit20Filled}</span>`,
          },
        ],
        menuItemTemplate,
      )}
    `,
  },
};

export const ContainerAlignment: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuList>>`
    <div style="display: flex;justify-content: end;">${storyTemplate}</div>
  `),
};
