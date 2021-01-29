import * as React from 'react';
import { ColorRampItem } from '../src/components/ColorRamp';
import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  webLightTheme,
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
      default: teamsLightTheme,
      dark: teamsDarkTheme,
      highContrast: teamsHighContrastTheme,
    },
    web: {
      default: webLightTheme,
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
      <div>
        <div style={{ display: 'flex' }}>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Design Token</h3>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Light</h3>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Dark</h3>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web High Contrast</h3>
        </div>
        {Object.keys(themes[theme].default.neutralColorTokens).map((name) => (
          <div key={name} style={{ display: 'flex' }}>
            <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
            <ColorRampItem value={themes[theme].default.neutralColorTokens[name]} />
            <ColorRampItem value={themes[theme].dark.neutralColorTokens[name]} />
            <ColorRampItem value={themes[theme].highContrast.neutralColorTokens[name]} />
          </div>
        ))}
      </div>
    </>
  );
};

Neutral.args = {};
