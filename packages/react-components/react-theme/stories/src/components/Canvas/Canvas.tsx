import * as React from 'react';
import { useCanvasStyles } from './useCanvasStyles.styles';

/**
 * Canvas component to wrap stories in a styled container.
 */
export const Canvas = (props: React.ComponentProps<'div'>) => {
  const styles = useCanvasStyles();

  return (
    <div className="sbdocs-preview">
      <div className={styles.canvas} {...props}></div>
    </div>
  );
};
