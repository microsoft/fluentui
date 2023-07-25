import { Breadcrumb } from '@fluentui/react-breadcrumb-preview';

import descriptionMd from './BreadcrumbDescription.md';
import bestPracticesMd from './BreadcrumbBestPractices.md';

export { Default } from './BreadcrumbDefault.stories';
export { BreadcrumbSize } from './BreadcrumbSize.stories';
export { BreadcrumbWithOverflow } from './BreadcrumbWithOverflow.stories';
export { BreadcrumbLinkWithOverflow } from './BreadcrumbLinkWithOverflow.stories';
export { BreadcrumbItemWithOverflow } from './BreadcrumbItemWithOverflow.stories';
export { BreadcrumbFocusMode } from './BreadcrumbFocusMode';

export default {
  title: 'Preview Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
