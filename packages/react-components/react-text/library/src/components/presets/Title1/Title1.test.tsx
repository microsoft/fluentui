import * as React from 'react';
import { render } from '@testing-library/react';
import { Title1 } from './Title1';
import { isConformant } from '../../../testing/isConformant';

describe('Title1', () => {
  isConformant({
    Component: Title1,
    displayName: 'Title1',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-title1` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Title1>Default Title1</Title1>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Title1
        </span>
      </div>
    `);
  });
});
