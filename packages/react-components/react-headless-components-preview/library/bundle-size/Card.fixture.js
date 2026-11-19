// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
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

console.log(
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
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
);

export default {
  name: '@fluentui/react-headless-components-preview/card',
};
