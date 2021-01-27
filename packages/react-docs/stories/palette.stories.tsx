import * as React from 'react';
import * as palette from '../src/theme/global-color';
import { ColorRamp } from '../src/components/ColorRamp';

export default {
  title: 'Fluent UI/Theme/Palette',
};

export const Palette = (props) => (
  <div style={{ display: 'flex' }}>
    <div>
      <h3>Grey</h3>
      <ColorRamp key={name} ramp={props.palette.grey} />
    </div>

    <div>
      <h3>Brand</h3>
      <ColorRamp key={name} ramp={props.palette.brand} />
    </div>

    <div>
      <h3>Contrast</h3>
      <ColorRamp
        key={name}
        ramp={{
          hyperlink: palette.hyperlink,
          disabled: palette.disabled,
          selected: palette.selected,
        }}
      />
    </div>

    <div>
      <h3>Aliases</h3>
      <ColorRamp
        key={name}
        ramp={{
          black: palette.black,
          white: palette.white,
        }}
      />
    </div>
  </div>
);

Palette.args = {
  palette,
};
