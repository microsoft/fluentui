import * as React from 'react';
import { PrimaryButton, IButtonProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider, makeStyles } from '@fluentui/react-components';
import { PrimaryButtonShim } from '../shims/ButtonShim';

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

export const PrimaryButtonStory = (props: IButtonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>8.0</h3>
      <h3>PrimaryButtonShim</h3>
      <h3>9.0</h3>
      <PrimaryButton {...props}>Primary</PrimaryButton>
      <FluentProvider theme={webLightTheme}>
        <PrimaryButtonShim {...props}>Primary</PrimaryButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="primary">Primary</Button>
      </FluentProvider>
    </div>
  );
};

PrimaryButtonStory.storyName = 'PrimaryButton';
