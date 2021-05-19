/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { ColorRamp } from './ColorRamp.stories';
import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '../index';

export default {
  title: 'Theme/Global/Colors',
};
// FIXME: hardcoded theme
const theme = {
  light: teamsLightTheme,
  dark: teamsDarkTheme,
  highContrast: teamsHighContrastTheme,
};

export const GlobalColors = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h3>Grey</h3>
        <ColorRamp ramp={theme.light.global.palette.grey} />
      </div>

      <div>
        <h3>Brand</h3>
        <ColorRamp ramp={theme.light.global.palette.brand} />
      </div>

      <div>
        <h3>Contrast</h3>
        <ColorRamp
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
          ramp={{
            black: theme.light.global.color.black,
            white: theme.light.global.color.white,
          }}
        />
      </div>
    </div>
  );
};
