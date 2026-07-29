import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption2Strong } from './Caption2Strong';
import { isConformant } from '../../../testing/isConformant';

describe('Caption2Strong', () => {
  isConformant({
    Component: Caption2Strong,
    displayName: 'Caption2Strong',
    // Presets share Text's marker deliberately — a `<Body1>` IS a `<Text>`, so
    // `createPreset` mints none of its own (DECISIONS.md D16.7). Without this override
    // `component-has-group-marker` would derive `group/fui-caption2-strong` from the displayName.
    testOptions: { 'has-group-marker': { marker: 'group/fui-text' } },
  });

  it('renders a default state', () => {
    const result = render(<Caption2Strong>Default Caption2Strong</Caption2Strong>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Default Caption2Strong
        </span>
      </div>
    `);
  });
});
