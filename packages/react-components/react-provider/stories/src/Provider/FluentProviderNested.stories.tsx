import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { webLightThemeClassName, FluentProvider } from '@fluentui/react-components';

import styles from './FluentProviderNested.module.css';

export const Nested = (): JSXElement => {
  return (
    <FluentProvider themeClassName={webLightThemeClassName}>
      <div className={styles.example}>
        <div className={styles.text}>Web Light Theme using brand tokens</div>

        <FluentProvider themeClassName={styles.nestedBrandTheme}>
          <div className={styles.example}>
            <div className={styles.text}>Nested FluentProvider with a scoped custom theme class</div>
          </div>
        </FluentProvider>
      </div>
    </FluentProvider>
  );
};

Nested.parameters = {
  docs: {
    description: {
      story:
        'A Fluent provider can be nested to override some or all of the tokens. ' +
        'Pass a CSS class containing only custom-property declarations (a scoped custom theme) as `themeClassName`.',
    },
  },
};
