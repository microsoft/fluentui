/* eslint-disable no-restricted-properties */
import * as React from 'react';
import { createCSSRuleFromTheme, webLightTheme } from '@fluentui/react-components';

import styles from './createCSSRuleFromThemeDefault.module.css';

export const Default = () => {
  React.useLayoutEffect(() => {
    // When theme switching is not needed, you can use the `:root` selector
    const cssRule = createCSSRuleFromTheme(':root', webLightTheme);

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(cssRule);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={`${styles.box} ${styles.colorBrandBackground}`}>colorBrandBackground</div>
      <div className={`${styles.box} ${styles.colorBrandBackground2}`}>colorBrandBackground2</div>
    </div>
  );
};
