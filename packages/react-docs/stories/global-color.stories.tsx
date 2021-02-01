import * as React from 'react';
import { ColorRamp } from '../src/components/ColorRamp';
import { grey, brandColors, hyperlink, disabled, selected, black, white } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Global',
};

export const Global = (props) => (
  <div style={{ display: 'flex' }}>
    <div>
      <h3>Grey</h3>
      <ColorRamp key={name} ramp={grey} />
    </div>

    <div>
      <h3>Brand</h3>
      <ColorRamp key={name} ramp={brandColors.web} />
    </div>

    <div>
      <h3>Brand Teams</h3>
      <ColorRamp key={name} ramp={brandColors.teams} />
    </div>

    <div>
      <h3>Contrast</h3>
      <ColorRamp
        key={name}
        ramp={{
          hyperlink: hyperlink,
          disabled: disabled,
          selected: selected,
        }}
      />
    </div>

    <div>
      <h3>Aliases</h3>
      <ColorRamp
        key={name}
        ramp={{
          black: black,
          white: white,
        }}
      />
    </div>
  </div>
);

Global.args = {};
