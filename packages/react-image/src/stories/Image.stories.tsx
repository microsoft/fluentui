import { Image } from '../index';
import type { Meta } from '@storybook/react';
import descriptionMd from './ImageDescription.md';
import bestPracticesMd from './ImageBestPractices.md';

export { Default } from './ImageDefault.stories';
export { ImageAppearanceShape } from './ImageApperanceShape.stories';
export { ImageBorderVariations } from './ImageBorderVariations.stories';
export { ImageFallback } from './ImageFallback.stories';
export { ImageFluid } from './ImageFluid.stories';
export { ImageLayoutFit } from './ImageLayoutFit.stories';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
