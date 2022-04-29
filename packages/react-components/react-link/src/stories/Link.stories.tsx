import { Link } from '../index';

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
        component: [
          'Links allow users to navigate between different locations',
          'They can be used as standalone controls or inline with text.',
        ].join('\n'),
      },
    },
  },
};
