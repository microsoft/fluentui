import * as React from 'react';
import { render } from '@testing-library/react';
import { Body2 } from './Body2';
import { isConformant } from '../../../testing/isConformant';

describe('Body2', () => {
  isConformant({
    Component: Body2,
    displayName: 'Body2',
  });

  it('renders a default state', () => {
    const result = render(<Body2>Default Body2</Body2>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Body2 fui-Text"
        >
          Default Body2
        </span>
      </div>
    `);
  });
});
