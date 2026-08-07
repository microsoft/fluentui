import * as React from 'react';
import { Button, FluentProvider } from '@fluentui/react-components';

import styles from './ThemeClassesCustom.module.css';

export const CustomThemeClass = () => {
  // A custom theme is a CSS class you author yourself: only custom-property declarations with
  // canonical kebab-case token names (see ThemeClassesCustom.module.css). It applies like any
  // shipped theme class — directly on a DOM node, or via FluentProvider's themeClassName so
  // portals opened from the subtree stay themed too.
  return (
    <div className={styles.layout}>
      <div className={`${styles.customTheme} ${styles.box} ${styles.colorBrandBackground}`}>
        custom colorBrandBackground
      </div>
      <FluentProvider themeClassName={styles.customTheme}>
        <Button appearance="primary">Custom-themed button</Button>
      </FluentProvider>
    </div>
  );
};
