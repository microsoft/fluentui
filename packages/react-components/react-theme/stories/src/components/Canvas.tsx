import { makeStyles } from '@griffel/react';
import * as React from 'react';

const useStyles = makeStyles({
  canvas: {
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
});

/**
 * Canvas component to wrap stories in a styled container.
 */
export const Canvas = (props: React.ComponentProps<'div'>) => {
  const styles = useStyles();

  return (
    <div className="sbdocs-preview">
      <div className={styles.canvas} {...props}></div>
    </div>
  );
};
