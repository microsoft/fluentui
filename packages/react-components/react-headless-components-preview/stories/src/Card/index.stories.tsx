import { Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-headless-components-preview/card';

import descriptionMd from './CardDescription.md';
import cardCss from './card.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './CardDefault.stories';
export { Selectable } from './CardSelectable.stories';
export { Disabled } from './CardDisabled.stories';

export default {
  title: 'Headless Components/Card',
  component: Card,
  subcomponents: { CardHeader, CardPreview, CardFooter },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'card.module.css', source: cardCss }),
  },
};
