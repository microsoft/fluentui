import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';
import type { Spinner as FluentSpinner } from './spinner.js';

type Story = StoryObj<FluentSpinner>;

const storyTemplate = html<StoryArgs<FluentSpinner>>`
  <fluent-spinner appearance="${story => story.appearance}" size="${story => story.size}"></fluent-spinner>
`;

export default {
  title: 'Components/Spinner',
  render: renderComponent(storyTemplate),
  argTypes: {
    appearance: {
      control: 'select',
      description: 'The appearance of the spinner',
      options: ['', ...Object.values(SpinnerAppearance)],
      mapping: { '': null, ...SpinnerAppearance },
      table: {
        category: 'attributes',
        type: { summary: Object.values(SpinnerAppearance).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the spinner',
      options: ['', ...Object.values(SpinnerSize)],
      mapping: { '': null, ...SpinnerSize },
      table: {
        category: 'attributes',
        type: { summary: Object.values(SpinnerSize).join('|') },
      },
    },
  },
} as Meta<FluentSpinner>;

export const Default: Story = {};

export const InvertedAppearance: Story = {
  render: renderComponent(html<StoryArgs<FluentSpinner>>`
    <div style="padding: 40px; background-color: #0F6CBD; color: white;">${storyTemplate}</div>
  `),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    appearance: SpinnerAppearance.inverted,
  },
};

export const Size: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { size: SpinnerSize.tiny },
      { size: SpinnerSize.extraSmall },
      { size: SpinnerSize.small },
      { size: SpinnerSize.medium },
      { size: SpinnerSize.large },
      { size: SpinnerSize.extraLarge },
      { size: SpinnerSize.huge },
    ],
  },
};
