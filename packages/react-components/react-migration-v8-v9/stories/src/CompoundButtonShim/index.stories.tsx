import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './Description.md';

import { CompoundButton as CompoundButtonV8 } from '@fluentui/react';
import { CompoundButton as CompoundButtonV9, webLightTheme, FluentProvider } from '@fluentui/react-components';
import { CompoundButtonShim } from '@fluentui/react-migration-v8-v9';

import styles from './index.module.css';

export const Default = (): JSXElement => {
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
