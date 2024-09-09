import * as React from 'react';

import descriptionMd from './Description.md';

import { CompoundButton as CompoundButtonV8 } from '@fluentui/react';
import {
  CompoundButton as CompoundButtonV9,
  webLightTheme,
  FluentProvider,
  makeStyles,
} from '@fluentui/react-components';
import { CompoundButtonShim } from '@fluentui/react-migration-v8-v9';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '1fr',
    width: 'fit-content',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    columnGap: '10px',
    rowGap: '10px',
  },
  componentName: {
    justifySelf: 'end',
    margin: '0 10px 0 0',
  },
});

export const Default = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
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

export default {
  title: 'Migration Shims/V8/Button/CompoundButtonShim',
  component: CompoundButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
