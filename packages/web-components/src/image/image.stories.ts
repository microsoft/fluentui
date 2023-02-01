import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Image as FluentImage } from './image.js';
import { ImageFit, ImageShape } from './image.options.js';
import './define.js';

type ImageStoryArgs = Args & FluentImage;
type ImageStoryMeta = Meta<ImageStoryArgs>;

const imageTemplate = html<ImageStoryArgs>`
  <fluent-image
    ?alt=${x => x.alt}
    ?block=${x => x.block}
    ?border=${x => x.border}
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
    fit: ImageFit.default,
    margin: true,
    role: '',
    shadow: false,
    shape: ImageShape.square,
    src: '',
  },
  argTypes: {
    alt: {},
    block: {},
    border: {},
    fit: {
      description: 'Image fit',
      table: {
        type: {
          summary: 'Description of image read by screen reader',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    margin: {},
    role: {},
    shadow: {},
    shape: {
      description: 'Image shape',
      table: {
        defaultValue: {
          summary: 'square',
        },
      },
    },
    src: {},
  },
} as ImageStoryMeta;

export const Image = renderComponent(imageTemplate).bind({});
