import { NavLinkGroup } from '@fluentui/react-nav-preview';

import descriptionMd from './NavLinkGroupDescription.md';
import bestPracticesMd from './NavLinkGroupBestPractices.md';

export { Default } from './NavLinkGroupDefault.stories';

export default {
  title: 'Preview Components/NavLinkGroup',
  component: NavLinkGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
