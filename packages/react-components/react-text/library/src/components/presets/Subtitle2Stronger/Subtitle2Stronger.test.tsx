import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle2Stronger } from './Subtitle2Stronger';
import { isConformant } from '../../../testing/isConformant';

describe('Subtitle2Stronger', () => {
  isConformant({
    Component: Subtitle2Stronger,
    displayName: 'Subtitle2Stronger',
  });

  it('renders a default state', () => {
    const result = render(<Subtitle2Stronger>Default Subtitle2Stronger</Subtitle2Stronger>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Subtitle2Stronger fui-Text"
        >
          Default Subtitle2Stronger
        </span>
      </div>
    `);
  });
});
