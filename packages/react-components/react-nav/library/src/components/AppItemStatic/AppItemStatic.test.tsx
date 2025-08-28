import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { AppItemStatic } from './AppItemStatic';
import { appItemStaticClassNames } from './useAppItemStaticStyles.styles';
import { AppItemStaticProps } from './AppItemStatic.types';

describe('AppItemStatic', () => {
  isConformant({
    Component: AppItemStatic as React.FunctionComponent<AppItemStaticProps>,
    displayName: 'AppItemStatic',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon', content: 'Some Content' },
          expectedClassNames: {
            root: appItemStaticClassNames.root,
            icon: appItemStaticClassNames.icon,
          },
        },
      ],
    },
  });
});
