import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1 } from './Caption1';
import { isConformant } from '../../../testing/isConformant';

describe('Caption1', () => {
  isConformant({
    Component: Caption1,
    displayName: 'Caption1',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-caption1` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Caption1>Default Caption1</Caption1>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Caption1
        </span>
      </div>
    `);
  });
});
