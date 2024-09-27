import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Image as FluentImage } from './image.js';
import { ImageFit, ImageShape } from './image.options.js';

type Story = StoryObj<FluentImage>;

const imageTemplate = html<StoryArgs<FluentImage>>`
  <fluent-image
    ?block="${story => story.block}"
    ?bordered="${story => story.bordered}"
    fit="${story => story.fit}"
    ?shadow="${story => story.shadow}"
    shape="${story => story.shape}"
  >
    ${story => story.slottedContent?.()}
  </fluent-image>
`;

export default {
  title: 'Components/Image',
  render: renderComponent(imageTemplate),
  args: {
    slottedContent: () => html`<img alt="Short image description" src="300x100.png" />`,
  },
  argTypes: {
    block: {
      control: 'boolean',
      description:
        'An image can use the argument ‘block’ so that it’s width will expand to fill the available container space.',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Border surrounding image',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fit: {
      control: 'select',
      description: 'Determines how the image will be scaled and positioned within its parent container.',
      name: 'size',
      mapping: { '': null, ...ImageFit },
      options: ['', ...Object.values(ImageFit)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(ImageFit).join('|') },
      },
    },
    shadow: {
      control: 'boolean',
      description: 'Apply an optional box shadow to further separate the image from the background.',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    shape: {
      control: 'select',
      description: 'Image Shape',
      name: 'size',
      mapping: { '': null, ...ImageShape },
      options: ['', ...Object.values(ImageShape)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(ImageShape).join('|') },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentImage>;

export const Default = {};

// Block layout
const imageLayoutBlock = html<StoryArgs<FluentImage>>`
  <div style="border: 1px dotted #43ED35;">
    <fluent-image block bordered>
      <img role="presentation" src="958x20.png" />
      <img role="presentation" src="100x100.png" />
    </fluent-image>
  </div>
`;
export const BlockLayout: Story = { render: renderComponent(imageLayoutBlock) };

// Fit: None
const imageFitNoneLarge = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="none">
      <img role="presentation" src="600x200.png" />
    </fluent-image>
  </div>
`;
export const ImageFitNoneLarge: Story = { render: renderComponent(imageFitNoneLarge).bind({}) };

const imageFitNoneSmall = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="none">
      <img alt="200x100 placeholder" src="200x100.png" />
    </fluent-image>
  </div>
`;
export const ImageFitNoneSmall: Story = { render: renderComponent(imageFitNoneSmall).bind({}) };

// Fit: Center
const imageFitCenterLarge = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image fit="center">
      <img role="presentation" src="600x200.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCenterLarge: Story = { render: renderComponent(imageFitCenterLarge).bind({}) };

const imageFitCenterSmall = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image fit="center">
      <img alt="image layout story" src="300x100.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCenterSmall: Story = { render: renderComponent(imageFitCenterSmall).bind({}) };

const imageFitContain = html<StoryArgs<FluentImage>>`
  <div style="height:200px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="contain">
      <img alt="image layout story" src="400x200.png" />
    </fluent-image>
  </div>
`;
export const ImageFitContain: Story = { render: renderComponent(imageFitContain).bind({}) };

const imageFitContainTall = html<StoryArgs<FluentImage>>`
  <div style="height: 250px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="contain">
      <img alt="image layout story" src="400x200.png" />
    </fluent-image>
  </div>
`;
export const ImageFitContainTall: Story = { render: renderComponent(imageFitContainTall).bind({}) };

const imageFitContainWide = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 450px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="contain">
      <img alt="image layout story" src="400x200.png" />
    </fluent-image>
  </div>
`;
export const ImageFitContainWide: Story = { render: renderComponent(imageFitContainWide).bind({}) };

// Fit: Cover
const imageFitCoverSmall = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="cover">
      <img alt="image layout story" src="400x250.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCoverSmall: Story = { render: renderComponent(imageFitCoverSmall).bind({}) };

const imageFitCoverMedium = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="cover">
      <img alt="image layout story" src="400x300.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCoverMedium: Story = { render: renderComponent(imageFitCoverMedium).bind({}) };

const imageFitCoverLarge = html<StoryArgs<FluentImage>>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="cover">
      <img alt="image layout story" src="600x200.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCoverLarge: Story = { render: renderComponent(imageFitCoverLarge).bind({}) };

// Fit: Default
const imageFitDefault = html<StoryArgs<FluentImage>>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="default">
      <img alt="image layout story" src="150x150.png" />
    </fluent-image>
  </div>
`;
export const ImageFitDefault: Story = { render: renderComponent(imageFitDefault).bind({}) };
