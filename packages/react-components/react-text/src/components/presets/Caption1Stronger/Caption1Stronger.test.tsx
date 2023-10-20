import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1Stronger } from './Caption1Stronger';
import { isConformant } from '../../../testing/isConformant';

describe('Caption1Stronger', () => {
  isConformant({
    Component: Caption1Stronger,
    displayName: 'Caption1Stronger',
  });

  it('renders a default state', () => {
    const result = render(<Caption1Stronger>Default Caption1Stronger</Caption1Stronger>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Caption1Stronger fui-Text"
        >
          Default Caption1Stronger
        </span>
      </div>
    `);
  });
});
