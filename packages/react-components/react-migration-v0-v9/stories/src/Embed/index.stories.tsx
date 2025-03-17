import { Embed } from '@fluentui/react-migration-v0-v9';

// import descriptionMd from './EmbedDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Migration Shims/V0/Embed',
  component: Embed,
  parameters: {
    docs: {
      description: {
        // component: [descriptionMd].join('\n'),
      },
    },
  },
};
