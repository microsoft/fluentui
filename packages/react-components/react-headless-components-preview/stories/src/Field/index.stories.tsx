import { Field } from '@fluentui/react-headless-components-preview/field';

import descriptionMd from './FieldDescription.md';
import fieldCss from './field.module.css?raw';
import inputCss from '../Input/input.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './FieldDefault.stories';

export default {
  title: 'Headless Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource(
      { name: 'field.module.css', source: fieldCss },
      { name: 'input.module.css', source: inputCss },
    ),
  },
};
