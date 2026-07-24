import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';

import descriptionMd from './TagGroupDescription.md';

import { getBrowserSupportNotice } from '../../shared/browserSupportNotice';

export { Default } from './TagGroupDefault.stories';
export { Dismiss } from './TagGroupDismiss.stories';
export { Disabled } from './TagGroupDisabled.stories';
export { Select } from './TagGroupSelect.stories';

export default {
  title: 'Components/Tags/TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('TagGroup')].join('\n'),
      },
    },
  },
};
