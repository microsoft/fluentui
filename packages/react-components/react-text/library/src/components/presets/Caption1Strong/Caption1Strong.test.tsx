import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1Strong } from './Caption1Strong';
import { isConformant } from '../../../testing/isConformant';

describe('Caption1Strong', () => {
  isConformant({
    Component: Caption1Strong,
    displayName: 'Caption1Strong',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-caption1-strong` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Caption1Strong>Default Caption1Strong</Caption1Strong>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Caption1Strong
        </span>
      </div>
    `);
  });
});
