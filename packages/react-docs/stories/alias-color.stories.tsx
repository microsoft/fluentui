import * as React from 'react';
import { webLight } from '../src/theme/alias-color-web-light';
import { webHighContrast } from '../src/theme/alias-color-web-high-contrast';
import { ColorRamp } from '../src/components/ColorRamp';

export default {
  title: 'Fluent UI Theme/Colors/Alias',
};

export const Alias = (props) => (
  <div style={{ display: 'flex' }}>
    {/* TODO: Add column with alias names like in Figma? */}
    <div>
      <h3>Web Light</h3>
      <ColorRamp ramp={webLight} />
    </div>
    <div>
      <h3>Web High Contrast</h3>
      <ColorRamp ramp={webHighContrast} />
    </div>
  </div>
);

Alias.args = {};
