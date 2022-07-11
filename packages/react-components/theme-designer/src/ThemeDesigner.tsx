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

  const [state, dispatchState] = useThemeDesignerReducer();

  const { brand, theme, isDark, overrides } = state;

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={brand} isDark={isDark} overrides={overrides} />
        <Sidebar className={styles.sidebar} dispatchState={dispatchState} />
        <Content
          className={styles.content}
          brand={brand}
          theme={{ ...theme, ...overrides }}
          isDark={state.isDark}
          dispatchState={dispatchState}
        />
      </div>
    </FluentProvider>
  );
};
