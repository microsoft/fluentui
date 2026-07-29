import * as React from 'react';
import { render } from '@testing-library/react';
import { LargeTitle } from './LargeTitle';
import { isConformant } from '../../../testing/isConformant';

describe('LargeTitle', () => {
  isConformant({
    Component: LargeTitle,
    displayName: 'LargeTitle',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-large-title` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<LargeTitle>Default LargeTitle</LargeTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default LargeTitle
        </span>
      </div>
    `);
  });
});
