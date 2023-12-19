import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { colorNeutralBackgroundInverted, colorNeutralForegroundInverted2 } from '../theme/design-tokens.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import './define.js';
import '../option/define';
import { DropdownAppearance, DropdownControlSize } from './dropdown.options.js';

type DropdownStoryArgs = Args & FluentDropdown;
type DropdownStoryMeta = Meta<DropdownStoryArgs>;

const FoodFish16Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.36 4.1c-1 1-1.58 2.34-1.91 3.68A16.66 16.66 0 0 0 8 11.73c0 .17-.14.32-.32.32-1.77 0-4.01.22-5.83 1.09-.68.32-.97 1-.82 1.63.13.6.61 1.09 1.26 1.25.8.19 1.72.44 2.52.72.4.15.76.3 1.05.44.3.15.49.28.58.37.1.1.22.28.37.58.15.29.3.65.44 1.05.28.8.53 1.72.72 2.52.16.65.65 1.13 1.25 1.26.64.14 1.3-.14 1.63-.82.87-1.82 1.08-4.06 1.1-5.82 0-.18.14-.33.32-.33 1.2 0 2.6-.1 3.95-.43a7.78 7.78 0 0 0 3.67-1.91 7.4 7.4 0 0 0 1.92-4.06c.25-1.45.2-2.92.1-4.09a3.77 3.77 0 0 0-3.41-3.4 15.68 15.68 0 0 0-4.1.09 7.4 7.4 0 0 0-4.05 1.91ZM16 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    fill="currentColor"
  ></path>
</svg>`;

const AnimalCat16Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.25 22H5.8a3.8 3.8 0 0 1-2.78-6.39l1.14-1.22a3.06 3.06 0 0 0-.08-4.25L2.97 9.03a.75.75 0 0 1 1.06-1.06l1.11 1.11a4.56 4.56 0 0 1 .11 6.34l-1.13 1.21A2.3 2.3 0 0 0 5.8 20.5h.67A23.84 23.84 0 0 1 7 15.45c.34-1.46.91-3 1.9-4.17a5.4 5.4 0 0 1 3.6-1.99V5.15A3.15 3.15 0 0 1 15.64 2C16.4 2 17 2.6 17 3.35V4h1.64c.95 0 1.83.5 2.33 1.3l.62 1a2.75 2.75 0 0 1-2.09 4.19v9.26c0 1.24-1 2.25-2.25 2.25h-.75v-2.25A3.75 3.75 0 0 0 12.74 16H11.5a.75.75 0 0 0 0 1.5h1.25c1.25 0 2.25 1 2.25 2.25V22H7.25Z"
    fill="currentColor"
  ></path>
</svg>`;

const AnimalTurtle16Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11 6a6.14 6.14 0 0 1 5.8 4.12l.07.24.05.14h2.33a2.75 2.75 0 0 1 2.74 2.58v1.17c0 .92-.7 1.67-1.6 1.74h-1.77l.24.6c.35.84-.01 1.8-.81 2.21l-.14.07c-.16.06-.32.1-.5.12h-1.95c-.63 0-1.2-.33-1.51-.86l-.08-.14-.53-1.14h.05c-1.4.18-2.82.2-4.22.06l-.5-.06L8.14 18c-.3.61-.9 1-1.59 1h-1.8a1.75 1.75 0 0 1-1.62-2.41l.44-1.05A3.24 3.24 0 0 1 2 12.75c0-.38.28-.7.64-.74l.1-.01h1.89l.5-1.64A6.14 6.14 0 0 1 11 6Zm6.77 9.7c-.77.3-1.55.56-2.35.76l-.55.13.36.77c.03.05.07.09.12.11l.05.02h1.84a.25.25 0 0 0 .25-.27l-.02-.07L17 16h-.05l.42-.15.4-.16Zm-13.55 0 .4.14.38.14-.48 1.17a.25.25 0 0 0 .23.34h1.86a.25.25 0 0 0 .17-.14l.36-.76h.04c-1-.2-2-.51-2.96-.9Zm-.2-1.7.15-.5h-.5l.02.05c.09.17.2.32.33.45Zm13.35-2 .76 2.5h2.12c.11 0 .21-.08.24-.2v-1.05c0-.65-.49-1.18-1.12-1.24h-.12L17.37 12Z"
    fill="currentColor"
  ></path>
</svg>`;

const AnimalDog16Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.88 8.66c.38.22.84.34 1.37.34.84 0 1.55-.3 2.04-.84.48-.53.7-1.22.7-1.91a.75.75 0 0 0-1.5 0c0 .38-.11.69-.3.9-.18.19-.48.35-.94.35-.45 0-.73-.16-.92-.37-.18-.21-.3-.5-.33-.84V4.25C11 3.01 12 2 13.25 2h3.18c.51 0 1.01.14 1.45.4l2.76 1.71c.22.14.36.38.36.64v1.5c0 1.24-1 2.25-2.25 2.25h-.25v9.53c.92.1 1.62.37 2.05.97.25.36.36.76.4 1.13.05.35.05.73.05 1.09v.03c0 .41-.34.75-.75.75H17v-.77c0-.58 0-2.21-1.5-3.17v-2.8a.75.75 0 0 0-1.5 0v2.26a4.62 4.62 0 0 0-.7-.02h-.09a.75.75 0 1 0 .08 1.5H13.5a1.94 1.94 0 0 1 .93.18c1.04.48 1.07 1.44 1.07 2.07V22H5.83a3.83 3.83 0 0 1-1.97-7.12.75.75 0 0 1 .78 1.28 2.33 2.33 0 0 0 1.2 4.34c.31 0 .51-.08.64-.18.14-.1.25-.23.33-.4a1.93 1.93 0 0 0 .19-.7v-.03a7.94 7.94 0 0 1 .03-.65c.04-.43.1-1.02.23-1.68.26-1.29.8-2.97 1.96-4.14a6.52 6.52 0 0 0 1.54-3.36l.12-.7Z"
    fill="currentColor"
  ></path>
</svg>`;

