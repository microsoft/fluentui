import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { AppItem } from './AppItem';
import type { AppItemProps } from './AppItem.types';
import { appItemClassNames } from './useAppItemStyles.styles';

describe('AppItem', () => {
  isConformant({
    Component: AppItem as React.FunctionComponent<AppItemProps>,
    displayName: 'AppItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon', content: 'Some Content' },
          expectedClassNames: {
            root: appItemClassNames.root,
            icon: appItemClassNames.icon,
          },
        },
      ],
    },
  });
});
