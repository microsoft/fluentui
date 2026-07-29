import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle1 } from './Subtitle1';
import { isConformant } from '../../../testing/isConformant';

describe('Subtitle1', () => {
  isConformant({
    Component: Subtitle1,
    displayName: 'Subtitle1',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-subtitle1` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Subtitle1>Default Subtitle1</Subtitle1>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Subtitle1
        </span>
      </div>
    `);
  });
});
