import * as React from 'react';
import { ColorRamp } from '../src/components/ColorRamp';
import {
  teamsDefaultTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  webDefaultTheme,
  webDarkTheme,
  webHighContrastTheme,
} from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Alias',
};

export const Neutral = (props) => {
  const [theme, setTheme] = React.useState<string>('teams');
  const onSelectTheme = (e) => {
    setTheme(e.target.value);
  };

  const themes = {
    teams: {
      default: teamsDefaultTheme,
      dark: teamsDarkTheme,
      highContrast: teamsHighContrastTheme,
    },
    web: {
      default: webDefaultTheme,
      dark: webDarkTheme,
      highContrast: webHighContrastTheme,
    },
  };

  return (
    <>
      <div>
        <select value={theme} onChange={onSelectTheme}>
          <option value="teams">Teams branded</option>
          <option value="web">Web branded</option>
        </select>
      </div>
      <div style={{ display: 'flex' }}>
        {/* TODO: Add column with alias names like in Figma? */}
        <div>
          <h3>Web Light</h3>
          <ColorRamp ramp={themes[theme].default.neutralColorTokens} />
        </div>
        <div>
          <h3>Web Dark</h3>
          <ColorRamp ramp={themes[theme].dark.neutralColorTokens} />
        </div>
        <div>
          <h3>Web High Contrast</h3>
          <ColorRamp ramp={themes[theme].highContrast.neutralColorTokens} />
        </div>
      </div>
    </>
  );
};

Neutral.args = {};
