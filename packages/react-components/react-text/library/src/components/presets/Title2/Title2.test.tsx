import * as React from 'react';
import { render } from '@testing-library/react';
import { Title2 } from './Title2';
import { isConformant } from '../../../testing/isConformant';

describe('Title2', () => {
  isConformant({
    Component: Title2,
    displayName: 'Title2',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-title2` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Title2>Default Title2</Title2>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Title2
        </span>
      </div>
    `);
  });
});
