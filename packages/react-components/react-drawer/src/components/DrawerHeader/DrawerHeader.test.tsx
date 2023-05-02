import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerHeader } from './DrawerHeader';
import { isConformant } from '../../testing/isConformant';
import { drawerHeaderClassNames } from './useDrawerHeaderStyles';

describe('DrawerHeader', () => {
  isConformant({
    Component: DrawerHeader,
    displayName: 'DrawerHeader',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            header: 'Title',
          },
          expectedClassNames: {
            root: drawerHeaderClassNames.root,
            header: drawerHeaderClassNames.header,
          },
        },
        {
          props: {
            navigation: 'Navigation',
          },
          expectedClassNames: {
            root: drawerHeaderClassNames.root,
            navigation: drawerHeaderClassNames.navigation,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<DrawerHeader>Default DrawerHeader</DrawerHeader>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <header
          class="fui-DrawerHeader"
        >
          Default DrawerHeader
        </header>
      </div>
    `);
  });
});
