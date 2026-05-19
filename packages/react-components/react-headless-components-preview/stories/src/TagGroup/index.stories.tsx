import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';

import descriptionMd from './TagGroupDescription.md';
export { Default } from './TagGroupDefault.stories';

export default {
  title: 'Components/TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
