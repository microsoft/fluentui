import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStaticStyles, useStyles } from './ThemeDesigner.styles';
import { AppState, DispatchTheme, initialAppState, useThemeDesignerReducer } from './useThemeDesignerReducer';
import { teamsLightTheme, FluentProvider } from '@fluentui/react-components';
import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

export type StateContext = {
  appState: AppState;
  dispatchAppState: React.Dispatch<DispatchTheme>;
};

export const AppStateContext = React.createContext<StateContext>({
  appState: initialAppState,
  dispatchAppState: (value: DispatchTheme) => {},
});

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();
  useStaticStyles();

  const [appState, dispatchAppState] = useThemeDesignerReducer();

  return (
    <FluentProvider theme={teamsLightTheme}>
      <AppStateContext.Provider value={{ appState, dispatchAppState }}>
        <div className={styles.root}>
          <Nav className={styles.nav} />
          <Sidebar className={styles.sidebar} />
          <Content className={styles.content} />
        </div>
      </AppStateContext.Provider>
    </FluentProvider>
  );
};
