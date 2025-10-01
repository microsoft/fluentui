import * as React from 'react';
import {
  Provider,
  Debug,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsForcedColorsTheme,
} from '@fluentui/react-northstar';
import { mergeThemes } from '@fluentui/styles';

import { ThemeName, ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext';
import Routes from './routes';

// Experimental dev-time accessibility attributes integrity validation.
import { setup } from '@fluentui/ability-attributes';

if (process.env.NODE_ENV !== 'production') {
  setup();
}

const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsForcedColorsTheme,
};

const App: React.FC = () => {
  const [themeName, setThemeName] = React.useState<ThemeName>(themeContextDefaults.themeName);
  // State also contains the updater function so it will
  // be passed down into the context provider
  const themeContext = React.useMemo<ThemeContextData>(
    () => ({
      ...themeContextDefaults,
      changeTheme: (e, data) => setThemeName(data.value.value),
      themeName,
    }),
    [themeName],
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <Provider
        as={React.Fragment}
        theme={mergeThemes(themes[themeName], {
          staticStyles: [
            {
              a: {
                textDecoration: 'none',
              },
            },
          ],
        })}
      >
        <Debug />
        <Routes />
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
