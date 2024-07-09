import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AppNode } from './AppNode';
import { appNodeClassNames } from './useAppNodeStyles.styles';

describe('AppNode', () => {
  isConformant({
    Component: AppNode,
    displayName: 'AppNode',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon', content: 'Some Content' },
          expectedClassNames: {
            root: appNodeClassNames.root,
            icon: appNodeClassNames.icon,
          },
        },
      ],
    },
  });
});
