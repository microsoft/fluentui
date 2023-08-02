import { InteractionTag } from '@fluentui/react-tags-preview';

import descriptionMd from './InteractionTagDescription.md';
import bestPracticesMd from './InteractionTagBestPractices.md';

export { Default } from './InteractionTagDefault.stories';
export { Icon } from './InteractionTagIcon.stories';
export { Media } from './InteractionTagMedia.stories';
export { SecondaryText } from './InteractionTagSecondaryText.stories';
export { Dismiss } from './InteractionTagDismiss.stories';
export { Shape } from './InteractionTagShape.stories';
export { Size } from './InteractionTagSize.stories';
export { Appearance } from './InteractionTagAppearance.stories';
export { Disabled } from './InteractionTagDisabled.stories';
export { HasPrimaryAction } from './InteractionTagHasPrimaryAction.stories';

export default {
  title: 'Preview Components/Tag/InteractionTag',
  component: InteractionTag,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
