import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { ActionButtonShimExample } from './ActionButtonShimExample';
import { CommandButtonShimExample } from './CommandButtonShimExample';
import { CompoundButtonShimExample } from './CompoundButtonShimExample';
import { DefaultButtonShimExample } from './DefaultButtonShimExample';
import { MenuButtonShimExample } from './MenuButtonShimExample';
import { PrimaryButtonShimExample } from './PrimaryButtonShimExample';
import { ToggleButtonShimExample } from './ToggleButtonShimExample';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridTemplateRows: 'repeat(7, 1fr)',
    width: 'fit-content',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    columnGap: '10px',
    rowGap: '10px',
  },
  componentName: {
    justifySelf: 'end',
    ...shorthands.margin(0, '10px', 0, 0),
  },
});

export const ButtonShimExamples = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>Component</h3>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <div className={styles.componentName}>ActionButton</div>
      <ActionButtonShimExample />
      <div className={styles.componentName}>DefaultButton</div>
      <DefaultButtonShimExample />
      <div className={styles.componentName}>CommandButton</div>
      <CommandButtonShimExample />
      <div className={styles.componentName}>CompoundButton</div>
      <CompoundButtonShimExample />
      <div className={styles.componentName}>MenuButton</div>
      <MenuButtonShimExample />
      <div className={styles.componentName}>PrimaryButton</div>
      <PrimaryButtonShimExample />
      <div className={styles.componentName}>ToggleButton</div>
      <ToggleButtonShimExample />
    </div>
  );
};
