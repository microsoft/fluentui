import { Tag } from '@fluentui/react-headless-components-preview/tag';

import descriptionMd from './TagDescription.md';
export { Default } from './TagDefault.stories';
export { Icon } from './TagIcon.stories';
export { Media } from './TagMedia.stories';
export { SecondaryText } from './TagSecondaryText.stories';
export { Dismiss } from './TagDismiss.stories';
export { Disabled } from './TagDisabled.stories';
export { Selected } from './TagSelected.stories';

export default {
  title: 'Components/Tags/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