const dropdownTemplate = html<DropdownStoryArgs>`
  <div>
    <fluent-dropdown
      appearance="${x => x.appearance}"
      control-size="${x => x.controlSize}"
      ?disabled="${x => x.disabled}"
    >
      <fluent-option>Fish</fluent-option>
      <fluent-option>Cat</fluent-option>
      <fluent-option>Turtle</fluent-option>
      <fluent-option>Dog</fluent-option>
    </fluent-dropdown>
  </div>
`;

export default {
  title: 'Components/Dropdown',
  args: {
    appearance: DropdownAppearance.outline,
    controlSize: DropdownControlSize.medium,
    multiple: false,
    disabled: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(DropdownAppearance),
      control: {
        type: 'select',
      },
    },
    controlSize: {
      options: Object.values(DropdownControlSize),
      control: {
        type: 'select',
      },
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

export const DropdownAppearances = renderComponent(html<DropdownStoryArgs>`
  <div style="width: 290px; position: relative; display: flex; flex-direction: column; row-gap: 20px;">
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Outlined</fluent-label>
      <fluent-label>Select an animal</fluent-label>
      <fluent-dropdown placeholder="-">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Underlined</fluent-label>

      <fluent-label>Select an animal</fluent-label>
      <fluent-dropdown placeholder="-" appearance="underline">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
    <div
      style="display: flex; flex-direction: column; justify-content: center; padding: 20px; background-color: ${colorNeutralBackgroundInverted}"
    >
      <fluent-label size="large" style="margin-bottom: 10px; color: ${colorNeutralForegroundInverted2}"
        >Filled Darker</fluent-label
      >

      <fluent-label style="color: ${colorNeutralForegroundInverted2}">Select an animal</fluent-label>
      <fluent-dropdown placeholder="-" appearance="filled-darker">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
    <div
      style="display: flex; flex-direction: column; justify-content: center; padding: 20px; background-color: ${colorNeutralBackgroundInverted}"
    >
      <fluent-label size="large" style="margin-bottom: 10px; color: ${colorNeutralForegroundInverted2}"
        >Filled Lighter</fluent-label
      >
      <fluent-label style="color: ${colorNeutralForegroundInverted2}">Select an animal</fluent-label>
      <fluent-dropdown placeholder="-" appearance="filled-darker">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
  </div>
`);

export const DropdownWithIcons = renderComponent(html<DropdownStoryArgs>`
  <div style="width: 128px; position: relative;">
    <fluent-dropdown placeholder="-">
      <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
      <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
      <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      <fluent-option><span slot="icon">${AnimalDog16Filled}</span>Dog</fluent-option>
    </fluent-dropdown>
  </div>
`);

export const DropdownControlled = renderComponent(html<DropdownStoryArgs>`
  <div style="width: 290px; position: relative; display: flex; flex-direction: column; row-gap: 20px;">
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Controlled</fluent-label>
      <fluent-label>Select an Animal</fluent-label>
      <fluent-dropdown placeholder="-">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option selected><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
        <fluent-option><span slot="icon">${AnimalDog16Filled}</span>Dog</fluent-option>
      </fluent-dropdown>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Uncontrolled</fluent-label>
      <fluent-label>Select an Animal</fluent-label>
      <fluent-dropdown value="Cat">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
        <fluent-option><span slot="icon">${AnimalDog16Filled}</span>Dog</fluent-option>
      </fluent-dropdown>
    </div>
  </div>
`);

export const DropdownSizes = renderComponent(html<DropdownStoryArgs>`
  <div style="width: 290px; position: relative; display: flex; flex-direction: column; row-gap: 10px;">
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Small</fluent-label>
      <fluent-label size="small">Select an animal</fluent-label>
      <fluent-dropdown placeholder="-" control-size="small">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Medium</fluent-label>
      <fluent-label>Select an animal</fluent-label>
      <fluent-dropdown placeholder="-" control-size="medium">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
      <fluent-label size="large" style="margin-bottom: 10px;">Large</fluent-label>
      <fluent-label size="large">Select an animal</fluent-label>
      <fluent-dropdown placeholder="-" control-size="large">
        <fluent-option><span slot="icon">${FoodFish16Filled}</span>Fish</fluent-option>
        <fluent-option><span slot="icon">${AnimalCat16Filled}</span>Cat</fluent-option>
        <fluent-option><span slot="icon">${AnimalTurtle16Filled}</span>Turtle</fluent-option>
      </fluent-dropdown>
    </div>
  </div>
`);

export const DropdownDisabled = renderComponent(html<DropdownStoryArgs>`
  <div style="width: 128px; position: relative;">
    <fluent-dropdown disabled placeholder="-">
      <fluent-option>Fish</fluent-option>
      <fluent-option>Cat</fluent-option>
      <fluent-option>Turtle</fluent-option>
      <fluent-option>Dog</fluent-option>
    </fluent-dropdown>
  </div>
`);

export const DropdownDisabledItem = renderComponent(html<DropdownStoryArgs>`
  <div style="width: 128px; position: relative;">
    <fluent-dropdown placeholder="-">
      <fluent-option>Fish</fluent-option>
      <fluent-option disabled>Cat</fluent-option>
      <fluent-option>Turtle</fluent-option>
      <fluent-option>Dog</fluent-option>
    </fluent-dropdown>
  </div>
`);
