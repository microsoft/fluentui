import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Image as FluentImage } from './image.js';
import {} from './image.options.js';
import './define.js';

type ImageStoryArgs = Args & FluentImage;
type ImageStoryMeta = Meta<ImageStoryArgs>;

const imageTemplate = html<ImageStoryArgs>`
  <div>
    <fluent-image alt=${x => x.alt}> ${x => x.content} </fluent-image>
  </div>
`;

export default {
  title: 'Components/Image',
  args: {
    alt: 'image description',
  },
  argTypes: {
    content: {
      description: 'Image element',
      table: {
        defaultValue: {
          summary: 'empty',
        },
      },
    },
    alt: {
      description: 'Image alt content',
      table: {
        type: {
          summary: 'Description of image read by screen reader',
        },
        defaultValue: {
          summary: 'empty',
        },
      },
    },
  },
} as ImageStoryMeta;

export const Image = renderComponent(imageTemplate).bind({});
