import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1Stronger } from './Caption1Stronger';
import { isConformant } from '../../../testing/isConformant';

describe('Caption1Stronger', () => {
  isConformant({
    Component: Caption1Stronger,
    displayName: 'Caption1Stronger',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-caption1-stronger` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Caption1Stronger>Default Caption1Stronger</Caption1Stronger>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Caption1Stronger
        </span>
      </div>
    `);
  });
});
