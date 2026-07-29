import * as React from 'react';
import { render } from '@testing-library/react';
import { Body1Strong } from './Body1Strong';
import { isConformant } from '../../../testing/isConformant';

describe('Body1Strong', () => {
  isConformant({
    Component: Body1Strong,
    displayName: 'Body1Strong',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-body1-strong` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Body1Strong>Default Body1Strong</Body1Strong>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Body1Strong
        </span>
      </div>
    `);
  });
});
