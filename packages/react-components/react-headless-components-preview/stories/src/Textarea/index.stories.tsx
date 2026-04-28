import { Textarea } from '@fluentui/react-headless-components-preview/textarea';

import descriptionMd from './TextareaDescription.md';
import textareaCss from '../../../../../../theme/components/textarea.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './TextareaDefault.stories';

export default {
  title: 'Headless Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'textarea.module.css', source: textareaCss }),
  },
};
