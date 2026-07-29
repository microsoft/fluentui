import * as React from 'react';
import { render } from '@testing-library/react';
import { Title3 } from './Title3';
import { isConformant } from '../../../testing/isConformant';

describe('Title3', () => {
  isConformant({
    Component: Title3,
    displayName: 'Title3',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-title3` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Title3>Default Title3</Title3>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Title3
        </span>
      </div>
    `);
  });
});
