import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerHeaderNavigation } from './DrawerHeaderNavigation';
import { isConformant } from '../../testing/isConformant';

describe('DrawerHeaderNavigation', () => {
  isConformant({
    Component: DrawerHeaderNavigation,
    displayName: 'DrawerHeaderNavigation',
  });

  it('renders a default state', () => {
    const result = render(<DrawerHeaderNavigation>Default DrawerHeaderNavigation</DrawerHeaderNavigation>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <nav
          class="fui-DrawerHeaderNavigation"
        >
          Default DrawerHeaderNavigation
        </nav>
      </div>
    `);
  });
});
