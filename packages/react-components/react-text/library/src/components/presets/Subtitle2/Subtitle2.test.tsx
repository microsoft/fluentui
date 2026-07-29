import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle2 } from './Subtitle2';
import { isConformant } from '../../../testing/isConformant';

describe('Subtitle2', () => {
  isConformant({
    Component: Subtitle2,
    displayName: 'Subtitle2',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-subtitle2` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Subtitle2>Default Subtitle2</Subtitle2>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Subtitle2
        </span>
      </div>
    `);
  });
});
