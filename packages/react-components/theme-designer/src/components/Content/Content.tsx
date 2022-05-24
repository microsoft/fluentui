import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root, props.className)}>Content</div>;
};
