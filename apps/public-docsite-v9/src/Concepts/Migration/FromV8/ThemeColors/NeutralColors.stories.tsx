import * as React from 'react';
import { ColorCompare } from './ColorCompare';
import { lightThemeNeutralMap, darkThemeNeutralMap } from './themeMap';

import styles from './NeutralColors.module.css';

export const NeutralColors = () => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h2>Neutral Colors</h2>
        <div className={styles.comparisons}>
          <h3>v8 Palette</h3>
          <h3>v9 Global</h3>
          {lightThemeNeutralMap.map(item => {
            return <ColorCompare key={item.name} {...item} />;
          })}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Neutral Colors (inverted)</h2>
        <div className={styles.comparisons}>
          <h3>v8 Palette</h3>
          <h3>v9 Global</h3>
          {darkThemeNeutralMap.map(item => {
            return <ColorCompare key={item.name} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};
