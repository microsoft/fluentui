import * as React from 'react';
import { ColorCompare } from './ColorCompare';
import { namedColorMap } from './themeMap';

import styles from './NamedColors.module.css';

export const NamedColors = () => {
  return (
    <div className={styles.root}>
      <h2>Named Colors</h2>
      <div className={styles.comparisons}>
        <h3>v8 Palette</h3>
        <h3>v9 Global</h3>
        {namedColorMap.map(item => {
          return <ColorCompare key={item.name} {...item} />;
        })}
      </div>
    </div>
  );
};
