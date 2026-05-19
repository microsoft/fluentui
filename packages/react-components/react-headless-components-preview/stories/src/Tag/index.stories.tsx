import { Tag } from '@fluentui/react-headless-components-preview/tag';

import descriptionMd from './TagDescription.md';
export { Default } from './TagDefault.stories';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
