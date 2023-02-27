import { Link } from '@fluentui/react-components';

import descriptionMd from './LinkDescription.md';
import bestPracticesMd from './LinkBestPractices.md';

export { Default } from './LinkDefault.stories';
export { Appearance } from './LinkAppearance.stories';
export { Inline } from './LinkInline.stories';
export { Disabled } from './LinkDisabled.stories';
export { DisabledFocusable } from './LinkDisabledFocusable.stories';
export { AsButton } from './LinkAsButton.stories';

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    as: {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
