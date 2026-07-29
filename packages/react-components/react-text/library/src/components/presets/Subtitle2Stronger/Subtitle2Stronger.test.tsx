import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle2Stronger } from './Subtitle2Stronger';
import { isConformant } from '../../../testing/isConformant';

describe('Subtitle2Stronger', () => {
  isConformant({
    Component: Subtitle2Stronger,
    displayName: 'Subtitle2Stronger',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-subtitle2-stronger` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Subtitle2Stronger>Default Subtitle2Stronger</Subtitle2Stronger>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Subtitle2Stronger
        </span>
      </div>
    `);
  });
});
