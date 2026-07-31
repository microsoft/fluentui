import * as React from 'react';
import { ColorCompare } from './ColorCompare';
import { darkThemeBrandMap, lightThemeBrandMap } from './themeMap';

import styles from './BrandColors.module.css';

export const BrandColors = () => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h2>Brand Colors</h2>
        <div className={styles.comparisons}>
          <h3>v8 Palette</h3>
          <h3>v9 Global</h3>
          {lightThemeBrandMap.map(item => {
            return <ColorCompare key={item.name} {...item} />;
          })}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Brand Colors (inverted)</h2>
        <div className={styles.comparisons}>
          <h3>v8 Palette</h3>
          <h3>v9 Global</h3>
          {darkThemeBrandMap.map(item => {
            return <ColorCompare key={item.name} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};
