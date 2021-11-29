import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles, shorthands } from '@fluentui/react-make-styles';
import { webLightTheme, teamsLightTheme, teamsDarkTheme } from '@fluentui/react-theme';

import { FluentProvider } from '../FluentProvider';

const useStyles = makeStyles({
  button: {
    marginTop: '5px',
  },
  provider: {
    ...shorthands.border('1px'),
    ...shorthands.borderRadius('5px'),
    ...shorthands.padding('5px'),
  },
  text: theme => ({
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,
    fontSize: '20px',
    ...shorthands.border('1px'),
    ...shorthands.borderRadius('5px'),
    ...shorthands.padding('5px'),
  }),
});

export const Default = () => {
  const styles = useStyles();
  return (
    <>
      <div>
        <FluentProvider className={styles.provider} theme={webLightTheme}>
          <div className={styles.text}>Web Light Theme</div>
          <Button className={styles.button}>Web Light Theme</Button>
        </FluentProvider>
      </div>
      <div>
        <FluentProvider className={styles.provider} theme={teamsLightTheme}>
          <div className={styles.text}>Teams Light Theme</div>
          <Button className={styles.button}>Teams Light Theme</Button>
        </FluentProvider>
      </div>
      <div>
        <FluentProvider className={styles.provider} theme={teamsDarkTheme}>
          <div className={styles.text}>Teams Dark Theme</div>
          <Button className={styles.button}>Teams Dark Theme</Button>
        </FluentProvider>
      </div>
    </>
  );
};
