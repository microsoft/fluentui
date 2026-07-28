import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption2Strong } from './Caption2Strong';
import { isConformant } from '../../../testing/isConformant';

describe('Caption2Strong', () => {
  isConformant({
    Component: Caption2Strong,
    displayName: 'Caption2Strong',
  });

  it('renders a default state', () => {
    const result = render(<Caption2Strong>Default Caption2Strong</Caption2Strong>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Caption2Strong group/fui-text fui-Text"
          data-size="300"
        >
          Default Caption2Strong
        </span>
      </div>
    `);
  });
});
