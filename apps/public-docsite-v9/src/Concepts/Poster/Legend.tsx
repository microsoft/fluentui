import * as React from 'react';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { ComponentIcon, ConstantIcon, HookIcon, MethodIcon, TypeIcon } from './CodeItemIcons';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    rowGap: tokens.spacingVerticalMNudge,
    columnGap: tokens.spacingHorizontalSNudge,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.margin(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
  },
  icon: {
    color: tokens.colorNeutralForeground4,
  },
  name: {},
});

export const Legend: React.FunctionComponent = () => {
  const styles = useStyles();

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
