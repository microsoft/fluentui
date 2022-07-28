import { Card } from '@fluentui/react-card';
import descriptionMd from './CardDescription.md';

export { Default } from './CardDefault.stories';
export { Appearance } from './CardAppearance.stories';
export { FocusMode } from './CardFocusMode.stories';
export { Orientation } from './CardOrientation.stories';
export { Size } from './CardSize.stories';
export { Templates } from './CardTemplates.stories';

export default {
  title: 'Preview Components/Card/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
