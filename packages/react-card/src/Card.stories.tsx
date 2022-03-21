import { Card, CardFooter, CardHeader, CardPreview } from './index';
import descriptionMd from './CardDescription.md';

export { Default } from './stories/CardDefault.stories';
export { AppearanceCard } from './stories/CardAppearance.stories';
export { ActionCard } from './stories/CardAction.stories';
export { GridCard } from './stories/CardGrid.stories';

export default {
  title: 'Preview Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  subcomponents: { CardHeader, CardPreview, CardFooter },
};
