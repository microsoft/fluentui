import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1 } from './Caption1';
import { isConformant } from '../../../testing/isConformant';

describe('Caption1', () => {
  isConformant({
    Component: Caption1,
    displayName: 'Caption1',
  });

  it('renders a default state', () => {
    const result = render(<Caption1>Default Caption1</Caption1>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Caption1 fui-Text"
        >
          Default Caption1
        </span>
      </div>
    `);
  });
});
