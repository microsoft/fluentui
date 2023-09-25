import { CardPreview } from '@fluentui/react-components';
import descriptionMd from './CardPreviewDescription.md';

export { Default } from './CardPreviewDefault.stories';

export default {
  title: 'Components/Card/CardPreview',
  component: CardPreview,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
