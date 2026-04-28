import { Checkbox } from '@fluentui/react-headless-components-preview/checkbox';

import descriptionMd from './CheckboxDescription.md';
import checkboxCss from '../../../../../../theme/components/checkbox.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './CheckboxDefault.stories';

export default {
  title: 'Headless Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'checkbox.module.css', source: checkboxCss }),
  },
};
