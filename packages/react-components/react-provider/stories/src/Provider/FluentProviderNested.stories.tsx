import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { webLightTheme, FluentProvider } from '@fluentui/react-components';

import styles from './FluentProviderNested.module.css';

export const Nested = (): JSXElement => {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.example}>
        <div className={styles.text}>Web Light Theme using brand tokens</div>

        <FluentProvider
          theme={{
            colorBrandStroke1: '#780510',
            colorBrandBackground2: '#fa8072',
            colorBrandForeground2: '#780510',
          }}
        >
          <div className={styles.example}>
            <div className={styles.text}>Nested FluentProvider with partial theme</div>
          </div>
        </FluentProvider>
      </div>
    </FluentProvider>
  );
};

Nested.parameters = {
  docs: {
    description: {
      story: 'A Fluent provider can be nested to override some or all of a tokens.',
    },
  },
};
