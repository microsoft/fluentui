import { isConformant } from '../../testing/isConformant';
import { SplitNavItem } from './SplitNavItem';
import { splitNavItemClassNames } from './useSplitNavItemStyles.styles';

describe('SplitNavItem', () => {
  isConformant({
    Component: SplitNavItem,
    displayName: 'SplitNavItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            navItem: 'Some Content',
            actionButton: 'Some Content',
            toggleButton: 'Some Content',
            menuButton: 'Some Content',
          },
          expectedClassNames: {
            root: splitNavItemClassNames.root,
            navItem: splitNavItemClassNames.navItem,
            actionButton: splitNavItemClassNames.actionButton,
            toggleButton: splitNavItemClassNames.toggleButton,
            menuButton: splitNavItemClassNames.menuButton,
          },
        },
      ],
    },
  });
});
