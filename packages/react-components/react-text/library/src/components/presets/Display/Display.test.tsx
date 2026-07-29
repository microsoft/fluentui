import * as React from 'react';
import { render } from '@testing-library/react';
import { Display } from './Display';
import { isConformant } from '../../../testing/isConformant';

describe('Display', () => {
  isConformant({
    Component: Display,
    displayName: 'Display',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-display` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Display>Default Display</Display>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Display
        </span>
      </div>
    `);
  });
});
