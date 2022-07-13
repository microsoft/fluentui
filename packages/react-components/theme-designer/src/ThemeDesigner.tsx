import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStyles } from './ThemeDesigner.styles';
import { useThemeDesignerReducer } from './useThemeDesignerReducer';
import { teamsLightTheme, FluentProvider } from '@fluentui/react-components';

import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();

  const [appState, dispatchAppState] = useThemeDesignerReducer();

  const { brand, isDark, overrides } = appState;

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={brand} isDark={isDark} overrides={overrides} />
        <Sidebar className={styles.sidebar} dispatchAppState={dispatchAppState} />
        <Content className={styles.content} appState={appState} dispatchAppState={dispatchAppState} />
      </div>
    </FluentProvider>
  );
};
