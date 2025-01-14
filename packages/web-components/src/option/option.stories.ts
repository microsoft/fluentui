import { html, repeat } from '@microsoft/fast-element';
import type { Meta, StoryArgs, StoryObj } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { toggleState } from '../utils/element-internals.js';
import { DropdownOption as FluentDropdownOption } from './option.js';

type Story = StoryObj<FluentDropdownOption>;

const storyTemplate = html<StoryArgs<FluentDropdownOption>>`
  <fluent-option
    ?selected="${story => story.selected}"
    ?disabled="${story => story.disabled}"
    id="${story => story.id}"
    name="${story => story.name}"
    ?required="${story => story.required}"
    slot="${story => story.slot}"
    text="${story => story.text}"
  >
    ${story => story.startSlottedContent?.()}${story => story.slottedContent?.()}${story =>
      story.descriptionSlottedContent?.()}
  </fluent-option>
`;

export default {
  title: 'Components/Dropdown/Option',
  render: renderComponent(storyTemplate),
  args: {
    disabled: false,
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Sets the selected state of the option',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the disabled state of the option',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    name: {
      control: 'text',
      description: 'The name of the option',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    text: {
      control: 'text',
      description: 'The text to display in the dropdown when the option is selected',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'The value of the option',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    selectedIndicatorContent: {
      control: false,
      description: 'Slot for selected indicator',
      name: 'indicator',
      table: { category: 'slots', type: {} },
    },
    slottedContent: {
      control: false,
      description: 'The content to display in the option',
      name: '',
      table: { category: 'slots', type: {} },
    },
    startSlottedContent: {
      control: false,
      description: 'The content to display at the start of the option',
      name: 'start',
      table: { category: 'slots', type: {} },
    },
    descriptionSlottedContent: {
      control: false,
      description: 'The content to display in the description slot',
      name: 'description',
      table: { category: 'slots', type: {} },
    },
  },
  decorators: [
    Story => {
      const story = Story() as DocumentFragment | FluentDropdownOption;
      if (story instanceof DocumentFragment) {
        story.querySelectorAll<FluentDropdownOption>('[id$="multiple"]').forEach(option => {
          toggleState(option.elementInternals, 'multiple', true);
        });
        return story;
      }

      if (story.matches('[id$="multiple"]')) {
        toggleState(story.elementInternals, 'multiple', true);
      }

      return story;
    },
  ],
} as Meta<FluentDropdownOption>;

export const Default: Story = {
  args: {
    slottedContent: () => 'Option',
  },
};

export const Multiple: Story = {
  args: {
    id: 'multiple',
    slottedContent: () => 'Multiple selection mode',
  },
};

export const Selected: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdownOption>>`
    ${repeat(
      [{ selected: true, id: 'selected-single', slottedContent: () => 'Selected' }],
      html<FluentDropdownOption>`${storyTemplate}<br />`,
    )}
  `),
};

export const SelectedMultiple: Story = {
  args: { id: 'selected-multiple', selected: true, slottedContent: () => 'Selected (multiple selection mode)' },
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdownOption>>`
    ${repeat(
      [
        { id: 'disabled-unselected-single', disabled: true, slottedContent: () => 'Disabled unselected' },
        { selected: true, disabled: true, id: 'disabled-selected-single', slottedContent: () => 'Disabled selected' },
      ],
      html<FluentDropdownOption>`${storyTemplate}<br />`,
    )}
  `),
};

export const DisabledMultiple: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdownOption>>`
    ${repeat(
      [
        {
          selected: false,
          disabled: true,
          id: 'disabled-unselected-multiple',
          slottedContent: () => 'Disabled unselected',
        },
        {
          selected: true,
          disabled: true,
          id: 'disabled-selected-multiple',
          slottedContent: () => 'Disabled selected',
        },
      ],
      html<FluentDropdownOption>`${storyTemplate}<br />`,
    )}
  `),
};

export const startContent: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdownOption>>`
    ${repeat(
      [
        {
          id: 'start-content-16px-avatar',
          selected: true,
          slottedContent: () => 'Option with 16px avatar',
          startSlottedContent: () => html`<fluent-avatar slot="start" size="16" color="blue">16</fluent-avatar>`,
        },
        {
          id: 'start-content-24px-avatar',
          selected: true,
          slottedContent: () => 'Option with 24px avatar',
          startSlottedContent: () => html`<fluent-avatar slot="start" size="24" color="blue">24</fluent-avatar>`,
        },
        {
          id: 'start-content-32px-with-description',
          selected: true,
          slottedContent: () => 'Option with 32px avatar',
          descriptionSlottedContent: () =>
            html`<span slot="description">Additional information is slotted in the description slot</span>`,
          startSlottedContent: () => html` <fluent-avatar slot="start" size="32" color="blue">32</fluent-avatar> `,
        },
      ],
      html<FluentDropdownOption>`${storyTemplate}<br />`,
    )}
  `),
};
