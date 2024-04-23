import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { EmptySwatch } from './EmptySwatch';

describe('EmptySwatch', () => {
  isConformant({
    Component: EmptySwatch,
    displayName: 'EmptySwatch',
  });

  it('renders a default state', () => {
    const result = render(<EmptySwatch />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="fui-EmptySwatch"
          role="radio"
        />
      </div>
    `);
  });
});
