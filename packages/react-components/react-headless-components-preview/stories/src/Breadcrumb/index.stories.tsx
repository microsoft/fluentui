import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from '@fluentui/react-headless-components-preview/breadcrumb';

import descriptionMd from './BreadcrumbDescription.md';
import breadcrumbCss from '../../../../../../theme/components/breadcrumb.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './BreadcrumbDefault.stories';

export default {
  title: 'Headless Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: { BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'breadcrumb.module.css', source: breadcrumbCss }),
  },
};
