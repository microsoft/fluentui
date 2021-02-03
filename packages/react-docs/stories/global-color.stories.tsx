import * as React from 'react';
import { ColorRamp } from '../src/components/ColorRamp';
import { StorybookStoryContext } from '../src/types';

export default {
  title: 'Fluent UI Theme/Colors/Global',
};

export const Global = (props, { globals: { theme } }: StorybookStoryContext) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h3>Grey</h3>
        <ColorRamp key={name} ramp={theme.light.global.palette.grey} />
      </div>

      <div>
        <h3>Brand</h3>
        <ColorRamp key={name} ramp={theme.light.global.palette.brand} />
      </div>

      <div>
        <h3>Contrast</h3>
        <ColorRamp
          key={name}
          ramp={{
            hyperlink: theme.light.global.color.hyperlink,
            disabled: theme.light.global.color.disabled,
            selected: theme.light.global.color.selected,
          }}
        />
      </div>

      <div>
        <h3>Aliases</h3>
        <ColorRamp
          key={name}
          ramp={{
            black: theme.light.global.color.black,
            white: theme.light.global.color.white,
          }}
        />
      </div>
    </div>
  );
};

Global.args = {};
