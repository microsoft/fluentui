import { Link } from '@fluentui/react-headless-components-preview';

import descriptionMd from './LinkDescription.md';

export { Default } from './LinkDefault.stories';

export default {
  title: 'Headless Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
