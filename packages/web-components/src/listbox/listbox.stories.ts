import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { DropdownOption as FluentOption } from '../option/option.js';
import type { Listbox as FluentListbox } from './listbox.js';

type Story = StoryObj<FluentListbox>;

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option value="${x => x.value}">${x => x.storyContent}</fluent-option>
`;

const storyTemplate = html<StoryArgs<FluentListbox>>`
  <fluent-listbox id="${story => story.id}"> ${story => story.slottedContent?.()} </fluent-listbox>
`;

export default {
  title: 'Components/Dropdown/Listbox',
  render: renderComponent(storyTemplate),
  argTypes: {
    slottedContent: { table: { disable: true } },
  },
} as Meta<FluentListbox>;

export const Default: Story = {
  args: {
    slottedContent: () =>
      html`${repeat(
        [
          { value: 'apple', storyContent: 'Apple' },
          { value: 'banana', storyContent: 'Banana' },
          { value: 'orange', storyContent: 'Orange' },
          { value: 'mango', storyContent: 'Mango' },
          { value: 'kiwi', storyContent: 'Kiwi' },
          { value: 'cherry', storyContent: 'Cherry' },
          { value: 'grapefruit', storyContent: 'Grapefruit' },
          { value: 'papaya', storyContent: 'Papaya' },
          { value: 'lychee', storyContent: 'Lychee' },
        ],
        optionTemplate,
      )}`,
  },
};

export const MultipleSelection: Story = {
  args: { ...Default.args },
  decorators: [
    Story => {
      const story = Story() as FluentListbox;
      setTimeout(() => {
        story.multiple = true;
      }, 0);

      return story;
    },
  ],
};
