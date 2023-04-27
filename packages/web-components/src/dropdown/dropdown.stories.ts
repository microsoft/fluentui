import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import './define.js';
import '../option/define';
import { DropdownAppearance, DropdownControlSizes } from './dropdown.options.js';

type DropdownStoryArgs = Args & FluentDropdown;
type DropdownStoryMeta = Meta<DropdownStoryArgs>;

const icon = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M15.75 6a.75.75 0 0 0 0 1.5c.71 0 1.25.54 1.25 1.25a.75.75 0 0 0 1.5 0C18.5 7.21 17.3 6 15.75 6Zm-8-3c-1.1 0-2.4.55-3.4 1.39A4.74 4.74 0 0 0 2.5 7.95v.02c0 .71 0 2.3 1.21 3.74.13.15.21.25.27.35.31.55.52 1.16.52 1.7.01 1.9.35 3.52.96 4.7.6 1.17 1.55 2.04 2.79 2.04.37 0 .72-.09 1.02-.3.3-.2.5-.48.62-.76.24-.53.3-1.21.33-1.83l.03-.46c.06-1.2.13-2.46.67-3.57.19-.37.52-.58.83-.58h.5c.3 0 .63.2.81.55.4 1.04.52 2.19.63 3.3l.09.8c.07.63.18 1.29.41 1.8.13.27.31.54.58.74.29.2.62.31.98.31 1.11 0 2.05-.9 2.67-2.02.64-1.17 1.07-2.8 1.08-4.73 0-.59.26-1.28.63-1.86a5.64 5.64 0 0 0 1.37-3.94c0-1.48-.85-2.72-1.85-3.56A5.66 5.66 0 0 0 16.25 3a5.4 5.4 0 0 0-2.1.37c-.57.23-.96.55-1.26.84l-.35.37-.03.03c-.1.12-.19.2-.26.27-.12.1-.18.12-.25.12s-.13-.01-.25-.12a3.83 3.83 0 0 1-.26-.27l-.03-.03-.35-.37c-.3-.3-.7-.6-1.25-.84A5.4 5.4 0 0 0 7.75 3ZM4 7.95c0-.89.52-1.74 1.32-2.41A4.2 4.2 0 0 1 7.75 4.5c.7 0 1.19.11 1.53.25.34.15.57.33.78.54l.3.3.02.03c.1.12.23.26.37.38.3.26.7.5 1.25.5s.95-.24 1.25-.5c.14-.12.26-.26.37-.38l.03-.03.29-.3c.2-.2.44-.4.78-.54s.82-.25 1.53-.25c.67 0 1.63.36 2.43 1.04.8.67 1.32 1.52 1.32 2.4v.01c0 .68 0 1.77-1.05 3a5.26 5.26 0 0 0-.95 2.8c0 1.72-.4 3.09-.9 4-.53.98-1.08 1.25-1.35 1.25-.06 0-.08-.01-.08-.02a.45.45 0 0 1-.12-.17c-.12-.26-.2-.7-.28-1.34a41.8 41.8 0 0 1-.08-.7 14.82 14.82 0 0 0-.77-3.85 2.45 2.45 0 0 0-2.17-1.42h-.5c-.99 0-1.79.63-2.17 1.42-.7 1.4-.77 2.99-.83 4.16l-.03.44c-.04.66-.1 1.07-.2 1.31-.05.1-.08.13-.1.14 0 0-.04.03-.17.03-.44 0-.98-.3-1.46-1.23A9.15 9.15 0 0 1 6 13.75a5.1 5.1 0 0 0-1.13-3C4 9.73 4 8.62 4 7.94Z"
    fill="currentColor"
  ></path>
</svg>`;

const dropdownTemplate = html<DropdownStoryArgs>`
  <div>
    <fluent-dropdown
      ?size="${x => x.size}"
      ?multiple="${x => x.multiple}"
      appearance="${x => x.appearance}"
      control-size="${x => x.controlSize}"
      ?disabled="${x => x.disabled}"
      placeholder="Select an Animal"
    >
      <fluent-option><span slot="icon">${icon}</span>Pangolin</fluent-option>
      <fluent-option>Quokka</fluent-option>
      <fluent-option>Axolotl</fluent-option>
      <fluent-option>Hoopoe</fluent-option>
    </fluent-dropdown>
  </div>
`;

export default {
  title: 'Components/Dropdown',
  args: {
    appearance: DropdownAppearance.outline,
    controlSize: DropdownControlSizes.medium,
    multiple: false,
    disabled: false,
  },
  argTypes: {
    multiple: {
      control: {
        type: 'boolean',
      },
    },
    appearance: {
      options: Object.values(DropdownAppearance),
      control: {
        type: 'select',
      },
    },
    controlSize: {
      options: Object.values(DropdownControlSizes),
      control: {
        type: 'select',
      },
    },
    size: {
      control: 'number',
      defaultValue: null,
    },
    disabled: {
      description: 'Sets disabled state on Accordion Item',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
  },
} as DropdownStoryMeta;

export const Dropdown = renderComponent(dropdownTemplate).bind({});
