import * as React from 'react';
import { render } from '@testing-library/react';
import { Body1 } from './Body1';
import { isConformant } from '../../../testing/isConformant';

describe('Body1', () => {
  isConformant({
    Component: Body1,
    displayName: 'Body1',
  });

  it('renders a default state', () => {
    const result = render(<Body1>Default Body1</Body1>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Body1 fui-Text"
        >
          Default Body1
        </span>
      </div>
    `);
  });
});
