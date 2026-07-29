import * as React from 'react';
import { render } from '@testing-library/react';
import { Body2 } from './Body2';
import { isConformant } from '../../../testing/isConformant';

describe('Body2', () => {
  isConformant({
    Component: Body2,
    displayName: 'Body2',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-body2` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Body2>Default Body2</Body2>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Body2
        </span>
      </div>
    `);
  });
});
