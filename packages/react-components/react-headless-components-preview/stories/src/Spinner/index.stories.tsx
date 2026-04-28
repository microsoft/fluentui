import { Spinner } from '@fluentui/react-headless-components-preview/spinner';

import descriptionMd from './SpinnerDescription.md';
import spinnerCss from '../../../../../../bebop/components/spinner.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './SpinnerDefault.stories';
export { Labels } from './SpinnerLabels.stories';

export default {
  title: 'Headless Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'spinner.module.css', source: spinnerCss }),
  },
};
