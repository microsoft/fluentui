import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { useCanvasStyles } from './useCanvasStyles.styles';

/**
 * Canvas component to wrap stories in a styled container.
 */
export const Canvas = (props: React.ComponentProps<'div'>): JSXElement => {
  const styles = useCanvasStyles();

  return (
    <div className="sbdocs-preview">
      <div className={styles.canvas} {...props} />
    </div>
  );
};
