import * as React from 'react';
import { CompoundButton as CompoundButtonV8, IButtonProps } from '@fluentui/react';
import {
  CompoundButton as CompoundButtonV9,
  webLightTheme,
  FluentProvider,
  makeStyles,
} from '@fluentui/react-components';
import { CompoundButtonShim } from '../shims/ButtonShim';

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

export const CompoundButtonStory = (props: IButtonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>8.0</h3>
      <h3>CompoundButtonShim</h3>
      <h3>9.0</h3>
      <CompoundButtonV8 secondaryText="Secondary text">Compound</CompoundButtonV8>
      <FluentProvider theme={webLightTheme}>
        <CompoundButtonShim secondaryText="Secondary text">Compound</CompoundButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <CompoundButtonV9 secondaryContent="Secondary text">Compound</CompoundButtonV9>
      </FluentProvider>
    </div>
  );
};

CompoundButtonStory.storyName = 'CompoundButton';
