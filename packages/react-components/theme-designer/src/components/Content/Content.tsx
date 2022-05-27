import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Demo } from '../Demo/Demo';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.padding('40px', '10%', '0px', '10%'),
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <Demo />
    </div>
  );
};
