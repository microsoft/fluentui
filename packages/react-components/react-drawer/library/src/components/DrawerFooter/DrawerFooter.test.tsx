import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerFooter } from './DrawerFooter';
import { isConformant } from '../../testing/isConformant';

describe('DrawerFooter', () => {
  isConformant({
    Component: DrawerFooter,
    displayName: 'DrawerFooter',
  });

  it('renders a default state', () => {
    const result = render(<DrawerFooter>Default DrawerFooter</DrawerFooter>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <footer
          class="fui-DrawerFooter"
        >
          Default DrawerFooter
        </footer>
      </div>
    `);
  });
});
