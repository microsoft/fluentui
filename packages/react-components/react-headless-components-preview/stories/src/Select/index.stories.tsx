import { Select } from '@fluentui/react-headless-components-preview/select';

import descriptionMd from './SelectDescription.md';
import selectCss from '../../../../../../theme/components/select.module.css?raw';
import fieldCss from '../../../../../../theme/components/field.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './SelectDefault.stories';

export default {
  title: 'Headless Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource(
      { name: 'select.module.css', source: selectCss },
      { name: 'field.module.css', source: fieldCss },
    ),
  },
};
