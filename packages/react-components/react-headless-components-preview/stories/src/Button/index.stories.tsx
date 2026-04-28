import { Button } from '@fluentui/react-headless-components-preview/button';

import descriptionMd from './ButtonDescription.md';
import buttonCss from './button.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './ButtonDefault.stories';

export default {
  title: 'Headless Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'button.module.css', source: buttonCss }),
  },
};
