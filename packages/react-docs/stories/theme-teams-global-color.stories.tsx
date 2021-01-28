import * as React from 'react';
import * as palette from '../src/themes/theme-teams/global/global-color';
import { grey, brandColors, hyperlink, disabled, selected, black, white } from '@fluentui/react-theme';
import { ColorRamp } from '../src/components/ColorRamp';

export default {
  title: 'Fluent UI Theme/Colors/Teams Global',
};

export const TeamsGlobal = (props) => (
  <div style={{ display: 'flex' }}>
    <div>
      <h3>Grey</h3>
      <ColorRamp key={name} ramp={grey} />
    </div>

    <div>
      <h3>Brand</h3>
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

TeamsGlobal.args = {
  palette,
};
