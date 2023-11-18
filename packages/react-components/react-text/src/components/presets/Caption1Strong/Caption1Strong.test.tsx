import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1Strong } from './Caption1Strong';
import { isConformant } from '../../../testing/isConformant';

describe('Caption1Strong', () => {
  isConformant({
    Component: Caption1Strong,
    displayName: 'Caption1Strong',
  });

  it('renders a default state', () => {
    const result = render(<Caption1Strong>Default Caption1Strong</Caption1Strong>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Caption1Strong fui-Text"
        >
          Default Caption1Strong
        </span>
      </div>
    `);
  });
});
