export { Card, cardClassNames, useCardStyles } from './components/Card';
export type {
  CardAppearance,
  CardContextValue,
  CardOnSelectionChangeEvent,
  CardOrientation,
  CardProps,
  CardSize,
  CardSlots,
  CardState,
} from './components/Card';

export { CardFooter, cardFooterClassNames, useCardFooterStyles } from './components/CardFooter';
export type { CardFooterProps, CardFooterSlots, CardFooterState } from './components/CardFooter';

export { CardHeader, cardHeaderClassNames, useCardHeaderStyles } from './components/CardHeader';
export type { CardHeaderProps, CardHeaderSlots, CardHeaderState } from './components/CardHeader';

export { CardPreview, cardPreviewClassNames, useCardPreviewStyles } from './components/CardPreview';
export type { CardPreviewProps, CardPreviewSlots, CardPreviewState } from './components/CardPreview';

/** Headless building blocks, re-exported for consumers composing their own Card. */
export {
  renderCard,
  renderCardFooter,
  renderCardHeader,
  renderCardPreview,
  useCard,
  useCardContext,
  useCardContextValue,
  useCardFooter,
  useCardHeader,
  useCardPreview,
} from '@fluentui/react-headless-components-preview/card';
