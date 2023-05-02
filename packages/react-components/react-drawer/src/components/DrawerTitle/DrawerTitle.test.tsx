import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerTitle } from './DrawerTitle';
import { isConformant } from '../../testing/isConformant';
import { DrawerTitleProps } from './DrawerTitle.types';
import { drawerTitleClassNames } from './useDrawerTitleStyles.styles';

describe('DrawerTitle', () => {
  isConformant<DrawerTitleProps>({
    Component: DrawerTitle,
    displayName: 'DrawerTitle',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            action: 'Action',
          },
          expectedClassNames: {
            root: drawerTitleClassNames.root,
            action: drawerTitleClassNames.action,
          },
        },
      ],
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DrawerTitle>Default DrawerTitle</DrawerTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <h2
          class="fui-DialogTitle fui-DrawerTitle"
        >
          Default DrawerTitle
        </h2>
      </div>
    `);
  });
});
