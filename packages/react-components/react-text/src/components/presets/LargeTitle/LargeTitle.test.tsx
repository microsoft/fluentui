import * as React from 'react';
import { render } from '@testing-library/react';
import { LargeTitle } from './LargeTitle';
import { isConformant } from '../../../testing/isConformant';

describe('LargeTitle', () => {
  isConformant({
    Component: LargeTitle,
    displayName: 'LargeTitle',
  });

  it('renders a default state', () => {
    const result = render(<LargeTitle>Default LargeTitle</LargeTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-LargeTitle fui-Text"
        >
          Default LargeTitle
        </span>
      </div>
    `);
  });
});
