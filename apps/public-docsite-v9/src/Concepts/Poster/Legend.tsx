import * as React from 'react';

import { ComponentIcon, ConstantIcon, HookIcon, MethodIcon, TypeIcon } from './CodeItemIcons';
import { useLegendStyles } from './Legend.styles';

export const Legend: React.FunctionComponent = () => {
  const styles = useLegendStyles();

  return (
    <div className={styles.root}>
      <ComponentIcon />
      <div className={styles.name}>Component</div>
      <HookIcon />
      <div className={styles.name}>Hook</div>
      <ConstantIcon />
      <div className={styles.name}>Constant</div>
      <MethodIcon />
      <div className={styles.name}>Method</div>
      <TypeIcon />
      <div className={styles.name}>Type</div>
    </div>
  );
};
