import * as React from 'react';
import { clsx } from 'clsx';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import styles from './Example.module.css';

export const TemplateExample: React.FC<{ children?: React.ReactNode; centered?: boolean }> = ({
  children,
  centered,
}) => {
  const innerContainerClassName = clsx(styles['inner-container'], centered && styles.centered);

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <div className={innerContainerClassName}>{children}</div>
      </div>
    </FluentProvider>
  );
};
