import { DrawerHeader } from '@fluentui/react-drawer';

import descriptionMd from './DrawerHeaderDescription.md';

export { Default } from './DrawerHeaderDefault.stories';
export { WithNavigation } from './DrawerHeaderWithNavigation.stories';

export default {
  title: 'Preview Components/DrawerHeader',
  component: DrawerHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
