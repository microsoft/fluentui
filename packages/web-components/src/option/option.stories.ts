import { html, repeat } from '@microsoft/fast-element';
import type { Meta, StoryArgs, StoryObj } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { toggleState } from '../utils/element-internals.js';
import { Option as FluentOption } from './option.js';

type Story = StoryObj<FluentOption>;

const storyTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option
    ?selected="${story => story.selected}"
    ?disabled="${story => story.disabled}"
    id="${story => story.id}"
    name="${story => story.name}"
    ?required="${story => story.required}"
    slot="${story => story.slot}"
    text="${story => story.text}"
  >
    ${story => story.slottedContent?.()}
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
    selectedIndicatorContent: {
      control: false,
      description: 'Slot for selected indicator',
      name: 'indicator',
      table: { category: 'slots', type: {} },
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
  },
  decorators: [
    Story => {
      const story = Story() as DocumentFragment | FluentOption;
      if (story instanceof DocumentFragment) {
        story.querySelectorAll<FluentOption>('[id$="multiple"]').forEach(option => {
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
} as Meta<FluentOption>;

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
  render: renderComponent(html<StoryArgs<FluentOption>>`
    ${repeat(
      [{ selected: true, id: 'selected-single', slottedContent: () => 'Selected' }],
      html<FluentOption>`${storyTemplate}<br />`,
    )}
  `),
};

export const SelectedMultiple: Story = {
  args: { id: 'selected-multiple', selected: true, slottedContent: () => 'Selected (multiple selection mode)' },
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentOption>>`
    ${repeat(
      [
        { id: 'disabled-unselected-single', disabled: true, slottedContent: () => 'Disabled unselected' },
        { selected: true, disabled: true, id: 'disabled-selected-single', slottedContent: () => 'Disabled selected' },
      ],
      html<FluentOption>`${storyTemplate}<br />`,
    )}
  `),
};

export const DisabledMultiple: Story = {
  render: renderComponent(html<StoryArgs<FluentOption>>`
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
      html<FluentOption>`${storyTemplate}<br />`,
    )}
  `),
};
