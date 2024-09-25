import * as React from 'react';
import { render } from '@testing-library/react';
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
            primaryNavItem: 'Some Content',
            secondaryActionButton: 'Some Content',
            secondaryToggleButton: 'Some Content',
            menuButton: 'Some Content',
          },
          expectedClassNames: {
            root: splitNavItemClassNames.root,
            primaryNavItem: splitNavItemClassNames.primaryNavItem,
            secondaryActionButton: splitNavItemClassNames.secondaryActionButton,
            secondaryToggleButton: splitNavItemClassNames.secondaryToggleButton,
            menuButton: splitNavItemClassNames.menuButton,
          },
        },
      ],
    },
  });
});
