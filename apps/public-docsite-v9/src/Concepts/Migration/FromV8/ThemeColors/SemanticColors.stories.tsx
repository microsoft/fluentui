import * as React from 'react';
import { ColorCompare } from './ColorCompare';
import { semanticToAliasMap } from './themeMap';

import styles from './SemanticColors.module.css';

export const SemanticColors = () => {
  return (
    <div className={styles.root}>
      <h2>Semantic Colors</h2>
      <div className={styles.comparisons}>
        <h3>v8 Semantic</h3>
        <h3>v9 Alias</h3>
        {semanticToAliasMap.map(item => {
          return <ColorCompare key={item.name} {...item} />;
        })}
      </div>
    </div>
  );
};
