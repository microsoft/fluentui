import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Image as FluentImage } from './image.js';
import { BorderRadius, ImageFit, ImageShape } from './image.options.js';
import './define.js';

type ImageStoryArgs = Args & FluentImage;
type ImageStoryMeta = Meta<ImageStoryArgs>;

const imageTemplate = html<ImageStoryArgs>`
  <div style="padding: 48px 24px; background-color: rgb(250, 250, 250);">
    <fluent-image
      ?alt=${x => x.alt}
      ?block=${x => x.block}
      ?border=${x => x.border}
      borderRadius=${x => x.borderRadius}
      fit=${x => x.fit}
      ?margin=${x => x.margin}
      ?presentation=${x => x.presentation}
      ?shadow=${x => x.shadow}
      shape=${x => x.shape}
      src=${x => x.src}
    >
    </fluent-image>
  </div>
`;

export default {
  title: 'Components/Image',
  args: {
    alt: 'Short image description',
    block: false,
    border: false,
    borderRadius: 'small',
    fit: ImageFit.default,
    margin: false,
    presentation: true,
    shadow: false,
    shape: ImageShape.square,
    src: 'https://via.placeholder.com/200x100/ddd.png',
  },
  argTypes: {
    alt: {
      description: 'Alternate text description',
      table: {
        type: {
          summary:
            'Required. Alt tag provides text attribution for images. Should be brief but accurate—one or two sentences that describe the image and its context. If the image represents a function, be sure to indicate that. If it’s meant to be consumed with other objects on the page, consider that as well. Don’t repeat information that’s on the page in alt text since screen readers will read it twice.',
        },
        defaultValue: {
          summary: '',
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
    border: {
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
    borderRadius: {
      description: 'Optional border radius',
      table: {
        defaultValue: {
          summary: 'thin',
        },
      },
      options: Object.values(BorderRadius),
      control: 'select',
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
    margin: {
      description: 'Optional 16px margin',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    presentation: {
      description: 'Aria role for image element',
      table: {
        type: {
          summary:
            'If images are solely decorative and don’t provide useful information or context, use role=”presentation” to hide them from assistive technologies.',
        },
        defaultValue: {
          summary: false,
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
      description: 'Image source',
      table: {
        type: {
          summary: 'Required',
        },
      },
    },
  },
} as ImageStoryMeta;

export const Image = renderComponent(imageTemplate).bind({});

// Fit: None
const imageFitNoneLarge = html<ImageStoryArgs>`
  <div style="height: 150px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image presentation border="true" fit="none" src="https://via.placeholder.com/600x200/ddd.png">
    </fluent-image>
  </div>
`;
export const ImageFitNoneLarge = renderComponent(imageFitNoneLarge).bind({});

const imageFitNoneSmall = html<ImageStoryArgs>`
  <div style="height: 150px; width: 300px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="none" src="https://via.placeholder.com/200x100/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitNoneSmall = renderComponent(imageFitNoneSmall).bind({});

// Fit: Center
const imageFitCenterLarge = html<ImageStoryArgs>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="center" src="https://via.placeholder.com/600x200/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitCenterLarge = renderComponent(imageFitCenterLarge).bind({});

const imageFitCenterSmall = html<ImageStoryArgs>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="center" src="https://via.placeholder.com/200x100/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitCenterSmall = renderComponent(imageFitCenterSmall).bind({});

// Fit: Contain
const imageFitContain = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="contain" src="https://via.placeholder.com/400x200/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitContain = renderComponent(imageFitContain).bind({});

const imageFitContainTall = html<ImageStoryArgs>`
  <div style="height: 250px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="contain" src="https://via.placeholder.com/400x200/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitContainTall = renderComponent(imageFitContainTall).bind({});

const imageFitContainWide = html<ImageStoryArgs>`
  <div style="height: 200px; width: 450px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="contain" src="https://via.placeholder.com/400x200/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitContainWide = renderComponent(imageFitContainWide).bind({});

// Fit: Cover
const imageFitCoverSmall = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="cover" src="https://via.placeholder.com/400x250/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitCoverSmall = renderComponent(imageFitCoverSmall).bind({});

const imageFitCoverMedium = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="cover" src="https://via.placeholder.com/400x300/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitCoverMedium = renderComponent(imageFitCoverMedium).bind({});

const imageFitCoverLarge = html<ImageStoryArgs>`
  <div style="height: 200px; width: 400px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="cover" src="https://via.placeholder.com/600x200/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitCoverLarge = renderComponent(imageFitCoverLarge).bind({});

// Fit: Default
const imageFitDefault = html<ImageStoryArgs>`
  <div style="height: 210px; width: 650px; border: 1px dotted #43ED35;">
    <fluent-image border="true" fit="default" src="https://via.placeholder.com/150/ddd.png"> </fluent-image>
  </div>
`;
export const ImageFitDefault = renderComponent(imageFitDefault).bind({});
