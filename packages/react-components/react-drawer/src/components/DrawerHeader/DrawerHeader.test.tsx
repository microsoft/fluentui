import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerHeader } from './DrawerHeader';
import { isConformant } from '../../testing/isConformant';

describe('DrawerHeader', () => {
  isConformant({
    Component: DrawerHeader,
    displayName: 'DrawerHeader',
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
