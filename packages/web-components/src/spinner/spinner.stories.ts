import { html } from '@microsoft/fast-element';
import { type NewMeta as Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';
import { Spinner as FluentSpinner } from './spinner.js';

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
    <div
      style="padding: 40px; background-color: var(--colorNeutralBackgroundInverted); color: var(--colorNeutralForegroundInverted);"
    >
      ${storyTemplate}
    </div>
  `),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    appearance: SpinnerAppearance.inverted,
  },
};

export const TinySize: Story = {
  args: {
    size: SpinnerSize.tiny,
  },
};

export const ExtraSmallSize: Story = {
  args: {
    size: SpinnerSize.extraSmall,
  },
};

export const SmallSize: Story = {
  args: {
    size: SpinnerSize.small,
  },
};

export const MediumSize: Story = {
  args: {
    size: SpinnerSize.medium,
  },
};

export const LargeSize: Story = {
  args: {
    size: SpinnerSize.large,
  },
};

export const ExtraLargeSize: Story = {
  args: {
    size: SpinnerSize.extraLarge,
  },
};

export const HugeSize: Story = {
  args: {
    size: SpinnerSize.huge,
  },
};
