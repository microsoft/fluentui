import { TeachingPopover } from '@fluentui/react-headless-components-preview/teaching-popover';

import descriptionMd from './TeachingPopoverDescription.md';

export { Default } from './TeachingPopoverDefault.stories';
export { WithCarousel } from './TeachingPopoverWithCarousel.stories';

export default {
  title: 'Components/TeachingPopover',
  component: TeachingPopover,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
