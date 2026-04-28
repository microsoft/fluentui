import { Divider } from '@fluentui/react-headless-components-preview/divider';

import descriptionMd from './DividerDescription.md';
import dividerCss from '../../../../../../bebop/components/divider.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './DividerDefault.stories';
export { Vertical } from './DividerVertical.stories';

export default {
  title: 'Headless Components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'divider.module.css', source: dividerCss }),
  },
};
