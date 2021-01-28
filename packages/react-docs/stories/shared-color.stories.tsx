import * as React from 'react';
import { ColorRampItem } from '../src/components/ColorRamp';
import {
  teamsDefaultTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  webDefaultTheme,
  webDarkTheme,
  webHighContrastTheme,
} from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Shared',
};

export const Shared = (props) => {
  const [theme, setTheme] = React.useState<string>('teams');
  const onSelectTheme = (e) => {
    setTheme(e.target.value);
  };

  const [variant, setVariant] = React.useState<string>('default');
  const onSelectVariant = (e) => {
    setVariant(e.target.value);
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

  const chosenTheme = themes[theme][variant];

  return (
    <>
      <div>
        <select value={theme} onChange={onSelectTheme}>
          <option value="teams">Teams branded</option>
          <option value="web">Web branded</option>
        </select>
        <select value={variant} onChange={onSelectVariant}>
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="highContrast">High contrast</option>
        </select>
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Design Token</h3>
          {Object.keys(chosenTheme.sharedColorTokens).map((color) => (
            <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>{color}</h3>
          ))}
        </div>
        {Object.keys(chosenTheme.sharedColorTokens.red).map((name) => (
          <div key={name} style={{ display: 'flex' }}>
            <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
            {Object.keys(chosenTheme.sharedColorTokens).map((sharedColor) => {
              return <ColorRampItem value={chosenTheme.sharedColorTokens[sharedColor][name]} />;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

Shared.args = {};
