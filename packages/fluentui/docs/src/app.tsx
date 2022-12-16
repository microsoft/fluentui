import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  Provider,
  Debug,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsForcedColorsTheme,
  RendererContext,
} from '@fluentui/react-northstar';
import { createEmotionRenderer } from '@fluentui/react-northstar-emotion-renderer';
import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { CreateRenderer } from '@fluentui/react-northstar-styles-renderer';
import { TelemetryPopover } from '@fluentui/react-telemetry';
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

function useRendererFactory(): CreateRenderer {
  const rendererFactory = localStorage.fluentRenderer === 'emotion' ? createEmotionRenderer() : createFelaRenderer();

  React.useEffect(() => {
    (window as any).setFluentRenderer = (rendererName: 'fela' | 'emotion') => {
      if (rendererName === 'fela' || rendererName === 'emotion') {
        localStorage.fluentRenderer = rendererName;
        location.reload();
      } else {
        throw new Error('Only "emotion" & "fela" are supported!');
      }
    };
  }, []);

  return rendererFactory;
}

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

  const rendererFactory = useRendererFactory();

  return (
    <ThemeContext.Provider value={themeContext}>
      <RendererContext.Provider value={rendererFactory}>
        <TelemetryPopover>
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
        </TelemetryPopover>
      </RendererContext.Provider>
    </ThemeContext.Provider>
  );
};

export default hot(App);
