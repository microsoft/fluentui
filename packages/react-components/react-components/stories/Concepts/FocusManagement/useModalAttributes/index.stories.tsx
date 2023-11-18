import { useModalAttributes } from '@fluentui/react-components';
import descriptionMd from './useModalAttributesDescription.md';

export { Default } from './Default.stories';
export { InertFocusTrap } from './InertFocusTrap.stories';

export default {
  title: 'Utilities/Focus Management/useModalAttributes',
  component: useModalAttributes,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
