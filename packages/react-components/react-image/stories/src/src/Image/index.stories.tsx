import { Image } from '@fluentui/react-components';
import type { Meta } from '@storybook/react';
import descriptionMd from './ImageDescription.md';
import bestPracticesMd from './ImageBestPractices.md';
export { Default } from './ImageDefault.stories';
export { Shape } from './ImageShape.stories';
export { Bordered } from './ImageBordered.stories';
export { Fallback } from './ImageFallback.stories';
export { Block } from './ImageBlock.stories';
export { Fit } from './ImageFit.stories';
export { Shadow } from './ImageShadow.stories';

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
