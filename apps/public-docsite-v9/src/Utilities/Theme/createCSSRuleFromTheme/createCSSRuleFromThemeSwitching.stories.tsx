/* eslint-disable no-restricted-properties */
import * as React from 'react';
import { createCSSRuleFromTheme, webLightTheme, webDarkTheme } from '@fluentui/react-components';

import styles from './createCSSRuleFromThemeSwitching.module.css';

export const Switching = () => {
  React.useLayoutEffect(() => {
    const lightThemeCSS = createCSSRuleFromTheme('.fluentui-light-theme', webLightTheme);
    const darkThemeCSS = createCSSRuleFromTheme('.fluentui-dark-theme', webDarkTheme);

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(lightThemeCSS);
    style.sheet?.insertRule(darkThemeCSS);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Toggle the class name to change themes
  const [selectedTheme, setSelectedTheme] = React.useState<'fluentui-light-theme' | 'fluentui-dark-theme'>(
    'fluentui-light-theme',
  );

  return (
    <div className={styles.verticalLayout}>
      <div className={styles.verticalLayout}>
        <div>
          <input
            type="radio"
            id="light-theme"
            name="theme"
            value="fluentui-light-theme"
            onChange={e => setSelectedTheme('fluentui-light-theme')}
            checked={selectedTheme === 'fluentui-light-theme'}
          />
          <label htmlFor="light-theme">Fluent UI light theme</label>
        </div>
        <div>
          <input
            type="radio"
            id="dark-theme"
            name="theme"
            value="fluentui-dark-theme"
            onChange={e => setSelectedTheme('fluentui-dark-theme')}
            checked={selectedTheme === 'fluentui-dark-theme'}
          />
          <label htmlFor="dark-theme">Fluent UI dark theme</label>
        </div>
      </div>
      <div className={`${styles.horizontalLayout} ${selectedTheme}`}>
        <div className={`${styles.box} ${styles.colorBrandBackground}`}>colorBrandBackground</div>
        <div className={`${styles.box} ${styles.colorBrandBackground2}`}>colorBrandBackground2</div>
      </div>
    </div>
  );
};
