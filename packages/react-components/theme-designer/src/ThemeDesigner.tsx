import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStaticStyles, useStyles } from './ThemeDesigner.styles';
import { AppState, DispatchTheme, initialAppState, useThemeDesignerReducer } from './useThemeDesignerReducer';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createContext } from '@fluentui/react-context-selector';
import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

export type AppContextValue = {
  appState: AppState;
  dispatchAppState: React.Dispatch<DispatchTheme>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

// eslint-disable-next-line @fluentui/no-context-default-value
export const AppContext = createContext<AppContextValue>({
  appState: initialAppState,
  dispatchAppState: () => null,
  name: 'Untitled',
  setName: () => null,
});

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();
  useStaticStyles();

  const [appState, dispatchAppState] = useThemeDesignerReducer();
  const [name, setName] = React.useState<string>('myTheme');

  const { darkOverrides, isDark, lightOverrides, theme } = appState;
  const overrides = isDark ? darkOverrides : lightOverrides;
  const overridenTheme = { ...theme, ...overrides };

  const { darkOverrides, isDark, lightOverrides, theme } = appState;
  const overrides = isDark ? darkOverrides : lightOverrides;
  const overridenTheme = { ...theme, ...overrides };

  return (
    <FluentProvider theme={webLightTheme}>
      <AppContext.Provider value={{ appState, dispatchAppState }}>
        <div className={styles.root}>
          <Nav className={styles.nav} />
          <Sidebar className={styles.sidebar} />
          <FluentProvider theme={overridenTheme}>
            <Content className={styles.content} />
          </FluentProvider>
        </div>
      </AppContext.Provider>
    </FluentProvider>
  );
};
