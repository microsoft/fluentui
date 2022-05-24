import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

export interface SidebarProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.borderRight('1px', 'solid', '#D1D1D1'),
  },
});

export const Sidebar: React.FC<SidebarProps> = props => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root, props.className)}>Sidebar</div>;
};
