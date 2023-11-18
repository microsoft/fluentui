import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle2 } from './Subtitle2';
import { isConformant } from '../../../testing/isConformant';

describe('Subtitle2', () => {
  isConformant({
    Component: Subtitle2,
    displayName: 'Subtitle2',
  });

  it('renders a default state', () => {
    const result = render(<Subtitle2>Default Subtitle2</Subtitle2>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Subtitle2 fui-Text"
        >
          Default Subtitle2
        </span>
      </div>
    `);
  });
});
