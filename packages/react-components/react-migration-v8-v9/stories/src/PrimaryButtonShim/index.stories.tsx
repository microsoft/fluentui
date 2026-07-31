import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './Description.md';

import { PrimaryButton } from '@fluentui/react';
import { FluentProvider, Button, webLightTheme } from '@fluentui/react-components';
import { PrimaryButtonShim } from '@fluentui/react-migration-v8-v9';

import styles from './index.module.css';

export const Default = (): JSXElement => {
  return (
    <div className={styles.root}>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <PrimaryButton>Primary</PrimaryButton>
      <FluentProvider theme={webLightTheme}>
        <PrimaryButtonShim>Primary</PrimaryButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="primary">Primary</Button>
      </FluentProvider>
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Button/PrimaryButtonShim',
  component: PrimaryButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
