import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from '@fluentui/react-headless-components-preview';

import descriptionMd from './BreadcrumbDescription.md';

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
  },
};
