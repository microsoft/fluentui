import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle1 } from './Subtitle1';
import { isConformant } from '../../../testing/isConformant';

describe('Subtitle1', () => {
  isConformant({
    Component: Subtitle1,
    displayName: 'Subtitle1',
  });

  it('renders a default state', () => {
    const result = render(<Subtitle1>Default Subtitle1</Subtitle1>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Subtitle1 fui-Text"
        >
          Default Subtitle1
        </span>
      </div>
    `);
  });
});
