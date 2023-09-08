import { NavLink } from '@fluentui/react-nav-preview';

import descriptionMd from './NavLinkDescription.md';
import bestPracticesMd from './NavLinkBestPractices.md';

export { Default } from './NavLinkDefault.stories';

export default {
  title: 'Preview Components/NavLink',
  component: NavLink,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
