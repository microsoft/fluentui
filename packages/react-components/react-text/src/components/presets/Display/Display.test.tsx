import * as React from 'react';
import { render } from '@testing-library/react';
import { Display } from './Display';
import { isConformant } from '../../../testing/isConformant';

describe('Display', () => {
  isConformant({
    Component: Display,
    displayName: 'Display',
  });

  it('renders a default state', () => {
    const result = render(<Display>Default Display</Display>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Display fui-Text"
        >
          Default Display
        </span>
      </div>
    `);
  });
});
