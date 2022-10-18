import { CardPreview } from '@fluentui/react-card';
import descriptionMd from './CardPreviewDescription.md';

export { Default } from './CardPreviewDefault.stories';

export default {
  title: 'Preview Components/Card/CardPreview',
  component: CardPreview,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
