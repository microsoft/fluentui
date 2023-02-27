import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Image as FluentImage } from './image.js';
import { ImageFit, ImageShape } from './image.options.js';
import './define.js';

type ImageStoryArgs = Args & FluentImage;
type ImageStoryMeta = Meta<ImageStoryArgs>;

const imageTemplate = html<ImageStoryArgs>`
  <div style="padding: 48px 24px; background-color: rgb(250, 250, 250);">
    <fluent-image
      ?block=${x => x.block}
      ?bordered=${x => x.bordered}
      fit=${x => x.fit}
      ?shadow=${x => x.shadow}
      shape=${x => x.shape}
    >
      <img alt="Short image description" src="https://via.placeholder.com/300x100/ddd.png" />
    </fluent-image>
  </div>
`;

export default {
  title: 'Components/Image',
  args: {
    block: false,
    bordered: false,
    shadow: false,
    fit: ImageFit.default,
    shape: ImageShape.square,
  },
  argTypes: {
    alt: {
      description: 'Alternate text description -- to be supplied by component consumer',
      table: {
        type: {
          summary:
            'Required. Alt tag provides text attribution for images. Should be brief but accurate—one or two sentences that describe the image and its context. If the image represents a function, be sure to indicate that. If it’s meant to be consumed with other objects on the page, consider that as well. Don’t repeat information that’s on the page in alt text since screen readers will read it twice.',
        },
      },
    },
    block: {
      description:
        'An image can use the argument ‘block’ so that it’s width will expand to fiill the available container space.',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    bordered: {
      description: 'Border surrounding image',
      table: {
        type: {
          summary: 'Use this option to provide minimal visual separation between image and surrounding content.',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    fit: {
      description: 'Determines how the image will be scaled and positioned within its parent container.',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
      options: Object.values(ImageFit),
      control: 'select',
    },
    role: {
      description: 'Aria role -- to be supplied by component consumer',
      table: {
        type: {
          summary:
            'If images are solely decorative and don’t provide useful information or context, use role=”presentation” to hide them from assistive technologies.',
        },
      },
    },
    shadow: {
      description: 'Apply an optional box shadow to further separate the image from the background.',
      table: {
        type: {
          summary:
            'To give an image additional prominence, use the shadow prop to make it appear elevated. Too many shadows can cause a busy layout, so use them sparingly.',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    shape: {
      description: 'Image shape',
      table: {
        defaultValue: {
          summary: 'square',
        },
      },
      options: Object.values(ImageShape),
      control: 'select',
    },
    src: {
      description: 'Image source -- to be supplied by component consumer',
      table: {
        type: {
          summary: 'Required',
        },
      },
    },
  },
} as ImageStoryMeta;

export const Image = renderComponent(imageTemplate).bind({});

// Block layout
const imageLayoutBlock = html<ImageStoryArgs>`
  <div style="border: 1px dotted #43ED35;">
    <fluent-image block bordered>
      <img role="presentation" src="https://via.placeholder.com/958x20/ddd.png" />
      <img role="presentation" src="https://via.placeholder.com/100x100/ddd.png" />
    </fluent-image>
  </div>
`;
export const BlockLayout = renderComponent(imageLayoutBlock).bind({});

// Fit: None
const imageFitNoneLarge = html<ImageStoryArgs>`
  <div style="height: 150px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="none">
      <img role="presentation" src="https://via.placeholder.com/600x200/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitNoneLarge = renderComponent(imageFitNoneLarge).bind({});

const imageFitNoneSmall = html<ImageStoryArgs>`
  <div style="height: 150px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="none">
      <img alt="200x100 placeholder" src="https://via.placeholder.com/200x100/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitNoneSmall = renderComponent(imageFitNoneSmall).bind({});

// Fit: Center
const imageFitCenterLarge = html<ImageStoryArgs>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="center">
      <img role="presentation" src="https://via.placeholder.com/600x200/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCenterLarge = renderComponent(imageFitCenterLarge).bind({});

const imageFitCenterSmall = html<ImageStoryArgs>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="center">
      <img alt="image layout story" src="https://via.placeholder.com/200x100/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCenterSmall = renderComponent(imageFitCenterSmall).bind({});

const imageFitContain = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="contain">
      <img alt="image layout story" src="https://via.placeholder.com/400x200/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitContain = renderComponent(imageFitContain).bind({});

const imageFitContainTall = html<ImageStoryArgs>`
  <div style="height: 250px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="contain">
      <img alt="image layout story" src="https://via.placeholder.com/400x200/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitContainTall = renderComponent(imageFitContainTall).bind({});

const imageFitContainWide = html<ImageStoryArgs>`
  <div style="height: 200px; width: 450px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="contain">
      <img alt="image layout story" src="https://via.placeholder.com/400x200/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitContainWide = renderComponent(imageFitContainWide).bind({});

// Fit: Cover
const imageFitCoverSmall = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="cover">
      <img alt="image layout story" src="https://via.placeholder.com/400x250/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCoverSmall = renderComponent(imageFitCoverSmall).bind({});

const imageFitCoverMedium = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="cover">
      <img alt="image layout story" src="https://via.placeholder.com/400x300/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCoverMedium = renderComponent(imageFitCoverMedium).bind({});

const imageFitCoverLarge = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="cover">
      <img alt="image layout story" src="https://via.placeholder.com/600x200/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitCoverLarge = renderComponent(imageFitCoverLarge).bind({});

// Fit: Default
const imageFitDefault = html<ImageStoryArgs>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image bordered fit="default">
      <img alt="image layout story" src="https://via.placeholder.com/150/ddd.png" />
    </fluent-image>
  </div>
`;
export const ImageFitDefault = renderComponent(imageFitDefault).bind({});
