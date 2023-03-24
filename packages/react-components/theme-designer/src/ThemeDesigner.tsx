import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStaticStyles, useStyles } from './ThemeDesigner.styles';
import { ThemeDesignerContextProvider } from './Context/ThemeDesignerContext';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

// eslint-disable-next-line @fluentui/no-Context-default-value
// export const AppContext = createContext<AppContextValue>({
//   appState: initialThemeDesignerState,
//   dispatchAppState: () => null,
//   name: 'Untitled',
//   setName: () => null,
// });

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();
  useStaticStyles();

  // const [appState, dispatchAppState] = themeDesignerContext();
  // const [name, setName] = React.useState<string>('myTheme');
  //
  // const { darkOverrides, isDark, lightOverrides, theme } = appState;
  // const overrides = isDark ? darkOverrides : lightOverrides;
  // const overridenTheme = { ...theme, ...overrides };

  return (
    <FluentProvider theme={webLightTheme}>
      <ThemeDesignerContextProvider>
        <div className={styles.root}>
          <Nav className={styles.nav} />
          <Sidebar className={styles.sidebar} />
          <Content className={styles.content} />
        </div>
      </ThemeDesignerContextProvider>
    </FluentProvider>
  );
};
