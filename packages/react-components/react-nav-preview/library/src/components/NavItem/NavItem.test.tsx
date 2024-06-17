import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { NavItem } from './NavItem';
import { navItemClassNames } from './useNavItemStyles.styles';
import type { NavItemProps } from './NavItem.types';

describe('NavItem', () => {
  isConformant({
    Component: NavItem as React.FunctionComponent<NavItemProps>,
    displayName: 'NavItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon', content: 'Some Content' },
          expectedClassNames: {
            root: navItemClassNames.root,
            icon: navItemClassNames.icon,
          },
        },
      ],
    },
  });
});
