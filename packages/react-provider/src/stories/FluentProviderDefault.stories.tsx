import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { webLightTheme, teamsLightTheme, teamsDarkTheme } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-button';
import { FluentProvider } from '@fluentui/react-provider'; // codesandbox-dependency: @fluentui/react-provider ^9.0.0-beta

const useStyles = makeStyles({
  example: {
    margin: '5px',
  },
  darkThemeBackground: theme => ({
    backgroundColor: theme.colorBrandBackground,
  }),
});

export const Default = () => {
  const styles = useStyles();
  return (
    <>
      <div>
        <FluentProvider theme={webLightTheme}>
          <div className={styles.example}>Web Light Theme</div>
          <Button className={styles.example}>Web Light Theme</Button>
        </FluentProvider>
      </div>
      <div>
        <FluentProvider theme={teamsLightTheme}>
          <div className={styles.example}>Teams Light Theme</div>
          <Button className={styles.example}>Teams Light Theme</Button>
        </FluentProvider>
      </div>
      <div>
        <FluentProvider theme={teamsDarkTheme}>
          <div className={styles.example}>
            <div className={styles.darkThemeBackground}>Teams Dark Theme</div>
          </div>
          <Button className={styles.example}>Teams Dark Theme</Button>
        </FluentProvider>
      </div>
    </>
  );
};
