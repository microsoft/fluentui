import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption2 } from './Caption2';
import { isConformant } from '../../../testing/isConformant';

describe('Caption2', () => {
  isConformant({
    Component: Caption2,
    displayName: 'Caption2',
  });

  it('renders a default state', () => {
    const result = render(<Caption2>Default Caption2</Caption2>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Caption2 fui-Text"
        >
          Default Caption2
        </span>
      </div>
    `);
  });
});
