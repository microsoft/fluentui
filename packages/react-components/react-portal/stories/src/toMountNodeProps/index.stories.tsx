import descriptionMd from './toMountNodePropsDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Components/Portal/toMountNodeProps',
  component: null,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
