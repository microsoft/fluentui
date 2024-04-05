import { isConformant } from '../../testing/isConformant';
import { NavItem } from './NavItem';
import { navItemClassNames } from './useNavItemStyles.styles';

describe('NavItem', () => {
  isConformant({
    Component: NavItem,
    displayName: 'NavItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon', content: 'Some Content' },
          expectedClassNames: {
            root: navItemClassNames.root,
            content: navItemClassNames.content,
            icon: navItemClassNames.icon,
          },
        },
      ],
    },
  });
});
