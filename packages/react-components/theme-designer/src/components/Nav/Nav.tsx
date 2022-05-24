import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

export interface NavProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    ...shorthands.borderBottom('1px', 'solid', '#D1D1D1'),
  },
});

export const Nav: React.FC<NavProps> = props => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root, props.className)}>Nav</div>;
};
