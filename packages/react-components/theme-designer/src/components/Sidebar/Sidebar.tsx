import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';

export interface SidebarProps {
  className: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: '1px',
    borderRightColor: '#D1D1D1',
    borderRightStyle: 'solid',
  },
});

export const Sidebar: React.FC<SidebarProps> = props => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root, props.className)}>Sidebar</div>;
};
