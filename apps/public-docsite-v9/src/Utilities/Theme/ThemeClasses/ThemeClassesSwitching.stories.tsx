import * as React from 'react';
import { webDarkThemeClassName, webLightThemeClassName } from '@fluentui/react-components';
import type { ThemeClassName } from '@fluentui/react-components';

import styles from './ThemeClassesSwitching.module.css';

export const Switching = () => {
  // Theme classes are static CSS shipped by '@fluentui/react-tailwind-theme/styles.css';
  // switching themes is just swapping the class on any DOM node.
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeClassName>(webLightThemeClassName);

  return (
    <div className={styles.verticalLayout}>
      <div className={styles.verticalLayout}>
        <div>
          <input
            type="radio"
            id="light-theme"
            name="theme"
            value={webLightThemeClassName}
            onChange={() => setSelectedTheme(webLightThemeClassName)}
            checked={selectedTheme === webLightThemeClassName}
          />
          <label htmlFor="light-theme">Fluent UI light theme</label>
        </div>
        <div>
          <input
            type="radio"
            id="dark-theme"
            name="theme"
            value={webDarkThemeClassName}
            onChange={() => setSelectedTheme(webDarkThemeClassName)}
            checked={selectedTheme === webDarkThemeClassName}
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
