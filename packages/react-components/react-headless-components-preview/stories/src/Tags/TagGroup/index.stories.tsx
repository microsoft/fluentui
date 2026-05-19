import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';

import descriptionMd from './TagGroupDescription.md';
export { Default } from './TagGroupDefault.stories';

export default {
  title: 'Components/Tags/TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
