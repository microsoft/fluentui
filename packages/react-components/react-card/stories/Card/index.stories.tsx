import { Card } from '@fluentui/react-card';
import descriptionMd from './CardDescription.md';
import cardBestpracticesMd from './CardBestPractices.md';
import previewMd from './CardPreview.md';

export { Default } from './CardDefault.stories';
export { Orientation } from './CardOrientation.stories';
export { Size } from './CardSize.stories';
export { Appearance } from './CardAppearance.stories';
export { Selectable } from './CardSelectable.stories';
export { SelectableIndicator } from './CardSelectableIndicator.stories';
export { FocusMode } from './CardFocusMode.stories';
export { Templates } from './CardTemplates.stories';

export default {
  title: 'Preview Components/Card/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, cardBestpracticesMd, previewMd].join('\n'),
      },
    },
  },
};
