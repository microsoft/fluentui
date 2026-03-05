import React from 'react';
import { FluentProvider, webLightTheme, Tooltip, useToastController } from '@fluentui/react-components';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  wrapper: {
    padding: '20px',
  },
});

export const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const styles = useStyles();
  const { dispatchToast } = useToastController();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.wrapper}>
        <Tooltip content="App wrapper" relationship="description">
          <span>{children}</span>
        </Tooltip>
      </div>
    </FluentProvider>
  );
};
