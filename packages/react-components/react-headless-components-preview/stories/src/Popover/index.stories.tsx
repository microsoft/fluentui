import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import descriptionMd from './PopoverDescription.md';
import bestPracticesMd from './PopoverBestPractices.md';

export { Default } from './PopoverDefault.stories';
export { WithArrow } from './PopoverWithArrow.stories';
export { Controlled } from './PopoverControlled.stories';
export { OpenOnHover } from './PopoverOpenOnHover.stories';
export { OpenOnContext } from './PopoverOpenOnContext.stories';
export { CustomTrigger } from './PopoverCustomTrigger.stories';
export { WithoutTrigger } from './PopoverWithoutTrigger.stories';
export { AnchorToCustomTarget } from './PopoverAnchorToCustomTarget.stories';
export { Nested } from './PopoverNested.stories';
export { InternalUpdateContent } from './PopoverInternalUpdateContent.stories';

export default {
  title: 'Headless Components/Popover',
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverSurface },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
