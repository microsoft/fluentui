import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider, Debug, teamsTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-northstar';
import { RendererProvider } from '@fluentui/react-bindings';
import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { TelemetryPopover } from '@fluentui/react-telemetry';
import { mergeThemes } from '@fluentui/styles';

import { ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext';
import Routes from './routes';

// Experimental dev-time accessibility attributes integrity validation.
import { setup } from '@fluentui/ability-attributes';

// Temporarily disabling the validation for Screener.
if (process.env.NODE_ENV !== 'production' && !process.env.SCREENER) {
  setup();
}

const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
};

class App extends React.Component<any, ThemeContextData> {
  // State also contains the updater function so it will
  // be passed down into the context provider
  state: ThemeContextData = {
    ...themeContextDefaults,
    changeTheme: (e, { value: item }) => this.setState({ themeName: item.value }),
  };

  render() {
    const { themeName } = this.state;
    return (
      <ThemeContext.Provider value={this.state}>
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
            <RendererProvider factory={createFelaRenderer}>
              <Debug />
              <Routes />
            </RendererProvider>
          </Provider>
        </TelemetryPopover>
      </ThemeContext.Provider>
    );
  }
}

export default hot(App);
