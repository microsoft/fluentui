import { Image } from '@fluentui/react-headless-components-preview/image';

import descriptionMd from './ImageDescription.md';

export { Default } from './ImageDefault.stories';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
