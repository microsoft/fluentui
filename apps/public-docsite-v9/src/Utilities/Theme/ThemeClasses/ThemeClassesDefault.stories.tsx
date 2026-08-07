import * as React from 'react';

import styles from './ThemeClassesDefault.module.css';

export const Default = () => {
  // No provider and no theme class: the stylesheet from '@fluentui/react-tailwind-theme/styles.css'
  // (imported once per document) emits the Web Light theme values at `:root, :host`, so token
  // references resolve everywhere by default.
  return (
    <div className={styles.layout}>
      <div className={`${styles.box} ${styles.colorBrandBackground}`}>colorBrandBackground</div>
      <div className={`${styles.box} ${styles.colorBrandBackground2}`}>colorBrandBackground2</div>
    </div>
  );
};
