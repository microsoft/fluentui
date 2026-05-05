import { Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-headless-components-preview/card';

import descriptionMd from './CardDescription.md';
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
  },
};
