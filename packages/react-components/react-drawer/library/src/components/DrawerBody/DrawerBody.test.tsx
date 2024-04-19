import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerBody } from './DrawerBody';
import { isConformant } from '../../testing/isConformant';

describe('DrawerBody', () => {
  isConformant({
    Component: DrawerBody,
    displayName: 'DrawerBody',
  });

  it('renders a default state', () => {
    const result = render(<DrawerBody>Default DrawerBody</DrawerBody>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerBody"
        >
          Default DrawerBody
        </div>
      </div>
    `);
  });
});
