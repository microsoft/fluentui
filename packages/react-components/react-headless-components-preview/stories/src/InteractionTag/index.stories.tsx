import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';

import descriptionMd from './InteractionTagDescription.md';
export { Default } from './InteractionTagDefault.stories';

export default {
  title: 'Components/InteractionTag',
  component: InteractionTag,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
