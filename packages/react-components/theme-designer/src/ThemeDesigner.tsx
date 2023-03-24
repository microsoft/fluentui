import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStaticStyles, useStyles } from './ThemeDesigner.styles';
import { ThemeDesignerContextProvider } from './Context/ThemeDesignerContext';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();
  useStaticStyles();

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
