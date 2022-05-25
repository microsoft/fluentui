import * as React from 'react';
import { DefaultButton, IButtonProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider, makeStyles } from '@fluentui/react-components';
import { DefaultButtonShim } from '../shims/ButtonShim';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    columnGap: '20px',
    justifyContent: 'center',
    justifyItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export const DefaultButtonStory = (props: IButtonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>8.0</h3>
      <h3>DefaultButtonShim</h3>
      <h3>9.0</h3>
      <DefaultButton {...props}>Default</DefaultButton>
      <FluentProvider theme={webLightTheme}>
        <DefaultButtonShim {...props}>Default</DefaultButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button>Default</Button>
      </FluentProvider>
    </div>
  );
};

DefaultButtonStory.storyName = 'DefaultButton';
