import { Image } from '../index';
import type { Meta } from '@storybook/react';
import descriptionMd from './ImageDescription.md';

export { Default } from './ImageDefault.stories';
export { ImageShape } from './ImageShape.stories';
export { ImageBorderVariations } from './ImageBorderVariations.stories';
export { ImageFallback } from './ImageFallback.stories';
export { ImageBlock } from './ImageBlock.stories';
export { ImageLayoutFit } from './ImageLayoutFit.stories';
export { ImageShadow } from './ImageShadow.stories';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
