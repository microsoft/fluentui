import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { makeStyles } from '@fluentui/react-make-styles';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme, webDarkTheme, teamsDarkTheme } from '@fluentui/react-theme';

const useStyles = makeStyles({
  examplesContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px',
    gap: '20px',
  },
});

export const BasicLabelExample = () => {
  const styles = useStyles();

  return (
    <>
      <ThemeProvider theme={webLightTheme}>
        <div className={styles.examplesContainer}>
          <Label required disabled>
            Label
          </Label>
          <Label disabled>Label</Label>
          <Label>Label</Label>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={webDarkTheme}>
        <div className={styles.examplesContainer}>
          <Label required disabled>
            Label
          </Label>
          <Label disabled>Label</Label>
          <Label>Label</Label>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={teamsDarkTheme}>
        <div className={styles.examplesContainer}>
          <Label required disabled>
            Label
          </Label>
          <Label disabled>Label</Label>
          <Label>Label</Label>
        </div>
      </ThemeProvider>
    </>
  );
};
