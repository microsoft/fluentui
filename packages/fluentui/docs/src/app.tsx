import * as React from 'react';
import {
  Provider,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsForcedColorsTheme,
} from '@fluentui/react-northstar';

import { ThemeName, ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext';
import Routes from './routes';

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
      <Provider as={React.Fragment} theme={themes[themeName]}>
        <Routes />
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
