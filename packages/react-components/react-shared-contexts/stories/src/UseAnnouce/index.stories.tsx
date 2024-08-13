import descriptionMd from './UseAnnounceDescription.md';

export { Default } from './UseAnnounceDefault.stories';

export default {
  title: 'Utilities/ARIA live/useAnnounce',
  component: null,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
