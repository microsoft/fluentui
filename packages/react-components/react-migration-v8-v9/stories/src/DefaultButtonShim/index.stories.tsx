import * as React from 'react';

import descriptionMd from './Description.md';

import { DefaultButton } from '@fluentui/react';
import { FluentProvider, Button, webLightTheme, makeStyles } from '@fluentui/react-components';
import { DefaultButtonShim } from '@fluentui/react-migration-v8-v9';

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
      <h3>DefaultButtonShim</h3>
      <h3>v9</h3>
      <DefaultButton>Default</DefaultButton>
      <FluentProvider theme={webLightTheme}>
        <DefaultButtonShim>Default</DefaultButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button>Default</Button>
      </FluentProvider>
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Button/DefaultButtonShim',
  component: DefaultButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
