import { Video } from '@fluentui/react-migration-v0-v9';

import descriptionMd from './VideoDescription.md';

export { Default as DefaultVideo } from './Default.stories';
export { AutoPlay } from './AutoPlay.stories';
export { Muted } from './Muted.stories';
export { WithPoster } from './WithPoster.stories';

export default {
  title: 'Migration Shims/V0/Video',
  component: Video,
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
