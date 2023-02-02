import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Image as FluentImage } from './image.js';
import { BorderRadius, ImageFit, ImageShape } from './image.options.js';
import './define.js';

type ImageStoryArgs = Args & FluentImage;
type ImageStoryMeta = Meta<ImageStoryArgs>;

const imageTemplate = html<ImageStoryArgs>`
  <fluent-image
    ?alt=${x => x.alt}
    ?block=${x => x.block}
    ?border=${x => x.border}
    borderRadius=${x => x.borderRadius}
    fit=${x => x.fit}
    ?margin=${x => x.margin}
    ?role=${x => x.role}
    ?shadow=${x => x.shadow}
    shape=${x => x.shape}
    src=${x => x.src}
  >
  </fluent-image>
`;

export default {
  title: 'Components/Image',
  args: {
    alt: 'Short image description',
    block: true,
    border: true,
    borderRadius: 'small',
    fit: ImageFit.default,
    margin: true,
    role: '',
    shadow: false,
    shape: ImageShape.square,
    src: 'https://via.placeholder.com/200/ddd.png',
  },
  argTypes: {
    alt: {
      description: 'Alternate text description',
      table: {
        type: {
          summary:
            'Alt tag provides text attribution for images. Alt text should be brief but accurate—one or two sentences that describe the image and its context. If the image represents a function, be sure to indicate that. If it’s meant to be consumed with other objects on the page, consider that as well. Don’t repeat information that’s on the page in alt text since screen readers will read it twice.',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    block: {
      description: 'Layout style',
      table: {
        type: {
          summary:
            'An image can use the prop ‘Block’ so that it’s width will expand to fiill the available container space.',
        },
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
      description: 'Border radius',
      table: {
        type: {
          summary: '',
        },
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
        type: {
          summary: 'Two',
        },
        defaultValue: {
          summary: 'default',
        },
      },
      options: Object.values(ImageFit),
      control: 'select',
    },
    margin: {
      description: '',
      table: {
        type: {
          summary: '',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    role: {
      description: 'Aria role for image element',
      table: {
        type: {
          summary:
            'If images are solely decorative and don’t provide useful information or context, use role=”presentation” to hide them from assistive technologies.',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    shadow: {
      description: 'Apply a box shadow to further separate the image from the background.',
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
        type: {
          summary: '',
        },
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
          summary: '',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
} as ImageStoryMeta;

export const Image = renderComponent(imageTemplate).bind({});
