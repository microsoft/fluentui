import { Attachment } from '@fluentui/react-migration-v0-v9';

import descriptionMd from './AttachmentDescription.md';

export { Default as DefaultAttachment } from './Default.stories';
export { Action } from './Action.stories';
export { Actionable } from './Actionable.stories';
export { Header } from './Header.stories';
export { Description } from './Description.stories';
export { Icon } from './Icon.stories';
export { Progress } from './Progress.stories';

export default {
  title: 'Migration Shims/V0/Attachment',
  component: Attachment,
  args: {
    layout: 'verr',
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
