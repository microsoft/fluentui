import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';

export interface NavProps {
  className: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    borderBottomWidth: '1px',
    borderBottomColor: '#D1D1D1',
    borderBottomStyle: 'solid',
  },
});

export const Nav: React.FC<NavProps> = props => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root, props.className)}>Nav</div>;
};
