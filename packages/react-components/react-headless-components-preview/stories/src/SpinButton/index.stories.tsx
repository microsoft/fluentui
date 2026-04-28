import { SpinButton } from '@fluentui/react-headless-components-preview/spin-button';

import descriptionMd from './SpinButtonDescription.md';
import spinButtonCss from '../../../../../../theme/components/spin-button.module.css?raw';
import fieldCss from '../../../../../../theme/components/field.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './SpinButtonDefault.stories';

export default {
  title: 'Headless Components/SpinButton',
  component: SpinButton,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource(
      { name: 'spin-button.module.css', source: spinButtonCss },
      { name: 'field.module.css', source: fieldCss },
    ),
  },
};
