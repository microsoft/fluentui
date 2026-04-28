import { Link } from '@fluentui/react-headless-components-preview/link';

import descriptionMd from './LinkDescription.md';
import linkCss from '../../../../../../bebop/components/link.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'link.module.css', source: linkCss }),
  },
};
