import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';
import { InteractionTagSecondary } from '@fluentui/react-headless-components-preview/interaction-tag-secondary';

import descriptionMd from './InteractionTagDescription.md';
export { Default } from './InteractionTagDefault.stories';
export { Icon } from './InteractionTagIcon.stories';
export { Media } from './InteractionTagMedia.stories';
export { SecondaryText } from './InteractionTagSecondaryText.stories';
export { Dismiss } from './InteractionTagDismiss.stories';
export { Disabled } from './InteractionTagDisabled.stories';
export { HasPrimaryAction } from './InteractionTagHasPrimaryAction.stories';
export { Selected } from './InteractionTagSelected.stories';

export default {
  title: 'Components/Tags/InteractionTag',
  component: InteractionTag,
  subcomponents: { InteractionTagPrimary, InteractionTagSecondary },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
