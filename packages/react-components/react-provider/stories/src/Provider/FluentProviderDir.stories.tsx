import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FluentProvider } from '@fluentui/react-components';

import styles from './FluentProviderDir.module.css';

export const Dir = (): JSXElement => {
  return (
    <>
      <div className={styles.example}>
        <FluentProvider>
          <div className={styles.text}>Text left to right</div>
        </FluentProvider>
        <FluentProvider dir="rtl" lang="ar">
          <div className={styles.text}>نص من اليمين إلى اليسار</div>
        </FluentProvider>
      </div>
    </>
  );
};

Dir.parameters = {
  docs: {
    description: {
      story: 'A Fluent provider can render text left-to-right (LTR) or right-to-left (RTL).',
    },
  },
};
