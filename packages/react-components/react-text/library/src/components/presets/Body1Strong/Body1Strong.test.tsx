import * as React from 'react';
import { render } from '@testing-library/react';
import { Body1Strong } from './Body1Strong';
import { isConformant } from '../../../testing/isConformant';

describe('Body1Strong', () => {
  isConformant({
    Component: Body1Strong,
    displayName: 'Body1Strong',
  });

  it('renders a default state', () => {
    const result = render(<Body1Strong>Default Body1Strong</Body1Strong>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Body1Strong fui-Text"
        >
          Default Body1Strong
        </span>
      </div>
    `);
  });
});
