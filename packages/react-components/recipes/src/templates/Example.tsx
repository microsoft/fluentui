import * as React from 'react';
import { clsx } from 'clsx';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

import styles from './Example.module.css';

export const TemplateExample: React.FC<{ children?: React.ReactNode; centered?: boolean }> = ({
  children,
  centered,
}) => {
  const innerContainerClassName = clsx(styles['inner-container'], centered && styles.centered);

  return (
    <FluentProvider themeClassName={webLightThemeClassName}>
      <div className={styles.root}>
        <div className={innerContainerClassName}>{children}</div>
      </div>
    </FluentProvider>
  );
};
