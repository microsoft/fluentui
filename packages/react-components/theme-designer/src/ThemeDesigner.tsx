import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { useStyles } from './ThemeDesigner.styles';
import { ThemeDesignerContextProvider } from './Context/ThemeDesignerContext';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <ThemeDesignerContextProvider>
        <div className={styles.root}>
          <Header className={styles.nav} />
          <Sidebar className={styles.sidebar} />
          <Content className={styles.content} />
        </div>
      </ThemeDesignerContextProvider>
    </FluentProvider>
  );
};
