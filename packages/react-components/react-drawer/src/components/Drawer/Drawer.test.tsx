import * as React from 'react';
import { render } from '@testing-library/react';
import { Drawer } from './Drawer';
import { isConformant } from '../../testing/isConformant';

describe('Drawer', () => {
  isConformant({
    Component: Drawer,
    displayName: 'Drawer',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Drawer>Default Drawer</Drawer>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-Drawer"
        >
          Default Drawer
        </div>
      </div>
    `);
  });
});
