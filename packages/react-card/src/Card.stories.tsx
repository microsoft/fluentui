import { Card, CardFooter, CardHeader, CardPreview } from './index';

export { Default } from './stories/CardDefault.stories';
export { ActionCard } from './stories/CardAction.stories';
export { GridCard } from './stories/CardGrid.stories';

export default {
  title: 'Preview Components/Card',
  component: Card,
  subcomponents: { CardHeader, CardPreview, CardFooter },
};
