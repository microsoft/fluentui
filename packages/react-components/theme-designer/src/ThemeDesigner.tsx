import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStyles } from './ThemeDesigner.styles';
import { useThemeDesignerReducer } from './useThemeDesignerReducer';
import { useOverrideReducer } from './useOverrideReducer';
import { teamsLightTheme, FluentProvider } from '@fluentui/react-components';

import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();

  const [overrideState, dispatchOverrideState] = useOverrideReducer();
  const [state, dispatchState] = useThemeDesignerReducer(overrideState);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={state.brand} isDark={state.isDark} overrides={state.overrides} />
        <Sidebar className={styles.sidebar} dispatchState={dispatchState} />
        <Content className={styles.content} state={state} dispatchOverrideState={dispatchOverrideState} />
      </div>
    </FluentProvider>
  );
};
